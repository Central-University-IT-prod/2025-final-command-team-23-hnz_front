import { ICompanyItem } from "../types";
import { CompanyItem } from "./CompanyItem";

export const ItemsGrid = ({ items }: { items: ICompanyItem[] }) => {
	return (
		<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pb-10">
			{items?.map((item) => (
				<CompanyItem key={item.id} item={item} />
			))}
		</div>
	);
};
