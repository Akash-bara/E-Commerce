import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore.js";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	const { addToCart } = useCartStore();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="text-center text-5xl sm:text-6xl font-bold text-white mb-4">
					Featured Products
				</h2>

				<div className="relative">
					<div className="overflow-hidden">
						<div
							className="flex transition-transform duration-300 ease-in-out"
							style={{
								transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
							}}
						>
							{featuredProducts?.map((product) => (
								<div
									key={product._id}
									className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
								>
									<div className="bg-[#1A1D35] rounded-2xl shadow-xl overflow-hidden h-full transition-all duration-300 hover:shadow-2xl border border-[#2B2F4A]">

										<div className="overflow-hidden">
											<img
												src={product.image}
												alt={product.name}
												className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
											/>
										</div>

										<div className="p-4">
											<h3 className="text-lg font-semibold mb-2 text-white">
												{product.name}
											</h3>

											<p className="text-[#FF5A2C] font-semibold text-xl mb-4">
												₹{product.price.toFixed(2)}
											</p>

											<button
												onClick={() => addToCart(product)}
												className="w-full bg-[#FF5A2C] hover:bg-[#FF744D] text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center"
											>
												<ShoppingCart className="w-5 h-5 mr-2" />
												Add to Cart
											</button>
										</div>

									</div>
								</div>
							))}
						</div>
					</div>

					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-3 rounded-full transition duration-300 ${
							isStartDisabled
								? "bg-[#2B2F4A] cursor-not-allowed"
								: "bg-[#FF5A2C] hover:bg-[#FF744D]"
						}`}
					>
						<ChevronLeft className="w-6 h-6 text-white" />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-3 rounded-full transition duration-300 ${
							isEndDisabled
								? "bg-[#2B2F4A] cursor-not-allowed"
								: "bg-[#FF5A2C] hover:bg-[#FF744D]"
						}`}
					>
						<ChevronRight className="w-6 h-6 text-white" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;