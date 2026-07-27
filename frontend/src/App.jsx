import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;
		getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className="min-h-screen bg-[#0B0C1D] text-white relative overflow-hidden">

			{/* Premium Background */}
			<div className="absolute inset-0 overflow-hidden">

				<div
					className="absolute inset-0"
					style={{
						background:
							"radial-gradient(circle at top, rgba(255,90,44,0.12) 0%, rgba(11,12,29,0.97) 40%, rgba(11,12,29,1) 100%)",
					}}
				/>

				<div
					className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full blur-3xl"
					style={{
						background: "rgba(255,90,44,0.08)",
					}}
				/>

			</div>

			<div className="relative z-50">

				<Navbar />

				<div className="pt-20">

					<Routes>

						<Route
							path="/"
							element={<HomePage />}
						/>

						<Route
							path="/signup"
							element={!user ? <SignUpPage /> : <Navigate to="/" />}
						/>

						<Route
							path="/login"
							element={!user ? <LogInPage /> : <Navigate to="/" />}
						/>

						<Route
							path="/secret-dashboard"
							element={
								user?.role === "admin"
									? <AdminPage />
									: <Navigate to="/login" />
							}
						/>

						<Route
							path="/category/:category"
							element={<CategoryPage />}
						/>

						<Route
							path="/cart"
							element={user ? <CartPage /> : <Navigate to="/login" />}
						/>

						<Route
							path="/purchase-success"
							element={
								user
									? <PurchaseSuccessPage />
									: <Navigate to="/login" />
							}
						/>

						<Route
							path="/purchase-cancel"
							element={
								user
									? <PurchaseCancelPage />
									: <Navigate to="/login" />
							}
						/>

					</Routes>

				</div>

			</div>

			<Toaster
				position="top-right"
				toastOptions={{
					style: {
						background: "#1A1D35",
						color: "#fff",
						border: "1px solid #2B2F4A",
					},
				}}
			/>

		</div>
	);
}

export default App;