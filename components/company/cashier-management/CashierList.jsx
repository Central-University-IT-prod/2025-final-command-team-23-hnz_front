"user client";

import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { SERVER_URL } from "@/config";
export const CashierList = ({ cashiers }) => {
	const handleDeleteCashier = async (cashierId) => {
		try {
			const token = localStorage.getItem("company-token");
			const id = localStorage.getItem("company-id");
			const response = await fetch(
				`${SERVER_URL}/company/${id}/cashier/${cashierId}/`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Ошибка при удалении кассира");
			}

			toast.success("Кассир успешно удален");
			window.location.reload();
		} catch (error) {
			console.error(error);
			toast.error("Не удалось удалить кассира");
		}
	};

	if (cashiers.length === 0) {
		return (
			<div className="bg-white p-6 rounded-lg shadow-md text-center">
				<p className="text-gray-500">Кассиров пока нет</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden mx-4">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Имя пользователя
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Действия
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{cashiers.map(
							(cashier) =>
								cashier.status === "ACTIVE" && (
									<tr
										key={cashier.id}
										className="hover:bg-gray-50"
									>
										<td className="px-6 py-4 whitespace-nowrap align-middle">
											<div className="flex items-center">
												<div className="text-sm font-medium text-gray-900">
													{cashier.username}
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-center align-middle">
											<button
												onClick={() =>
													handleDeleteCashier(
														cashier.id
													)
												}
												className="text-red-600 hover:text-red-900 focus:outline-none"
												aria-label={`Удалить ${cashier.username}`}
											>
												<Trash2 size={18} />
											</button>
										</td>
									</tr>
								)
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
