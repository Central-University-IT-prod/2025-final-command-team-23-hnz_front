"use client";

import { emptyImage, SERVER_URL } from "@/config";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { fetchCompanyItems } from "../company/item/services/getItems";
import { useRouter } from "next/navigation";
import { colors } from "./colors";
import LoadPage from "../loadpage/loadPage";
import { unsubscribeLoyalty } from "./services/loyalActions";
import { getTgUser } from "./services/getClient";

const LoyalInfo = ({ loyalId }: { loyalId: string }) => {
	const [loyaltyProgram, setLoyaltyProgram]: any = useState(null);
	const [companyItems, setCompanyItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const bgColor = colors[Math.floor(Math.random() * colors.length)];

	useEffect(() => {
		const fetchLoyaltyInfo = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(
					`${SERVER_URL}/client/loyalty/${loyalId}/`
				);
				const data = await response.json();
				const companyItems = await fetchCompanyItems(data.company_id);

				setLoyaltyProgram(data);
				setCompanyItems(companyItems);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchLoyaltyInfo();
	}, [loyalId]);

	if (isLoading) return <LoadPage />;

	const unsubscribe = async () => {
		const user = await getTgUser();
		await unsubscribeLoyalty(user!.id, loyaltyProgram?.company_id);
		window.location.href = "/client/loyal/my";
	};

	return (
		<div className="pb-20">
			<div className={`p-4 text-white relative ${bgColor}`}>
				<button
					onClick={() => router.back()}
					className="absolute top-4 left-4 text-white"
				>
					<FaArrowLeft size={20} />
				</button>

				<div className="flex flex-col items-center pt-8 pb-4">
					<h1 className="text-xl font-bold text-center">
						{loyaltyProgram?.company_name}
					</h1>

					<div className="space-y-4">
						<div className="mt-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
							<p className="text-sm">Ваши баллы:</p>
							<p className="text-2xl font-bold text-center">
								{loyaltyProgram?.points}
							</p>
						</div>
						<button
							onClick={unsubscribe}
							className="px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300"
						>
							Отписаться
						</button>
					</div>
				</div>
			</div>

			<div className="p-4">
				<h2 className="text-lg font-bold mb-2">О компании</h2>
				<p className="text-gray-700">
					{loyaltyProgram?.description || "Описания пока нет..."}
				</p>
			</div>

			<div className="p-4">
				<h2 className="text-lg font-bold mb-4">Товары</h2>

				{companyItems?.length === 0 ? (
					<p className="text-gray-500 text-center py-4">
						Нет доступных товаров
					</p>
				) : (
					<div className="grid grid-cols-1 gap-4">
						{companyItems?.map((item: any) => (
							<div
								key={item.id}
								className="bg-white rounded-lg shadow"
							>
								<div className="p-4 flex justify-between">
									<div className="">
										<h3 className="font-bold">
											{item.name}
										</h3>
										<p className="text-gray-600 text-sm mt-2">
											{item.description}
										</p>
										<div className="mt-3 flex justify-between items-center">
											<div>
												<p className="text-gray-500 text-sm">
													{item.price} ₽
												</p>
											</div>
										</div>
									</div>
									<div className="w-24 aspect-square">
										<img
											src={item.image || emptyImage}
											alt={item.name}
											className="h-full object-cover"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default LoyalInfo;
