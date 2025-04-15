import { SERVER_URL } from "@/config";

export const fetchCompanyItems = async (id: string) => {
	try {
		const response = await fetch(
			`${SERVER_URL}/company/${id}/item/?limit=1000&offset=0`
		);
		if (!response.ok) {
			throw new Error("Ошибка при загрузке данных");
		}
		const data = await response.json();
		const dataItems = data.results.map((i: any) => ({
			...i,
			loyalPercent: i.loyal_percent,
			image: i.image,
		}));

		return dataItems;
	} catch (err) {
		console.log(err);
	}
};
