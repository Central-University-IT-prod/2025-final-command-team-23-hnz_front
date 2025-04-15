export default function HeaderHome() {
    const clearLocal = async () => {
        localStorage.removeItem("company_id")
        localStorage.removeItem("order")
        localStorage.removeItem("token")
        localStorage.removeItem("cashier_id")
        window.location.reload()
    }
    return (
        <nav className="inset-x-0 top-0 fixed z-50 bg-white border border-slate-300 py-2 shadow-sm">
            <div className="flex justify-between lg:w-11/12 w-11/12 2xl:w-10/12 mx-auto">
                <div className="flex gap-x-12">
                    <a href="/"><img src="/logo.svg" className="h-10" alt="" /></a>
                    <div className="flex flex-row gap-x-6 items-center">
                        <a href="/product" className="px-4 py-1 flex rounded-md hover:bg-slate-200 transition">Товары</a>
                    </div>
                </div>
                <div className="flex gap-x-2">
                    <a href="/order" className="bg-yellow-400 px-4 py-2 text-zinc-700 rounded-md hover:bg-yellow-500 transition">Корзина</a>
                    <button className="px-4 py-2 text-zinc-700 rounded-md hover:bg-zinc-300 transition " onClick={() => clearLocal()}>Выход</button>
                </div>
            </div>
        </nav>
    )
}