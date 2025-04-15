"use client";

import { useEffect, useState } from "react";
import { LoyalCard } from "@/components/client/LoyalCard";

import { fetchLoayals } from "@/components/client/services/getLoyals";
import { getTgUser } from "@/components/client/services/getClient";

export default function MyLoyalPage() {
	const [loyals, setLoyals] = useState([]);

	useEffect(() => {
		const getMyLoyals = async () => {
			try {
				const user = await getTgUser();
				const data = await fetchLoayals(user!.id);
				const myLoayls = data.filter(
					(item: any) => item.loyalty.is_subscribed
				);

				setLoyals(myLoayls);
			} catch (error) {
				console.error(error);
			}
		};

		getMyLoyals();
	}, []);

	return (
		<>
			<div className="text-3xl p-4 sticky top-0 z-10 bg-[#f6f7f8]">
				Мои лояльности
			</div>
			<div className="pb-16 px-4">
				<div className="space-y-4">
					{loyals?.length === 0 ? (
						<div>Лояльности не найдены</div>
					) : (
						loyals?.map((i: any) => (
							<LoyalCard key={i.company.id} loyal={i} />
						))
					)}
				</div>
			</div>
		</>
	);
}
