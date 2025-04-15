import { useEffect, useState } from "react"

export default function AllOrder() {
    const [data, setData]: any[] = useState([])
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("order") || "[]"))
    }, [])
    return (
        <div className="lg:w-2/3 w-full flex bg-white shadow-sm border border-slate-300 rounded-lg h-fit">
            <table className="w-full">
                <thead className="text-left text-sm whitespace-nowrap text-zinc-800 font-medium">
                    <tr className="">
                        <td className="py-2 px-4">Фото</td>
                        <td className="py-2 px-4">Название</td>

                        <td className="py-2 px-4">Цена</td>
                        <td className="py-2 px-4">Количество</td>
                        <td className="py-2 px-4">Всего</td>
                    </tr>
                </thead>
                <tbody>
                    {data ? data.map((item: any, index: any) => (
                        <tr className="border-t border-slate-300  py-2" key={index}>
                            <td className="py-2 px-4 ">
                                <img src={item.image} alt="" className="max-w-20 max-h-12 w-full h-full" />
                            </td>
                            <td className="py-2 px-4">{item.name}</td>
                            <td className="py-2 px-4">{item.price}</td>
                            <td className="py-2 px-4">{item.cnt}</td>
                            <td className="py-2 px-4">{(Number(item.cnt) * Number(item.price)).toFixed(2)}</td>

                        </tr>
                    )) : null}
                </tbody>

            </table>
        </div>
    )
}