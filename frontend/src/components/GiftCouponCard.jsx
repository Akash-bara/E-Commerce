import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore.js";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");

	const {
		coupon,
		isCouponApplied,
		applyCoupon,
		getMyCoupon,
		removeCoupon,
	} = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode) return;
		applyCoupon(userInputCode);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
		<motion.div
			className="space-y-5 rounded-2xl border border-[#2B2F4A] bg-[#1A1D35] p-6 shadow-xl"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className="space-y-4">

				<div>

					<label
						htmlFor="voucher"
						className="mb-2 block text-sm font-medium text-[#B8BDD3]"
					>
						Do you have a voucher or gift card?
					</label>

					<input
						id="voucher"
						type="text"
						value={userInputCode}
						onChange={(e) => setUserInputCode(e.target.value)}
						placeholder="Enter coupon code"
						className="block w-full rounded-xl border border-[#2B2F4A] bg-[#0F1224] px-4 py-3 text-white placeholder-[#6B7280] outline-none transition-all duration-300 focus:border-[#FF5A2C] focus:ring-2 focus:ring-[#FF5A2C]"
					/>

				</div>

				<motion.button
					type="button"
					onClick={handleApplyCoupon}
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.96 }}
					className="w-full rounded-xl bg-[#FF5A2C] py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#FF744D]"
				>
					Apply Coupon
				</motion.button>

			</div>

			{isCouponApplied && coupon && (
				<div className="rounded-xl border border-[#2B2F4A] bg-[#0F1224] p-4">

					<h3 className="text-lg font-semibold text-white">
						Applied Coupon
					</h3>

					<p className="mt-2 text-[#9CA3AF]">
						<span className="font-semibold text-[#FF5A2C]">
							{coupon.code}
						</span>{" "}
						• {coupon.discountPercentage}% OFF
					</p>

					<motion.button
						type="button"
						onClick={handleRemoveCoupon}
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.96 }}
						className="mt-4 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-700"
					>
						Remove Coupon
					</motion.button>

				</div>
			)}

			{coupon && (
				<div className="rounded-xl border border-[#2B2F4A] bg-[#0F1224] p-4">

					<h3 className="text-lg font-semibold text-white">
						Your Available Coupon
					</h3>

					<p className="mt-2 text-[#9CA3AF]">
						<span className="font-semibold text-[#FF5A2C]">
							{coupon.code}
						</span>{" "}
						• {coupon.discountPercentage}% OFF
					</p>

				</div>
			)}
		</motion.div>
	);
};

export default GiftCouponCard;