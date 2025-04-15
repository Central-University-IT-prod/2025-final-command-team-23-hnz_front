export async function getTgUser() {
	if (typeof window === "undefined") {
		return;
	}

	await new Promise<void>((resolve) => {
		const checkTelegram = () => {
			if (window.Telegram && window.Telegram.WebApp) {
				resolve();
			} else {
				setTimeout(checkTelegram, 100);
			}
		};
		checkTelegram();
	});

	const tg = window.Telegram.WebApp;

	if (!tg.initDataUnsafe?.user) {
		console.error("Данные пользователя недоступны.");
		return;
	}

	const user = tg.initDataUnsafe.user;

	return {
		id: user.id,
		username: user.username,
		firstname: user.first_name,
	};
}
