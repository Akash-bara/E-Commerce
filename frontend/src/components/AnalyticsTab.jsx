import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios.js";
import {
	Users,
	Package,
	ShoppingCart,
	DollarSign,
} from "lucide-react";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});

	const [dailySalesData, setDailySalesData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");

				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center py-16 text-[#B8BDD3]">
				Loading...
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

			<div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

				<AnalyticsCard
					title="Total Users"
					value={analyticsData.users.toLocaleString()}
					icon={Users}
				/>

				<AnalyticsCard
					title="Total Products"
					value={analyticsData.products.toLocaleString()}
					icon={Package}
				/>

				<AnalyticsCard
					title="Total Sales"
					value={analyticsData.totalSales.toLocaleString()}
					icon={ShoppingCart}
				/>

				<AnalyticsCard
					title="Total Revenue"
					value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
					icon={DollarSign}
				/>

			</div>

			<motion.div
				className="rounded-2xl border border-[#2B2F4A] bg-[#1A1D35] p-6 shadow-xl"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
				<h2 className="mb-6 text-2xl font-bold text-white">
					Sales Analytics
				</h2>

				<ResponsiveContainer width="100%" height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid
							stroke="#2B2F4A"
							strokeDasharray="3 3"
						/>

						<XAxis
							dataKey="name"
							stroke="#B8BDD3"
						/>

						<YAxis
							yAxisId="left"
							stroke="#B8BDD3"
						/>

						<YAxis
							yAxisId="right"
							orientation="right"
							stroke="#B8BDD3"
						/>

						<Tooltip
							contentStyle={{
								backgroundColor: "#1A1D35",
								border: "1px solid #2B2F4A",
								borderRadius: "12px",
								color: "#fff",
							}}
						/>

						<Legend />

						<Line
							yAxisId="left"
							type="monotone"
							dataKey="sales"
							name="Sales"
							stroke="#FF5A2C"
							strokeWidth={3}
							activeDot={{
								r: 7,
							}}
						/>

						<Line
							yAxisId="right"
							type="monotone"
							dataKey="revenue"
							name="Revenue"
							stroke="#F59E0B"
							strokeWidth={3}
							activeDot={{
								r: 7,
							}}
						/>
					</LineChart>
				</ResponsiveContainer>

			</motion.div>

		</div>
	);
};

export default AnalyticsTab;

const AnalyticsCard = ({
	title,
	value,
	icon: Icon,
}) => (
	<motion.div
		className="relative overflow-hidden rounded-2xl border border-[#2B2F4A] bg-[#1A1D35] p-6 shadow-xl"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className="relative z-10 flex items-center justify-between">

			<div>
				<p className="mb-2 text-sm font-semibold text-[#B8BDD3]">
					{title}
				</p>

				<h3 className="text-3xl font-bold text-white">
					{value}
				</h3>
			</div>

			<div className="rounded-2xl bg-[#FF5A2C]/15 p-4">
				<Icon className="h-8 w-8 text-[#FF5A2C]" />
			</div>

		</div>

		<div className="absolute inset-0 bg-gradient-to-br from-[#FF5A2C]/10 via-transparent to-transparent" />
	</motion.div>
);