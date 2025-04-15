"use client";

import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { SERVER_URL } from "@/config";
import { X } from "lucide-react";

export const AddCompanyItem = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(100);
	const [description, setDescription] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
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

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);
			setPreview(URL.createObjectURL(selectedFile));
		}
	};

	const handleSave = async () => {
		try {
			const id = localStorage.getItem("company-id");
			const token = localStorage.getItem("company-token");

			if (!file) {
				toast.error("Пожалуйста, загрузите изображение");
				return;
			}

			const formData = new FormData();
			formData.append("name", name);
			formData.append("price", price.toString());
			formData.append("description", description);
			formData.append("image", file);

			const response = await fetch(`${SERVER_URL}/company/${id}/item/`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Ошибка при отправке данных");
			}

			toast.success("Продукт создан!");
			window.location.reload();
			setIsOpen(false);
		} catch (error) {
			console.error(error);
			toast.error("Ошибка при создании продукта");
		}
	};

	const openDialog = () => setIsOpen(true);
	const closeDialog = () => {
		setIsOpen(false);
		setName("");
		setPrice(0);
		setFile(null);
		setPreview(null);
		setDescription("");
	};

	const isSaveDisabled = !name.trim() || price <= 0;

	return (
		<div>
			<button
				className="flex items-center gap-2 text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-sm sm:text-base transition"
				onClick={openDialog}
			>
				Добавить продукт <FaPlus size={18} />
			</button>

			{isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg pb-4 px-4 sm:pb-6 sm:px-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
						<div className="flex sticky top-0 py-2 z-50 bg-white justify-between items-center">
							<h2 className="text-xl font-semibold text-yellow-500">
								Добавление продукта
							</h2>
							<button
								onClick={closeDialog}
								className="text-gray-500 hover:text-gray-700 px-3"
							>
								<X />
							</button>
						</div>

						<div className="grid gap-4 py-2">
							<div className="flex flex-col gap-2">
								<label
									htmlFor="img"
									className="text-yellow-500"
								>
									Фото
								</label>
								{preview && (
									<div className="relative aspect-square w-full max-w-64 mx-auto">
										<Image
											fill
											src={preview}
											alt={name}
											className="h-full w-full object-cover rounded-lg"
										/>
									</div>
								)}

								<input
									id="img"
									name="img"
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									className="border rounded-lg p-2 w-full"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label
									htmlFor="name"
									className="text-yellow-500"
								>
									Название
								</label>
								<input
									id="name"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="border rounded-lg p-2 w-full"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label
									htmlFor="price"
									className="text-yellow-500"
								>
									Цена
								</label>
								<input
									id="price"
									name="price"
									type="number"
									value={price}
									onChange={(e) =>
										setPrice(Number(e.target.value))
									}
									className="border rounded-lg p-2 w-full"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label
									htmlFor="description"
									className="text-yellow-500"
								>
									Описание
								</label>
								<textarea
									id="description"
									name="description"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									className="border rounded-lg p-2 w-full"
									rows={3}
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
