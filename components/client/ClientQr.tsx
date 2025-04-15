"use client";

import React, { useEffect, useState } from "react";
import { FaQrcode } from "react-icons/fa";
import QRCode from "react-qr-code";
import { getTgUser } from "./services/getClient";

export const ClientQr = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getTgUser();
				setUser(userData);
			} catch (error) {
				console.error(
					"Ошибка при загрузке данных пользователя:",
					error
				);
			}
		};

		fetchUser();
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isOpen]);

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="flex flex-col items-center justify-center bg-yellow-400 text-white rounded-full w-16 h-16 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4"
			>
				<FaQrcode size={28} />
			</button>

			{isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-xl p-6 w-full max-w-sm">
						<h2 className="text-xl font-bold text-center mb-4">
							Ваш персональный QR-код
						</h2>
						<p className="text-gray-600 text-center mb-6">
							Покажите этот код при оплате для начисления баллов
						</p>

						<div className="flex justify-center mb-6">
							<div className="p-4 bg-white border-2 border-indigo-100 rounded-lg">
								<QRCode value={user.id.toString()} size={200} />
							</div>
						</div>

						<p className="text-center text-gray-700 font-medium">
							{user?.username}
						</p>
						<p className="text-center text-gray-700 font-medium">
							{user?.firstname}
						</p>
						<p className="text-center text-gray-500 text-sm mb-6">
							ID: {user?.id}
						</p>

						<button
							onClick={() => setIsOpen(false)}
							className="w-full py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
						>
							Закрыть
						</button>
					</div>
				</div>
			)}
		</>
	);
};
