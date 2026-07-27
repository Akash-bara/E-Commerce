import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className="min-h-screen bg-[#0B0C1D] relative overflow-hidden text-white">
			<div className="relative z-10 container mx-auto px-4 py-16">
				<motion.h1
					className="mb-10 text-center text-4xl font-bold text-white"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<span className="text-[#FF5A2C]">Admin</span> Dashboard
				</motion.h1>

				<div className="mb-10 flex flex-wrap justify-center gap-4">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
								activeTab === tab.id
									? "bg-[#FF5A2C] text-white shadow-lg"
									: "border border-[#2B2F4A] bg-[#1A1D35] text-[#B8BDD3] hover:bg-[#252A47] hover:text-white"
							}`}
						>
							<tab.icon className="mr-2 h-5 w-5" />
							{tab.label}
						</button>
					))}
				</div>

				<div className="rounded-2xl border border-[#2B2F4A] bg-[#15172B] p-6 shadow-xl">
					{activeTab === "create" && <CreateProductForm />}
					{activeTab === "products" && <ProductsList />}
					{activeTab === "analytics" && <AnalyticsTab />}
				</div>
			</div>
		</div>
	);
};

export default AdminPage;