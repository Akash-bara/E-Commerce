import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/recommendations");
				setRecommendations(res.data);
			} catch (error) {
				toast.error(
					error.response?.data?.message ||
						"An error occurred while fetching recommendations"
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="mt-12">

			<div className="flex items-center justify-between mb-6">

				<div>

					<h2 className="text-3xl font-bold text-white">
						People Also Bought
					</h2>

					<p className="mt-2 text-[#9CA3AF]">
						Customers who purchased these items also liked these products.
					</p>

				</div>

			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

				{recommendations.map((product) => (
					<ProductCard
						key={product._id}
						product={product}
					/>
				))}

			</div>

		</div>
	);
};

export default PeopleAlsoBought;