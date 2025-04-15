import { SERVER_URL } from "@/config";
import toast from "react-hot-toast";

export const fetchLoayals = async (userId: number) => {
	try {
		const response = await fetch(`${SERVER_URL}/client/${userId}/company`);
		if (!response.ok) {
			toast.error("Ошибка получения компаний");
			return;
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
