"use client";

import { useEffect, useState } from "react";
import { CashierList } from "@/components/company/cashier-management/CashierList";
import { SERVER_URL } from "@/config";
import toast from "react-hot-toast";
import { CashierForm } from "@/components/company/cashier-management/CashierForm";
import LoadPage from "@/components/loadpage/loadPage";

export default function ManagePage() {
	const [cashiers, setCashiers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchCashiers = async () => {
		try {
			const token = localStorage.getItem("company-token");
			const id = localStorage.getItem("company-id");
			const response = await fetch(
				`${SERVER_URL}/company/${id}/cashier/`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Ошибка при загрузке кассиров");
			}

			const data = await response.json();
			setCashiers(data.results);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCashiers();
	}, []);

	if (isLoading) {
		return <LoadPage />;
	}

	return (
		<div className="space-y-2 max-w-[400px] mx-auto">
			<CashierForm />
			<CashierList cashiers={cashiers} />
		</div>
	);
}
