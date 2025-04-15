import "@/app/globals.css";
import { Providers } from "../../providers";
import { CompanyHeader } from "@/components/company/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Компания",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<body>
				<Providers>
					<CompanyHeader />
					<main className="w-11/12 2xl:w-10/12 mx-auto">
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}
