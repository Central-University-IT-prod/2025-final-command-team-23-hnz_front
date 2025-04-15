"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { SERVER_URL } from "@/config";
import toast from "react-hot-toast";

export const CashierForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const id = localStorage.getItem("company-id");
			const token = localStorage.getItem("company-token");

			const response = await fetch(
				`${SERVER_URL}/company/${id}/cashier/`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username,
						password,
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				toast.error(
					data.detail.password ||
						data.detail.username ||
						data.detail.name ||
						"Ошибка при создании кассира"
				);
				return;
			}

			toast.success("Кассир успешно создан!");
			setUsername("");
			setPassword("");
			window.location.reload();
		} catch (error) {
			console.error(error);
			toast.error("Ошибка при загрузке");
		}
	};

	const isSaveDisabled = !username.trim() || !password.trim();

	return (
		<div className="bg-white p-6 rounded-lg shadow-md mx-4">
			<h2 className="text-xl font-semibold mb-4">
				Добавить нового кассира
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-4">
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Имя пользователя
						</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
							placeholder="Введите имя пользователя"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Пароль
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
							placeholder="Введите пароль"
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={isSaveDisabled}
					className="mt-4 flex w-full items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
				>
					<PlusCircle size={18} />
					Добавить кассира
				</button>
			</form>
		</div>
	);
};
