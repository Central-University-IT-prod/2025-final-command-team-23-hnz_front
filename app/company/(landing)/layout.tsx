import "@/app/globals.css";
import { Providers } from "../../providers";

export const metadata = {
	title: "T-LOYAL",
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
					<main className="">{children}</main>
				</Providers>
			</body>
		</html>
	);
}
