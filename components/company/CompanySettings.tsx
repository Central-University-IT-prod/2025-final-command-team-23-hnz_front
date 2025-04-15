"use client";

import { Settings, X } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { SERVER_URL } from "@/config";

export const CompanySettings = () => {
	const [name, setName] = useState("");
	const [pointsRatio, setPointsRatio] = useState(0);
	const [maxSale, setMaxSale] = useState(0);
	const [description, setDescription] = useState("");
	const [username, setUsername] = useState("");
	const [isOpen, setIsOpen] = useState(false);

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

	useEffect(() => {
		const fetchCompanyData = async () => {
			try {
				const id = localStorage.getItem("company-id");
				const token = localStorage.getItem("company-token");

				const response = await fetch(`${SERVER_URL}/company/${id}/`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error();
				}

				const data = await response.json();
				setName(data.name);
				setUsername(data.username);
				setPointsRatio(data.bonus_points_ratio || 0);
				setMaxSale(data.max_sale || 0);
				setDescription(data.description || "");
			} catch {
				toast.error("Ошибка загрузки данных компании");
			}
		};

		fetchCompanyData();
	}, []);

	const handleSave = async () => {
		try {
			const id = localStorage.getItem("company-id");
			const token = localStorage.getItem("company-token");

			const response = await fetch(`${SERVER_URL}/company/${id}/`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					points_ratio: pointsRatio,
					max_sale: maxSale,
					description,
				}),
			});

			if (!response.ok) {
				throw new Error();
			}

			toast.success("Данные компании обновлены");
			setIsOpen(false);
		} catch {
			toast.error("Ошибка обновления данных компании");
		}
	};

	const openDialog = () => setIsOpen(true);
	const closeDialog = () => setIsOpen(false);

	const isSaveDisabled = !name.trim() || pointsRatio < 0 || maxSale < 0;

	return (
		<div>
			<button
				className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-sm sm:text-base text-white transition"
				onClick={openDialog}
			>
				<Settings size={18} />
				Параметры
			</button>

			{isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-yellow-500">
								Параметры компании
							</h2>
							<button
								onClick={closeDialog}
								className="text-gray-500 hover:text-gray-700"
							>
								<X />
							</button>
						</div>

						<div className="text-xl">
							Имя пользователя: {username}
						</div>

						<div className="grid gap-4 py-4">
							<div className="flex flex-col gap-2">
								<label
									htmlFor="name"
									className="text-yellow-500"
								>
									Название компании
								</label>
								<input
									id="name"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="border rounded-lg p-2 w-full"
									placeholder="Введите название компании"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label
									htmlFor="description"
									className="text-yellow-500"
								>
									Описание компании
								</label>
								<textarea
									id="description"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
									rows={2}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label
									htmlFor="pointsRatio"
									className="text-yellow-500"
								>
									Коэффициент начисления баллов (от 0 до 1)
								</label>
								<input
									id="pointsRatio"
									name="pointsRatio"
									type="number"
									value={pointsRatio}
									onChange={(e) =>
										setPointsRatio(Number(e.target.value))
									}
									className="border rounded-lg p-2 w-full"
									placeholder="Введите коэффициент"
									min="0"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label
									htmlFor="maxSale"
									className="text-yellow-500"
								>
									Максимальная скидка - коэффициент (от 0 до
									1)
								</label>
								<input
									id="maxSale"
									name="maxSale"
									type="number"
									value={maxSale}
									onChange={(e) =>
										setMaxSale(Number(e.target.value))
									}
									className="border rounded-lg p-2 w-full"
									placeholder="Введите максимальную скидку"
									min="0"
									max="100"
								/>
							</div>
						</div>

						<div className="flex justify-end mt-4">
							<button
								type="button"
								onClick={handleSave}
								disabled={isSaveDisabled}
								className="bg-yellow-500 text-white rounded-lg px-4 py-2 hover:bg-yellow-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
							>
								Сохранить
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
