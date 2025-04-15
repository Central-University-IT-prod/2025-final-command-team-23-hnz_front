"use client";

import { useEffect, useState } from "react";
import { AddCompanyItem } from "@/components/company/item/AddCompanyItem";
import { ItemsGrid } from "@/components/company/item/ItemsGrid";
import { CompanySettings } from "@/components/company/CompanySettings";
import LoadPage from "@/components/loadpage/loadPage";
import { fetchCompanyItems } from "@/components/company/item/services/getItems";
import toast from "react-hot-toast";

export default function CatalogPage() {
	const [items, setItems] = useState([]);
	const [filterItems, setFilterItems] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isActiveItems, setIsActiveItems] = useState(true);

	useEffect(() => {
		const companyToken = localStorage.getItem("company-token");
		if (!companyToken) {
			window.location.href = "/company/auth/login";
		}
	}, []);

	useEffect(() => {
		const getCatalogItems = async () => {
			try {
				setIsLoading(true);
				const id = localStorage.getItem("company-id");
				const data = await fetchCompanyItems(id!);
				setItems(data);
				filterItemsByStatus(data, isActiveItems);
			} catch (error) {
				toast.error("Ошибка при получении продуктов");
			} finally {
				setIsLoading(false);
			}
		};

		getCatalogItems();
	}, []);

	useEffect(() => {
		filterItemsByStatus(items, isActiveItems);
	}, [isActiveItems, items]);

	const filterItemsByStatus = (items: any[], isActive: boolean) => {
		const filteredItems = items.filter((item: any) =>
			isActive ? item.status === "active" : item.status === "inactive"
		);
		setFilterItems(filteredItems);
	};

	const toggleActive = () => {
		setIsActiveItems((prev) => !prev);
	};

	if (isLoading) {
		return <LoadPage />;
	}

	return (
		<div className="mx-auto px-2 h-full">
			<div className="mb-4 flex gap-2 items-center justify-between flex-wrap">
				<CompanySettings />
				<AddCompanyItem />
			</div>
			<div className="pb-4">
				<label className="relative inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						value=""
						checked={isActiveItems}
						onChange={toggleActive}
						className="sr-only peer"
					/>
					<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
					<span className="ml-3 text-sm font-medium text-gray-900">
						{isActiveItems
							? "Активные товары"
							: "Неактивные товары"}
					</span>
				</label>
			</div>
			<ItemsGrid items={filterItems} />
		</div>
	);
}
