import { useState } from "react";
import { Link } from "react-router-dom";
import {
	UserPlus,
	Mail,
	Lock,
	User,
	ArrowRight,
	Loader,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore.js";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
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
					Create your account
				</h2>

				<p className="mt-2 text-center text-[#9CA3AF]">
					Join us and start shopping today.
				</p>
			</motion.div>

			<motion.div
				className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className="bg-[#1A1D35] border border-[#2B2F4A] rounded-2xl shadow-2xl py-8 px-6 sm:px-10">

					<form onSubmit={handleSubmit} className="space-y-6">

						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-[#B8BDD3]"
							>
								Full Name
							</label>

							<div className="mt-2 relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-[#9CA3AF]" />
								</div>

								<input
									id="name"
									type="text"
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({
											...formData,
											name: e.target.value,
										})
									}
									placeholder="John Doe"
									className="block w-full rounded-xl border border-[#2B2F4A] bg-[#0F1224] py-3 pl-10 pr-3 text-white placeholder-[#6B7280] outline-none transition-all focus:border-[#FF5A2C] focus:ring-2 focus:ring-[#FF5A2C]"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-[#B8BDD3]"
							>
								Email Address
							</label>

							<div className="mt-2 relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-[#9CA3AF]" />
								</div>

								<input
									id="email"
									type="email"
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
									placeholder="you@example.com"
									className="block w-full rounded-xl border border-[#2B2F4A] bg-[#0F1224] py-3 pl-10 pr-3 text-white placeholder-[#6B7280] outline-none transition-all focus:border-[#FF5A2C] focus:ring-2 focus:ring-[#FF5A2C]"
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
									<Lock className="h-5 w-5 text-[#9CA3AF]" />
								</div>

								<input
									id="password"
									type="password"
									required
									value={formData.password}
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
									}
									placeholder="••••••••"
									className="block w-full rounded-xl border border-[#2B2F4A] bg-[#0F1224] py-3 pl-10 pr-3 text-white placeholder-[#6B7280] outline-none transition-all focus:border-[#FF5A2C] focus:ring-2 focus:ring-[#FF5A2C]"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-[#B8BDD3]"
							>
								Confirm Password
							</label>

							<div className="mt-2 relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-[#9CA3AF]" />
								</div>

								<input
									id="confirmPassword"
									type="password"
									required
									value={formData.confirmPassword}
									onChange={(e) =>
										setFormData({
											...formData,
											confirmPassword: e.target.value,
										})
									}
									placeholder="••••••••"
									className="block w-full rounded-xl border border-[#2B2F4A] bg-[#0F1224] py-3 pl-10 pr-3 text-white placeholder-[#6B7280] outline-none transition-all focus:border-[#FF5A2C] focus:ring-2 focus:ring-[#FF5A2C]"
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
									<UserPlus className="mr-2 h-5 w-5" />
									Sign Up
								</>
							)}
						</button>

					</form>

					<p className="mt-8 text-center text-sm text-[#9CA3AF]">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-semibold text-[#FF5A2C] hover:text-[#FF744D] transition-colors"
						>
							Login here
							<ArrowRight className="inline ml-1 h-4 w-4" />
						</Link>
					</p>

				</div>
			</motion.div>
		</div>
	);
};

export default SignUpPage;