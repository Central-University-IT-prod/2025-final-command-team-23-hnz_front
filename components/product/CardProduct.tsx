import AddOnOrder from "./toOrder";

export default function CardProduct({ data }: any) {
    return (
        <div className="flex flex-col gap-y-2 w-full bg-white p-2 rounded-lg border border-slate-300 shadow-sm justify-between">
            <div className="flex flex-col gap-y-2">
                <div className="bg-zinc-300/80 rounded-lg flex w-full items-center justify-center h-40">
                    <img src={data.image} className="max-w-40 max-h-32" alt="" />
                </div>
                <div className="flex flex-col gap-y-0.5 w-full">
                    <div className="flex justify-between items-center w-full">
                        <span className="text-lg font-medium">{data.name}</span>
                        <span className="text-base">{data.price} ₽</span>
                    </div>
                    <span className="text-sm">{data.description}</span>
                </div>
            </div>
            <AddOnOrder data={data} />
        </div>
    )
}