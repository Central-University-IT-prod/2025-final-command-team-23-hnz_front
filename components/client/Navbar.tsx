"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaStore } from "react-icons/fa";
import { ClientQr } from "./ClientQr";

const Navbar = () => {
	const pathname = usePathname();

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10">
			<div className="max-w-md mx-auto">
				<div className="flex justify-around items-center h-16 px-4 relative">
					<Link
						href="/client/loyal/my"
						className={`flex flex-col items-center ${
							pathname === "/client/loyal/my"
								? "text-yellow-500"
								: "text-gray-500"
						}`}
					>
						<FaHome size={24} />
						<span className="text-xs mt-1">Мои лояльности</span>
					</Link>

					<ClientQr />

					<Link
						href="/client/loyal"
						className={`flex flex-col items-center ${
							pathname === "/client/loyal"
								? "text-yellow-500"
								: "text-gray-500"
						}`}
					>
						<FaStore size={24} />
						<span className="text-xs mt-1">Все компании</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
