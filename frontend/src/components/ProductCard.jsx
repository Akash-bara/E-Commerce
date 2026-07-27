import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";
import { useCartStore } from "../stores/useCartStore.js";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		}

		addToCart(product);
	};

	return (
		<div className="flex w-full relative flex-col overflow-hidden rounded-2xl bg-[#1A1D35] border border-[#2B2F4A] shadow-xl transition-all duration-300 hover:shadow-2xl">

			<div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">

				<img
					className="object-cover w-full transition-transform duration-300 hover:scale-105"
					src={product.image}
					alt={product.name}
				/>

				<div className="absolute inset-0 bg-[#0B0C1D]/20" />

			</div>

			<div className="mt-4 px-5 pb-5">

				<h5 className="text-xl font-semibold tracking-tight text-white">
					{product.name}
				</h5>

				<div className="mt-2 mb-5 flex items-center justify-between">
					<span className="text-3xl font-bold text-[#FF5A2C]">
						₹{product.price}
					</span>
				</div>

				<button
					onClick={handleAddToCart}
					className="flex items-center justify-center rounded-xl bg-[#FF5A2C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#FF744D] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#FF5A2C]"
				>
					<ShoppingCart size={22} className="mr-2" />
					Add to Cart
				</button>

			</div>
		</div>
	);
};

export default ProductCard;