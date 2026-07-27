import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<div className="min-h-screen flex flex-col justify-center bg-[#0B0C1D] py-12 sm:px-6 lg:px-8">

			<motion.div
				className="sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className="mt-6 text-center text-4xl font-extrabold text-white">
					Welcome Back
				</h2>

				<p className="mt-2 text-center text-[#9CA3AF]">
					Login to continue shopping
				</p>
			</motion.div>

			<motion.div
				className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className="bg-[#1A1D35] border border-[#2B2F4A] rounded-2xl shadow-2xl py-8 px-6 sm:px-10">

					<form
						onSubmit={handleSubmit}
						className="space-y-6"
					>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-[#B8BDD3]"
							>
								Email Address
							</label>

							<div className="mt-2 relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail
										className="h-5 w-5 text-[#9CA3AF]"
										aria-hidden="true"
									/>
								</div>

								<input
									id="email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="you@example.com"
									className="block w-full rounded-xl border border-[#2B2F4A] bg-[#0F1224] py-3 pl-10 pr-3 text-white placeholder-[#6B7280] focus:border-[#FF5A2C] focus:ring-2 focus:ring-[#FF5A2C] outline-none transition-all"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-[#B8BDD3]"
							>
								Password
							</label>

							<div className="mt-2 relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock
										className="h-5 w-5 text-[#9CA3AF]"
										aria-hidden="true"
									/>
								</div>

								<input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="••••••••"
									className="block w-full rounded-xl border border-[#2B2F4A] bg-[#0F1224] py-3 pl-10 pr-3 text-white placeholder-[#6B7280] focus:border-[#FF5A2C] focus:ring-2 focus:ring-[#FF5A2C] outline-none transition-all"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full flex items-center justify-center rounded-xl bg-[#FF5A2C] hover:bg-[#FF744D] py-3 text-white font-semibold transition-all duration-300 disabled:opacity-60"
						>
							{loading ? (
								<>
									<Loader className="mr-2 h-5 w-5 animate-spin" />
									Loading...
								</>
							) : (
								<>
									<LogIn className="mr-2 h-5 w-5" />
									Login
								</>
							)}
						</button>

					</form>

					<p className="mt-8 text-center text-sm text-[#9CA3AF]">
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="font-semibold text-[#FF5A2C] hover:text-[#FF744D] transition-colors"
						>
							Sign Up
							<ArrowRight className="inline ml-1 h-4 w-4" />
						</Link>
					</p>

				</div>
			</motion.div>

		</div>
	);
};

export default LoginPage;