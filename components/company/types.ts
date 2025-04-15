export interface Company {
	id: string;
	name: string;
	items: ICompanyItem[];
}

export interface ICompanyItem {
	id: string;
	name: string;
	price: number;
	description: string;
	loyalPercent: number;
	image: string;
	status: "active" | "inactive";
}
