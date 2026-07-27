import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore.js";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className="rounded-2xl border border-[#2B2F4A] bg-[#1A1D35] p-4 shadow-xl transition-all duration-300 hover:shadow-2xl md:p-6">
			<div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">

				<div className="shrink-0 md:order-1">
					<img
						className="h-20 md:h-32 rounded-xl object-cover"
						src={item.image}
						alt={item.name}
					/>
				</div>

				<label className="sr-only">Choose quantity</label>

				<div className="flex items-center justify-between md:order-3 md:justify-end">

					<div className="flex items-center gap-3">

						<button
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
							className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2B2F4A] bg-[#0F1224] hover:bg-[#252A47] transition-all duration-300"
						>
							<Minus className="h-4 w-4 text-white" />
						</button>

						<span className="w-6 text-center font-semibold text-white">
							{item.quantity}
						</span>

						<button
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
							className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2B2F4A] bg-[#0F1224] hover:bg-[#252A47] transition-all duration-300"
						>
							<Plus className="h-4 w-4 text-white" />
						</button>

					</div>

					<div className="ml-8 text-end md:order-4 md:w-32">
						<p className="text-xl font-bold text-[#FF5A2C]">
							₹{item.price}
						</p>
					</div>

				</div>

				<div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">

					<h3 className="text-lg font-semibold text-white hover:text-[#FF5A2C] transition-colors duration-300">
						{item.name}
					</h3>

					<p className="text-sm text-[#9CA3AF]">
						{item.description}
					</p>

					<button
						onClick={() => removeFromCart(item._id)}
						className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-300"
					>
						<Trash size={18} />
						<span>Remove</span>
					</button>

				</div>

			</div>
		</div>
	);
};

export default CartItem;