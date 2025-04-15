import Link from "next/link";
import { colors } from "./colors";

export const LoyalCard = ({ loyal }: { loyal: any }) => {
	const bgColor = colors[loyal.company.name?.length % colors.length];
	return (
		<Link href={`/client/loyal/${loyal.loyalty_id}`} className="block">
			<div
				className={`loyalty-card rounded-xl p-4 text-white shadow-lg ${bgColor}`}
			>
				<div className="flex items-center mb-3">
					<div>
						<h3 className="font-bold">{loyal.company.name}</h3>
					</div>
				</div>

				<div className="mt-4">
					<div className="flex justify-between items-end">
						<div>
							<p className="text-sm opacity-80">Ваши баллы:</p>
							<p className="text-2xl font-bold">
								{loyal.loyalty.points}
							</p>
						</div>
						<div className="text-right">
							<p className="text-xs opacity-80">Нажмите, чтобы</p>
							<p className="text-sm font-medium">
								посмотреть товары
							</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
