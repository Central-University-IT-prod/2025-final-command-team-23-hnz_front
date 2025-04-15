import { SERVER_URL } from "@/config";
import toast from "react-hot-toast";

export const subscribeLoyalty = async (userId: number, companyId: string) => {
	try {
		const res = await fetch(
			`${SERVER_URL}/client/${userId}/company/${companyId}/subscribe/`,
			{
				method: "POST",
			}
		);

		if (!res.ok) throw new Error("Ошибка при попытке подписки");

		toast.success("Успешная подписка!");
	} catch (error) {
		console.error(error);
	}
};

export const unsubscribeLoyalty = async (userId: number, companyId: string) => {
	try {
		const res = await fetch(
			`${SERVER_URL}/client/${userId}/company/${companyId}/unsubscribe/`,
			{
				method: "DELETE",
			}
		);

		if (!res.ok) throw new Error("Ошибка при попытке отписки");

		toast.success("Вы успешно отписались");
	} catch (error) {
		console.error(error);
		toast.error("Не удалось отписаться");
	}
};
