import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore.js";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	return (
		<motion.div
			className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#2B2F4A] bg-[#1A1D35] shadow-xl"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-[#2B2F4A]">

					<thead className="bg-[#15172B]">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#B8BDD3]">
								Product
							</th>

							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#B8BDD3]">
								Price
							</th>

							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#B8BDD3]">
								Category
							</th>

							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#B8BDD3]">
								Featured
							</th>

							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#B8BDD3]">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-[#2B2F4A] bg-[#1A1D35]">
						{products?.map((product) => (
							<tr
								key={product._id}
								className="transition-colors duration-300 hover:bg-[#252A47]"
							>
								<td className="whitespace-nowrap px-6 py-4">
									<div className="flex items-center">

										<img
											src={product.image}
											alt={product.name}
											className="h-12 w-12 rounded-xl object-cover border border-[#2B2F4A]"
										/>

										<div className="ml-4">
											<p className="font-semibold text-white">
												{product.name}
											</p>
										</div>

									</div>
								</td>

								<td className="whitespace-nowrap px-6 py-4">
									<p className="font-semibold text-[#FF5A2C]">
										₹{product.price.toFixed(2)}
									</p>
								</td>

								<td className="whitespace-nowrap px-6 py-4">
									<span className="rounded-full bg-[#0F1224] px-3 py-1 text-sm text-[#B8BDD3] capitalize">
										{product.category}
									</span>
								</td>

								<td className="whitespace-nowrap px-6 py-4">
									<button
										onClick={() => toggleFeaturedProduct(product._id)}
										className={`rounded-xl p-2 transition-all duration-300 ${
											product.isFeatured
												? "bg-[#FF5A2C] text-white"
												: "bg-[#0F1224] text-[#9CA3AF] hover:bg-[#252A47]"
										}`}
									>
										<Star
											className="h-5 w-5"
											fill={product.isFeatured ? "currentColor" : "none"}
										/>
									</button>
								</td>

								<td className="whitespace-nowrap px-6 py-4">
									<button
										onClick={() => deleteProduct(product._id)}
										className="rounded-xl p-2 text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-300"
									>
										<Trash className="h-5 w-5" />
									</button>
								</td>
							</tr>
						))}
					</tbody>

				</table>
			</div>
		</motion.div>
	);
};

export default ProductsList;