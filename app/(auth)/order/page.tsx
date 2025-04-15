import OrderDashboard from "@/components/order/page";

export default function Order() {
    return (
        <div className="flex flex-col gap-y-4">
            <span className="text-3xl text-zinc-800 font-medium">Создание заказа</span>
            <OrderDashboard />
        </div>
    )
}