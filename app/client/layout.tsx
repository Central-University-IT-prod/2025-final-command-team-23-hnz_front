import "@/app/globals.css";
import { Providers } from "@/app/providers";
import Navbar from "@/components/client/Navbar";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
	title: "Клиент",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang={"ru"}>
			<head>
				<Script src="https://telegram.org/js/telegram-web-app.js" />
			</head>
			<body>
				<Providers>
					<main className="h-[100dvh] max-w-md mx-auto">
						{children}
						<Navbar />
					</main>
				</Providers>
			</body>
		</html>
	);
}
