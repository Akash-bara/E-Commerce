import Coupon from "../models/couponM.js";
import Order from "../models/orderM.js";

export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({
				success: false,
				message: "Invalid or empty products array",
			});
		}

		let totalAmount = 0;

		for (const product of products) {
			totalAmount += product.price * product.quantity;
		}

		let coupon = null;

		if (couponCode) {
			coupon = await Coupon.findOne({
				code: couponCode,
				userId: req.user._id,
				isActive: true,
			});

			if (coupon) {
				totalAmount =
					totalAmount -
					(totalAmount * coupon.discountPercentage) / 100;
			}
		}

		res.status(200).json({
			success: true,
			message: "Demo checkout created successfully",
			sessionId: "DEMO_SESSION_" + Date.now(),
			totalAmount,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
		const { products, couponCode } = req.body;

		let totalAmount = 0;

		products.forEach((product) => {
			totalAmount += product.price * product.quantity;
		});

		if (couponCode) {
			const coupon = await Coupon.findOne({
				code: couponCode,
				userId: req.user._id,
				isActive: true,
			});

			if (coupon) {
				totalAmount =
					totalAmount -
					(totalAmount * coupon.discountPercentage) / 100;

				coupon.isActive = false;
				await coupon.save();
			}
		}

		const order = new Order({
			user: req.user._id,
			products: products.map((product) => ({
				product: product._id,
				quantity: product.quantity,
				price: product.price,
			})),
			totalAmount,
			stripeSessionId: "DEMO_PAYMENT",
		});

		await order.save();

		res.status(200).json({
			success: true,
			message: "Payment Successful (Demo Mode)",
			orderId: order._id,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};