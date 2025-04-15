import { Minus, Plus } from "lucide-react";
import { subscribeLoyalty, unsubscribeLoyalty } from "./services/loyalActions";
import { getTgUser } from "./services/getClient";

export const CompanyCard = ({ loyal }: { loyal: any }) => {
	const { company, loyalty } = loyal;
	const isMember = loyalty.is_subscribed;

	const unsubscribe = async () => {
		const user = await getTgUser();
		await unsubscribeLoyalty(user!.id, company.id);
		window.location.reload();
	};

	const subscribe = async () => {
		const user = await getTgUser();
		await subscribeLoyalty(user!.id, company.id);
		window.location.reload();
	};

	return (
		<div className="company-card bg-white rounded-lg shadow p-4 relative">
			<div className="flex items-center">
				<div>
					<h3 className="font-bold">{company.name}</h3>
				</div>
			</div>

			<p className="text-gray-600 text-sm mt-3 line-clamp-2">
				{loyal.description}
			</p>

			{isMember === true ? (
				<div className="flex justify-between items-center">
					<div className="text-sm text-indigo-600 font-medium">
						Вы участник программы лояльности
					</div>

					<button
						onClick={unsubscribe}
						className="p-2 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow-md"
					>
						<Minus />
					</button>
				</div>
			) : (
				<div className="flex justify-between items-center">
					<div className="text-sm text-indigo-600 font-medium">
						Присоединится к программе лояльности
					</div>

					<button
						onClick={subscribe}
						className="p-2 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-md shadow-md"
					>
						<Plus />
					</button>
				</div>
			)}
		</div>
	);
};
