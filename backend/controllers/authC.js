import { redis } from "../lib/redis.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
	const accessToken = jwt.sign(
		{ userId },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "15m",
		}
	);

	const refreshToken = jwt.sign(
		{ userId },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: "7d",
		}
	);

	return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(`refresh_token:${userId}`, refreshToken, {
		ex: 7 * 24 * 60 * 60,
	});
};

const cookieOptions = {
	httpOnly: true,
	secure: true,
	sameSite: "none",
	path: "/",
};

const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		...cookieOptions,
		maxAge: 15 * 60 * 1000,
	});

	res.cookie("refreshToken", refreshToken, {
		...cookieOptions,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
};

export const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({
				message: "User already exists",
			});
		}

		const user = await User.create({
			name,
			email,
			password,
		});

		const { accessToken, refreshToken } = generateToken(user._id);

		await storeRefreshToken(user._id, refreshToken);

		setCookies(res, accessToken, refreshToken);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log("Signup Error:", error);
		res.status(500).json({
			message: error.message,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				message: "Invalid email or password",
			});
		}

		const isPasswordCorrect = await user.comparePassword(password);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				message: "Invalid email or password",
			});
		}

		const { accessToken, refreshToken } = generateToken(user._id);

		await storeRefreshToken(user._id, refreshToken);

		setCookies(res, accessToken, refreshToken);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log("Login Error:", error);

		res.status(500).json({
			message: error.message,
		});
	}
};

export const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (refreshToken) {
			const decoded = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);

			await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken", cookieOptions);
		res.clearCookie("refreshToken", cookieOptions);

		res.json({
			message: "Logged out successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

export const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({
				message: "No refresh token provided",
			});
		}

		const decoded = jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET
		);

		const storedToken = await redis.get(
			`refresh_token:${decoded.userId}`
		);

		if (storedToken !== refreshToken) {
			return res.status(401).json({
				message: "Invalid refresh token",
			});
		}

		const accessToken = jwt.sign(
			{ userId: decoded.userId },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "15m",
			}
		);

		res.cookie("accessToken", accessToken, {
			...cookieOptions,
			maxAge: 15 * 60 * 1000,
		});

		res.json({
			message: "Token refreshed",
		});
	} catch (error) {
		res.status(401).json({
			message: "Refresh token expired",
		});
	}
};

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};