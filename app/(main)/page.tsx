export default function Home() {
    return (
        <div className="h-full relative flex w-full mx-auto">
            <div className="w-full h-screen bg-[url('/lines.svg')] bg-center absolute bg-no-repeat bg-cover opacity-90 z-0"></div>
            <div className="flex w-11/12 lg:w-11/12 2xl:w-10/12 mx-auto items-center justify-center h-screen">
                <div className="flex flex-col gap-y-8 z-20 items-center text-center">
                    <span className="text-slate-800 font-bold lg:text-5xl text-[40px] xl:text-7xl 2xl:text-[106px] max-w-7xl leading-none">Место удовольствия кассира</span>
                    <span className="lg:text-base text-sm text-slate-500 font-medium max-w-4xl">Место удовольствия кассира — это концепция рабочего пространства, где кассир может выбирать товары и формировать чеки для покупателей. В таком месте предусмотрено современное оборудование, включая эквайринг для безналичной оплаты, что делает процесс обслуживания быстрым и удобным. Это пространство направлено на создание комфортных условий для работы кассира, упрощение операций и повышение качества обслуживания клиентов.</span>
                    <div className="flex gap-x-4 items-center">
                        <a href="/login" className="rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
                            <div className="hover:bg-gray-700 transition bg-gray-800 rounded-full px-8 py-2 text-sm lg:text-base text-slate-50 font-medium">Войти в аккаунт</div>
                        </a>
                        <a href="/product" className="hover:bg-zinc-300 transition rounded-md h-fit px-4 py-2 text-sm lg:text-lg text-zinc-700 font-medium">В товары</a>
                    </div>
                </div>
            </div>
        </div>
    )
}