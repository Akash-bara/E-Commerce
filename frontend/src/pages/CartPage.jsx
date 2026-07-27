import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className="min-h-screen bg-[#0B0C1D] py-8 md:py-16 text-white">
			<div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
				<div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">

					<motion.div
						className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className="space-y-6">
								{cart.map((item) => (
									<CartItem
										key={item._id}
										item={item}
									/>
								))}
							</div>
						)}

						{cart.length > 0 && <PeopleAlsoBought />}
					</motion.div>

					{cart.length > 0 && (
						<motion.div
							className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
							<GiftCouponCard />
						</motion.div>
					)}

				</div>
			</div>
		</div>
	);
};

export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className="flex flex-col items-center justify-center space-y-5 py-24"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>

		<div className="bg-[#1A1D35] p-8 rounded-full border border-[#2B2F4A] shadow-xl">
			<ShoppingCart className="h-20 w-20 text-[#FF5A2C]" />
		</div>

		<h2 className="text-4xl font-bold text-white">
			Your Cart is Empty
		</h2>

		<p className="text-[#9CA3AF] text-lg text-center max-w-md">
			Looks like you haven't added any products yet.
			Start exploring our premium collection.
		</p>

		<Link
			to="/"
			className="mt-4 rounded-xl bg-[#FF5A2C] hover:bg-[#FF744D] px-8 py-3 font-semibold text-white transition-all duration-300 shadow-lg"
		>
			Start Shopping
		</Link>

	</motion.div>
);