"use client";

import { CompanyCard } from "@/components/client/CompanyCard";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { fetchLoayals } from "@/components/client/services/getLoyals";
import { getTgUser } from "@/components/client/services/getClient";

export default function AllLoyals() {
	const [loyals, setLoyals] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getLoyals = async () => {
			try {
				setIsLoading(true);
				const user = await getTgUser();

				const data = await fetchLoayals(user!.id);
				if (data) {
					setLoyals(data);
				} else {
					toast.error("Не удалось загрузить данные о компаниях");
				}
			} catch (error) {
				console.error("Ошибка при загрузке данных:", error);
			} finally {
				setIsLoading(false);
			}
		};

		getLoyals();
	}, []);

	return (
		<>
			<div className="text-3xl px-4 pt-4 pb-2 sticky top-0 z-10 bg-[#f6f7f8]">
				Все компании
			</div>
			<div className="px-4  pb-4 text-sm">
				Для просмотра информации о копмании - сначала подпишитесь на нее
			</div>
			{isLoading ? (
				""
			) : (
				<div className="pb-20 px-4">
					<div>
						<div className="space-y-4">
							{loyals.length === 0 ? (
								<p className="text-gray-500 text-center py-4">
									Нет доступных компаний
								</p>
							) : (
								loyals.map((loyal) => (
									<CompanyCard
										key={loyal.company.id}
										loyal={loyal}
									/>
								))
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
