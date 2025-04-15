import Link from "next/link";

export default function Home() {
	return (
		<div className="h-full relative flex w-full mx-auto">
			<div className="w-full h-screen bg-[url('/lines.svg')] bg-center absolute bg-no-repeat bg-cover opacity-90 z-0"></div>
			<div className="flex w-11/12 lg:w-11/12 2xl:w-10/12 mx-auto items-center justify-center h-screen">
				<div className="flex flex-col gap-y-8 z-20 items-center text-center">
					<span className="text-slate-800 font-bold lg:text-5xl text-[40px] xl:text-7xl 2xl:text-[106px] max-w-7xl leading-none">
						T-LOYAL — Управляйте лояльностью клиентов
					</span>
					<span className="lg:text-base text-sm text-slate-500 font-medium max-w-4xl">
						T-LOYAL — это современное решение для бизнеса, которое
						помогает вам создавать и управлять программами
						лояльности. Мы предлагаем инструменты для повышения
						вовлеченности клиентов, увеличения продаж и укрепления
						их приверженности вашему бренду. С T-LOYAL вы сможете
						легко внедрить бонусные системы, скидки, акции и
						персонализированные предложения, чтобы сделать ваших
						клиентов счастливее, а ваш бизнес — успешнее.
					</span>
					<div className="flex gap-x-4 items-center">
						<Link
							href="/company/auth/login"
							className="rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1"
						>
							<div className="hover:bg-gray-700 transition bg-gray-800 rounded-full px-8 py-2 text-sm lg:text-base text-slate-50 font-medium">
								Войти в аккаунт
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
