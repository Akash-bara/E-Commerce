import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore.js";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import axios from "../lib/axios.js";

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		try {
			const { data } = await axios.post(
				"/payments/create-checkout-session",
				{
					products: cart,
					couponCode: coupon ? coupon.code : null,
				}
			);

			if (data.success) {
				await axios.post("/payments/checkout-success", {
					products: cart,
					couponCode: coupon ? coupon.code : null,
				});

				window.location.href = "/purchase-success";
			}
		} catch (error) {
			console.error(error);
			alert("Payment failed!");
		}
	};

	return (
		<motion.div
			className="space-y-5 rounded-2xl border border-[#2B2F4A] bg-[#1A1D35] p-6 shadow-xl"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h2 className="text-2xl font-bold text-white">
				Order Summary
			</h2>

			<div className="space-y-4">

				<dl className="flex items-center justify-between">
					<dt className="text-[#9CA3AF]">
						Original Price
					</dt>

					<dd className="font-semibold text-white">
						₹{formattedSubtotal}
					</dd>
				</dl>

				{savings > 0 && (
					<dl className="flex items-center justify-between">
						<dt className="text-[#9CA3AF]">
							You Save
						</dt>

						<dd className="font-semibold text-[#FF5A2C]">
							-₹{formattedSavings}
						</dd>
					</dl>
				)}

				{coupon && isCouponApplied && (
					<dl className="flex items-center justify-between">
						<dt className="text-[#9CA3AF]">
							Coupon ({coupon.code})
						</dt>

						<dd className="font-semibold text-[#FF5A2C]">
							-{coupon.discountPercentage}%
						</dd>
					</dl>
				)}

				<div className="border-t border-[#2B2F4A] pt-4">

					<dl className="flex items-center justify-between">
						<dt className="text-xl font-bold text-white">
							Total
						</dt>

						<dd className="text-2xl font-bold text-[#FF5A2C]">
							₹{formattedTotal}
						</dd>
					</dl>

				</div>

			</div>

			<motion.button
				onClick={handlePayment}
				whileHover={{ scale: 1.03 }}
				whileTap={{ scale: 0.96 }}
				className="w-full rounded-xl bg-[#FF5A2C] py-3 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-[#FF744D]"
			>
				Proceed to Checkout
			</motion.button>

			<div className="flex justify-center items-center gap-2 pt-2">

				<span className="text-[#9CA3AF]">
					or
				</span>

				<Link
					to="/"
					className="flex items-center gap-2 font-medium text-[#FF5A2C] hover:text-[#FF744D] transition-colors duration-300"
				>
					Continue Shopping
					<MoveRight size={16} />
				</Link>

			</div>

		</motion.div>
	);
};

export default OrderSummary;