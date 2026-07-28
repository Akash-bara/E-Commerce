import "./config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authR.js";
import productRoutes from "./routes/productR.js";
import cartRoutes from "./routes/cartR.js";
import couponRoutes from "./routes/couponR.js";
import paymentRoutes from "./routes/paymentR.js";
import analyticsRoutes from "./routes/analyticsR.js";

import { connectDB } from "./lib/db.js";

const app = express();

app.set("trust proxy", 1);

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
	"http://localhost:5173",
	"https://e-commerce-frontend-cuoq.onrender.com",
];

app.use(
	cors({
		origin(origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(PORT, async () => {
	try {
		await connectDB();
		console.log(`Server running on port ${PORT}`);
	} catch (error) {
		console.error("Database connection failed:", error);
		process.exit(1);
	}
});