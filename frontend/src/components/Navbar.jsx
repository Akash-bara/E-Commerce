import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore.js";
import { useCartStore } from "../stores/useCartStore.js";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	return (
		<header className="fixed top-0 left-0 w-full bg-[#0B0C1D]/95 backdrop-blur-md shadow-xl z-40 transition-all duration-300 border-b border-[#2B2F4A]">
			<div className="container mx-auto px-4 py-3">
				<div className="flex flex-wrap justify-between items-center">
					<Link
						to="/"
						className="text-2xl font-bold text-white flex items-center space-x-2 hover:text-[#FF5A2C] transition-colors duration-300"
					>
						E-Commerce
					</Link>

					<nav className="flex flex-wrap items-center gap-4">
						<Link
							to="/"
							className="text-[#B8BDD3] hover:text-[#FF5A2C] transition duration-300 ease-in-out"
						>
							Home
						</Link>

						{user && (
							<Link
								to="/cart"
								className="relative group text-[#B8BDD3] hover:text-[#FF5A2C] transition duration-300 ease-in-out"
							>
								<ShoppingCart
									className="inline-block mr-1 group-hover:text-[#FF5A2C]"
									size={20}
								/>
								<span className="hidden sm:inline">Cart</span>

								{cart.length > 0 && (
									<span
										className="absolute -top-2 -left-2 bg-[#FF5A2C] text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-[#FF744D] transition duration-300 ease-in-out"
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}

						{isAdmin && (
							<Link
								to="/secret-dashboard"
								className="bg-[#FF5A2C] hover:bg-[#FF744D] text-white px-3 py-2 rounded-xl font-medium transition duration-300 ease-in-out flex items-center shadow-lg"
							>
								<Lock className="inline-block mr-1" size={18} />
								<span className="hidden sm:inline">Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								onClick={logout}
								className="bg-[#1A1D35] hover:bg-[#252A47] border border-[#2B2F4A] text-white py-2 px-4 rounded-xl flex items-center transition duration-300 ease-in-out"
							>
								<LogOut size={18} />
								<span className="hidden sm:inline ml-2">Log Out</span>
							</button>
						) : (
							<>
								<Link
									to="/signup"
									className="bg-[#FF5A2C] hover:bg-[#FF744D] text-white py-2 px-4 rounded-xl flex items-center transition duration-300 ease-in-out shadow-lg"
								>
									<UserPlus className="mr-2" size={18} />
									Sign Up
								</Link>

								<Link
									to="/login"
									className="bg-[#1A1D35] hover:bg-[#252A47] border border-[#2B2F4A] text-white py-2 px-4 rounded-xl flex items-center transition duration-300 ease-in-out"
								>
									<LogIn className="mr-2" size={18} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;