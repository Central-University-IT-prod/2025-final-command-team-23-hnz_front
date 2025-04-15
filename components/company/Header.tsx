"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const CompanyHeader = () => {
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLogout = async () => {
		localStorage.removeItem("company-token");
		localStorage.removeItem("company-id");

		router.push("/company/auth/login");
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="sticky inset-x-0 top-0 z-50 bg-white border-b border-slate-300 py-2 shadow-sm mb-4">
			<div className="flex w-11/12 2xl:w-10/12 justify-between items-center mx-auto">
				<Link href="/">
					<Image
						src="/logo.svg"
						width={128}
						height={0}
						className="w-32 h-auto"
						alt="Логотип"
					/>
				</Link>

				<button
					onClick={toggleMenu}
					className="sm:hidden text-gray-500 hover:text-gray-700"
				>
					{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>

				<nav className="hidden sm:flex gap-x-6 items-center">
					<Link
						href="/company/catalog"
						className="px-4 py-1 rounded-md hover:bg-slate-200 transition"
					>
						Каталог
					</Link>
					<Link
						href="/company/cashiers"
						className="px-4 py-1 rounded-md hover:bg-slate-200 transition"
					>
						Кассиры
					</Link>
					<Link
						href="/company/analytics"
						className="px-4 py-1 rounded-md hover:bg-slate-200 transition"
					>
						Аналитика
					</Link>
					<button
						onClick={handleLogout}
						className="px-4 py-1 text-red-500 hover:bg-red-50 rounded-md transition"
					>
						Выйти
					</button>
				</nav>
			</div>

			{isMenuOpen && (
				<div className="sm:hidden bg-white border-t mt-2 border-slate-200">
					<nav className="flex flex-col gap-2 p-2">
						<Link
							href="/company/catalog"
							className="px-4 py-2 rounded-md hover:bg-slate-200 transition"
							onClick={toggleMenu}
						>
							Каталог
						</Link>
						<Link
							href="/company/cashiers"
							className="px-4 py-2 rounded-md hover:bg-slate-200 transition"
							onClick={toggleMenu}
						>
							Кассиры
						</Link>
						<Link
							href="/company/analytics"
							className="px-4 py-2 rounded-md hover:bg-slate-200 transition"
							onClick={toggleMenu}
						>
							Аналитика
						</Link>
						<button
							onClick={() => {
								handleLogout();
								toggleMenu();
							}}
							className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-md transition text-left"
						>
							Выйти
						</button>
					</nav>
				</div>
			)}
		</header>
	);
};
