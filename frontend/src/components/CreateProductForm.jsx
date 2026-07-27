import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore.js";

const categories = [
	"jeans",
	"t-shirts",
	"shoes",
	"glasses",
	"jackets",
	"suits",
	"bags",
];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createProduct(newProduct);

			setNewProduct({
				name: "",
				description: "",
				price: "",
				category: "",
				image: "",
			});
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({
					...newProduct,
					image: reader.result,
				});
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<motion.div
			className="mx-auto mb-8 max-w-xl rounded-2xl border border-[#2B2F4A] bg-[#1A1D35] p-8 shadow-xl"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className="mb-8 text-3xl font-bold text-white">
				Create <span className="text-[#FF5A2C]">New Product</span>
			</h2>

			<form onSubmit={handleSubmit} className="space-y-6">

				<div>
					<label
						htmlFor="name"
						className="mb-2 block text-sm font-medium text-[#B8BDD3]"
					>
						Product Name
					</label>

					<input
						type="text"
						id="name"
						value={newProduct.name}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								name: e.target.value,
							})
						}
						className="w-full rounded-xl border border-[#2B2F4A] bg-[#0F1224] px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-[#FF5A2C] focus:ring-2 focus:ring-[#FF5A2C]"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="description"
						className="mb-2 block text-sm font-medium text-[#B8BDD3]"
					>
						Description
					</label>

					<textarea
						id="description"
						rows="4"
						value={newProduct.description}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								description: e.target.value,
							})
						}
						className="w-full rounded-xl border border-[#2B2F4A] bg-[#0F1224] px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-[#FF5A2C] focus:ring-2 focus:ring-[#FF5A2C]"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="price"
						className="mb-2 block text-sm font-medium text-[#B8BDD3]"
					>
						Price
					</label>

					<input
						type="number"
						id="price"
						step="0.01"
						value={newProduct.price}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								price: e.target.value,
							})
						}
						className="w-full rounded-xl border border-[#2B2F4A] bg-[#0F1224] px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-[#FF5A2C] focus:ring-2 focus:ring-[#FF5A2C]"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="category"
						className="mb-2 block text-sm font-medium text-[#B8BDD3]"
					>
						Category
					</label>

					<select
						id="category"
						value={newProduct.category}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								category: e.target.value,
							})
						}
						className="w-full rounded-xl border border-[#2B2F4A] bg-[#0F1224] px-4 py-3 text-white outline-none transition-all duration-300 focus:border-[#FF5A2C] focus:ring-2 focus:ring-[#FF5A2C]"
						required
					>
						<option value="">Select a category</option>

						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div className="flex items-center">

					<input
						type="file"
						id="image"
						accept="image/*"
						className="sr-only"
						onChange={handleImageChange}
					/>

					<label
						htmlFor="image"
						className="cursor-pointer rounded-xl border border-[#2B2F4A] bg-[#0F1224] px-5 py-3 font-medium text-[#B8BDD3] transition-all duration-300 hover:border-[#FF5A2C] hover:text-white"
					>
						<Upload className="mr-2 inline-block h-5 w-5" />
						Upload Image
					</label>

					{newProduct.image && (
						<span className="ml-4 text-sm text-[#FF5A2C]">
							✓ Image Uploaded
						</span>
					)}

				</div>

				<button
					type="submit"
					disabled={loading}
					className="flex w-full items-center justify-center rounded-xl bg-[#FF5A2C] py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#FF744D] disabled:cursor-not-allowed disabled:opacity-60"
				>
					{loading ? (
						<>
							<Loader className="mr-2 h-5 w-5 animate-spin" />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className="mr-2 h-5 w-5" />
							Create Product
						</>
					)}
				</button>

			</form>
		</motion.div>
	);
};

export default CreateProductForm;