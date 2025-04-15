import { useEffect, useState } from "react"

export default function AddOnOrder({ data }: any) {
    const [cnt, setCnt] = useState(0)
    useEffect(() => {
        const order = JSON.parse(localStorage.getItem("order") || "[]");
        const item = order.find((or: any) => data.name === or.name);
        if (item) {
            setCnt(Number(item.cnt));
        }
    }, [data.name]);

    const updateOrder = (newCnt: number) => {
        let order = JSON.parse(localStorage.getItem("order") || "[]");
        const itemIndex = order.findIndex((or: any) => data.name === or.name);
        if (itemIndex !== -1) {
            if (newCnt > 0) {
                order[itemIndex].cnt = newCnt;
            } else {
                order.splice(itemIndex, 1);
            }
        } else if (newCnt > 0) {
            order.push({ ...data, cnt: newCnt });
        }
        localStorage.setItem("order", JSON.stringify(order));
        setCnt(newCnt);
    };
    return (
        <>
            {cnt === 0 ? (
                <button className="bg-yellow-400 px-4 py-2 text-zinc-700 rounded-md hover:bg-yellow-500 transition text-sm" onClick={() => updateOrder(1)}>Добавить в заказ</button>
            ) : (
                <div className="border border-slate-300 p-1 w-full flex justify-between text-zinc-700 rounded-md text-sm items-center">
                    <button className="w-6 h-6 flex justify-center items-center hover:bg-zinc-200 rounded-md transition" onClick={()=>updateOrder(cnt-1)}>-</button>
                    <span>{cnt}</span>
                    <button className="w-6 h-6 flex justify-center items-center hover:bg-zinc-200 rounded-md transition" onClick={()=>updateOrder(cnt+1)}>+</button>
                </div>
            )}
        </>
    )
}