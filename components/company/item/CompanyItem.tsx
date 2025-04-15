"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { ICompanyItem } from "../types";
import { emptyImage, SERVER_URL } from "@/config";
import { Edit, X } from "lucide-react";
import toast from "react-hot-toast";

export const CompanyItem = ({ item }: { item: ICompanyItem }) => {
	const [name, setName] = useState(item.name);
	const [price, setPrice] = useState<number | null>(item.price);
	const [description, setDescription] = useState(item.description || "");
	const [status, setStatus] = useState(item.status);
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	useEffect(() => {
		if (isDialogOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isDialogOpen]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);
			setPreview(URL.createObjectURL(selectedFile));
		}
	};

	const handleSave = async () => {
		try {
			const companyId = localStorage.getItem("company-id");
			const token = localStorage.getItem("company-token");

			const formData = new FormData();
			formData.append("name", name);
			formData.append("price", price!.toString());
			formData.append("description", description);
			formData.append("status", status);

			if (file) {
				formData.append("image", file);
			}

			const response = await fetch(
				`${SERVER_URL}/company/${companyId}/item/${item.id}/`,
				{
					method: "PATCH",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: formData,
				}
			);

			if (response.status === 413) {
				toast.error("Изображение должно быть до 2 МБ");
				return;
			}

			if (!response.ok) {
				throw new Error("Ошибка при обновлении данных");
			}

			window.location.reload();
		} catch (error: any) {
			console.log(error);
			toast.error(error || "Произошла ошибка");
		}
	};

	const openDialog = () => setIsDialogOpen(true);
	const closeDialog = () => {
		setIsDialogOpen(false);
		setName(item.name);
		setPrice(item.price);
		setDescription(item.description);
		setPreview(null);
		setFile(null);
	};

	return (
		<>
			<div className="flex flex-col gap-y-2 w-full bg-white p-2 rounded-lg border border-slate-300 shadow-sm justify-between">
				<div className="flex flex-col gap-y-2">
					<div className="bg-zinc-300/80 rounded-lg flex w-full items-center justify-center h-40">
						<img
							src={item.image}
							className="max-w-40 max-h-32"
							alt=""
						/>
					</div>
					<div className="flex flex-col gap-y-0.5 w-full">
						<div className="flex justify-between items-center w-full">
							<span className="text-lg font-medium">
								{item.name}
							</span>
							<span className="text-base">{item.price} ₽</span>
						</div>
						<span className="text-sm">{item.description}</span>
					</div>
				</div>

				<button
					className="mt-4 w-full rounded-md bg-yellow-500 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-600 transition-colors"
					onClick={openDialog}
				>
					Изменить
				</button>
			</div>

			{isDialogOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6">
					<div className="bg-white rounded-lg pb-4 px-4 sm:pb-6 sm:px-6 w-full max-w-md max-h-[95vh] overflow-y-auto">
						<div className="flex sticky top-0 py-2 z-50 bg-white justify-between items-center">
							<h2 className="text-xl font-bold text-yellow-500 text-center">
								Редактирование
							</h2>
							<button
								onClick={closeDialog}
								className="text-gray-500 hover:text-gray-700"
							>
								<X />
							</button>
						</div>

						<div className="relative aspect-square mb-1">
							<Image
								fill
								sizes="100%"
								priority
								src={preview || item.image || emptyImage}
								alt={item.name}
								className="w-full h-full object-cover rounded-lg cursor-default"
							/>
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-all bg-black/70 rounded-xl p-6 ">
								<label className="cursor-pointer">
									<input
										type="file"
										accept="image/*"
										className="opacity-0 absolute w-0 h-0"
										onChange={handleFileChange}
									/>
									<Edit size={64} className="text-white " />
								</label>
							</div>
						</div>

						<form
							className="flex flex-col gap-3"
							onSubmit={(e) => {
								e.preventDefault();
								handleSave();
							}}
						>
							<div className="flex flex-col gap-1">
								<label
									htmlFor="name"
									className="text-sm text-gray-600"
								>
									Название
								</label>
								<input
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
								/>
							</div>

							<div className="flex flex-col gap-1">
								<label
									htmlFor="price"
									className="text-sm text-gray-600"
								>
									Цена
								</label>
								<input
									id="price"
									type="number"
									value={price || ""}
									onChange={(e) =>
										setPrice(Number(e.target.value))
									}
									className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
								/>
							</div>

							<div className="flex flex-col gap-1">
								<label
									htmlFor="description"
									className="text-sm text-gray-600"
								>
									Описание
								</label>
								<textarea
									id="description"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
									rows={2}
								/>
							</div>

							<div className="">
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										value=""
										checked={status === "active"}
										onChange={() =>
											setStatus(
												status === "active"
													? "inactive"
													: "active"
											)
										}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
									<span className="ml-3 text-sm font-medium text-gray-900">
										{status === "active"
											? "Активен"
											: "Неактивен"}
									</span>
								</label>
							</div>

							<button
								type="submit"
								disabled={
									(name === item.name &&
										(price === item.price ||
											(price === null &&
												item.price === null)) &&
										description === item.description &&
										status === item.status &&
										!file) ||
									(price !== null && price < 0)
								}
								className="w-full mt-2 px-3 py-1.5 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
							>
								Сохранить
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
};
