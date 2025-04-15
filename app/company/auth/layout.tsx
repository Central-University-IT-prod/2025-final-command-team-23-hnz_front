import "@/app/globals.css";
import { Providers } from "@/app/providers";

export const metadata = {
	title: "Компания | Авторизация",
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
					<main className="grid lg:grid-cols-2 grid-cols-1">
						{children}
						<div className="bg-indigo-100 h-screen lg:flex hidden flex-col relative">
							<div className="absolute w-full h-full items-center justify-center flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16em"
									height="16em"
									className="z-10"
									viewBox="0 0 1024 1024"
									version="1.1"
								>
									<path
										d="M908.8 742.4c0 14.08-11.52 25.6-25.6 25.6H140.8c-14.08 0-25.6-11.52-25.6-25.6V358.4c0-14.08 11.52-25.6 25.6-25.6h742.4c14.08 0 25.6 11.52 25.6 25.6v384z"
										fill="#B8CA43"
									/>
									<path
										d="M883.2 780.8H140.8c-21.76 0-38.4-16.64-38.4-38.4V358.4c0-21.76 16.64-38.4 38.4-38.4h742.4c21.76 0 38.4 16.64 38.4 38.4v384c0 21.76-16.64 38.4-38.4 38.4zM140.8 345.6c-7.68 0-12.8 5.12-12.8 12.8v384c0 7.68 5.12 12.8 12.8 12.8h742.4c7.68 0 12.8-5.12 12.8-12.8V358.4c0-7.68-5.12-12.8-12.8-12.8H140.8z"
										fill="#231C1C"
									/>
									<path
										d="M844.8 652.8V448c-28.16 0-51.2-23.04-51.2-51.2H230.4c0 28.16-23.04 51.2-51.2 51.2v204.8c28.16 0 51.2 23.04 51.2 51.2h563.2c0-28.16 23.04-51.2 51.2-51.2z"
										fill="#B8CA43"
									/>
									<path
										d="M806.4 716.8H217.6v-12.8c0-21.76-16.64-38.4-38.4-38.4h-12.8V435.2h12.8c21.76 0 38.4-16.64 38.4-38.4v-12.8h588.8v12.8c0 21.76 16.64 38.4 38.4 38.4h12.8v230.4h-12.8c-21.76 0-38.4 16.64-38.4 38.4v12.8z m-564.48-25.6h540.16c5.12-25.6 24.32-44.8 49.92-49.92V459.52c-25.6-5.12-44.8-24.32-49.92-49.92H241.92c-5.12 25.6-24.32 44.8-49.92 49.92v181.76c25.6 5.12 44.8 24.32 49.92 49.92z"
										fill="#231C1C"
									/>
									<path
										d="M345.6 550.4a179.2 166.4 90 1 0 332.8 0 179.2 166.4 90 1 0-332.8 0Z"
										fill="#E1E0A6"
									/>
									<path
										d="M512 742.4c-98.56 0-179.2-85.76-179.2-192s80.64-192 179.2-192 179.2 85.76 179.2 192-80.64 192-179.2 192z m0-358.4c-84.48 0-153.6 74.24-153.6 166.4s69.12 166.4 153.6 166.4 153.6-74.24 153.6-166.4-69.12-166.4-153.6-166.4z"
										fill="#231C1C"
									/>
									<path
										d="M499.2 371.2h25.6v358.4h-25.6z"
										fill="#231C1C"
									/>
									<path
										d="M512 691.2c-21.76 0-42.24-8.96-56.32-24.32-12.8-14.08-20.48-33.28-20.48-52.48h25.6c0 12.8 5.12 25.6 14.08 34.56 10.24 10.24 23.04 16.64 37.12 16.64 28.16 0 51.2-23.04 51.2-51.2s-23.04-51.2-51.2-51.2c-42.24 0-76.8-34.56-76.8-76.8s34.56-76.8 76.8-76.8 76.8 34.56 76.8 76.8h-25.6c0-28.16-23.04-51.2-51.2-51.2s-51.2 23.04-51.2 51.2 23.04 51.2 51.2 51.2c42.24 0 76.8 34.56 76.8 76.8s-34.56 76.8-76.8 76.8z"
										fill="#231C1C"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="absolute animate-pulse blur-lg"
									width="16em"
									height="16em"
									viewBox="0 0 1024 1024"
									version="1.1"
								>
									<path
										d="M908.8 742.4c0 14.08-11.52 25.6-25.6 25.6H140.8c-14.08 0-25.6-11.52-25.6-25.6V358.4c0-14.08 11.52-25.6 25.6-25.6h742.4c14.08 0 25.6 11.52 25.6 25.6v384z"
										fill="#B8CA43"
									/>
									<path
										d="M883.2 780.8H140.8c-21.76 0-38.4-16.64-38.4-38.4V358.4c0-21.76 16.64-38.4 38.4-38.4h742.4c21.76 0 38.4 16.64 38.4 38.4v384c0 21.76-16.64 38.4-38.4 38.4zM140.8 345.6c-7.68 0-12.8 5.12-12.8 12.8v384c0 7.68 5.12 12.8 12.8 12.8h742.4c7.68 0 12.8-5.12 12.8-12.8V358.4c0-7.68-5.12-12.8-12.8-12.8H140.8z"
										fill="#231C1C"
									/>
									<path
										d="M844.8 652.8V448c-28.16 0-51.2-23.04-51.2-51.2H230.4c0 28.16-23.04 51.2-51.2 51.2v204.8c28.16 0 51.2 23.04 51.2 51.2h563.2c0-28.16 23.04-51.2 51.2-51.2z"
										fill="#B8CA43"
									/>
									<path
										d="M806.4 716.8H217.6v-12.8c0-21.76-16.64-38.4-38.4-38.4h-12.8V435.2h12.8c21.76 0 38.4-16.64 38.4-38.4v-12.8h588.8v12.8c0 21.76 16.64 38.4 38.4 38.4h12.8v230.4h-12.8c-21.76 0-38.4 16.64-38.4 38.4v12.8z m-564.48-25.6h540.16c5.12-25.6 24.32-44.8 49.92-49.92V459.52c-25.6-5.12-44.8-24.32-49.92-49.92H241.92c-5.12 25.6-24.32 44.8-49.92 49.92v181.76c25.6 5.12 44.8 24.32 49.92 49.92z"
										fill="#231C1C"
									/>
									<path
										d="M345.6 550.4a179.2 166.4 90 1 0 332.8 0 179.2 166.4 90 1 0-332.8 0Z"
										fill="#E1E0A6"
									/>
									<path
										d="M512 742.4c-98.56 0-179.2-85.76-179.2-192s80.64-192 179.2-192 179.2 85.76 179.2 192-80.64 192-179.2 192z m0-358.4c-84.48 0-153.6 74.24-153.6 166.4s69.12 166.4 153.6 166.4 153.6-74.24 153.6-166.4-69.12-166.4-153.6-166.4z"
										fill="#231C1C"
									/>
									<path
										d="M499.2 371.2h25.6v358.4h-25.6z"
										fill="#231C1C"
									/>
									<path
										d="M512 691.2c-21.76 0-42.24-8.96-56.32-24.32-12.8-14.08-20.48-33.28-20.48-52.48h25.6c0 12.8 5.12 25.6 14.08 34.56 10.24 10.24 23.04 16.64 37.12 16.64 28.16 0 51.2-23.04 51.2-51.2s-23.04-51.2-51.2-51.2c-42.24 0-76.8-34.56-76.8-76.8s34.56-76.8 76.8-76.8 76.8 34.56 76.8 76.8h-25.6c0-28.16-23.04-51.2-51.2-51.2s-51.2 23.04-51.2 51.2 23.04 51.2 51.2 51.2c42.24 0 76.8 34.56 76.8 76.8s-34.56 76.8-76.8 76.8z"
										fill="#231C1C"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="absolute animate-pulse blur-2xl"
									width="16em"
									height="16em"
									viewBox="0 0 1024 1024"
									version="1.1"
								>
									<path
										d="M908.8 742.4c0 14.08-11.52 25.6-25.6 25.6H140.8c-14.08 0-25.6-11.52-25.6-25.6V358.4c0-14.08 11.52-25.6 25.6-25.6h742.4c14.08 0 25.6 11.52 25.6 25.6v384z"
										fill="#B8CA43"
									/>
									<path
										d="M883.2 780.8H140.8c-21.76 0-38.4-16.64-38.4-38.4V358.4c0-21.76 16.64-38.4 38.4-38.4h742.4c21.76 0 38.4 16.64 38.4 38.4v384c0 21.76-16.64 38.4-38.4 38.4zM140.8 345.6c-7.68 0-12.8 5.12-12.8 12.8v384c0 7.68 5.12 12.8 12.8 12.8h742.4c7.68 0 12.8-5.12 12.8-12.8V358.4c0-7.68-5.12-12.8-12.8-12.8H140.8z"
										fill="#231C1C"
									/>
									<path
										d="M844.8 652.8V448c-28.16 0-51.2-23.04-51.2-51.2H230.4c0 28.16-23.04 51.2-51.2 51.2v204.8c28.16 0 51.2 23.04 51.2 51.2h563.2c0-28.16 23.04-51.2 51.2-51.2z"
										fill="#B8CA43"
									/>
									<path
										d="M806.4 716.8H217.6v-12.8c0-21.76-16.64-38.4-38.4-38.4h-12.8V435.2h12.8c21.76 0 38.4-16.64 38.4-38.4v-12.8h588.8v12.8c0 21.76 16.64 38.4 38.4 38.4h12.8v230.4h-12.8c-21.76 0-38.4 16.64-38.4 38.4v12.8z m-564.48-25.6h540.16c5.12-25.6 24.32-44.8 49.92-49.92V459.52c-25.6-5.12-44.8-24.32-49.92-49.92H241.92c-5.12 25.6-24.32 44.8-49.92 49.92v181.76c25.6 5.12 44.8 24.32 49.92 49.92z"
										fill="#231C1C"
									/>
									<path
										d="M345.6 550.4a179.2 166.4 90 1 0 332.8 0 179.2 166.4 90 1 0-332.8 0Z"
										fill="#E1E0A6"
									/>
									<path
										d="M512 742.4c-98.56 0-179.2-85.76-179.2-192s80.64-192 179.2-192 179.2 85.76 179.2 192-80.64 192-179.2 192z m0-358.4c-84.48 0-153.6 74.24-153.6 166.4s69.12 166.4 153.6 166.4 153.6-74.24 153.6-166.4-69.12-166.4-153.6-166.4z"
										fill="#231C1C"
									/>
									<path
										d="M499.2 371.2h25.6v358.4h-25.6z"
										fill="#231C1C"
									/>
									<path
										d="M512 691.2c-21.76 0-42.24-8.96-56.32-24.32-12.8-14.08-20.48-33.28-20.48-52.48h25.6c0 12.8 5.12 25.6 14.08 34.56 10.24 10.24 23.04 16.64 37.12 16.64 28.16 0 51.2-23.04 51.2-51.2s-23.04-51.2-51.2-51.2c-42.24 0-76.8-34.56-76.8-76.8s34.56-76.8 76.8-76.8 76.8 34.56 76.8 76.8h-25.6c0-28.16-23.04-51.2-51.2-51.2s-51.2 23.04-51.2 51.2 23.04 51.2 51.2 51.2c42.24 0 76.8 34.56 76.8 76.8s-34.56 76.8-76.8 76.8z"
										fill="#231C1C"
									/>
								</svg>
							</div>
							<div className="flex h-full w-full items-end p-20">
								<div className="flex flex-col w-full gap-4">
									<span className="italic text-2xl font-bold text-indigo-500">
										`Бизнес — это игра, где ты либо
										выигрываешь, либо учишься. Но если ты не
										ведешь счет, то даже не поймешь, в какой
										ты команде.`
									</span>
									<span className="text-right text-lg text-indigo-700">
										- HNZ, создатели T-LOYAL
									</span>
								</div>
							</div>
						</div>
					</main>
				</Providers>
			</body>
		</html>
	);
}
