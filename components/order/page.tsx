"use client"
import AllOrder from "./allOrder"
import CreateOrder from "./create_order"

export default function OrderDashboard() {

    return (
        <div className="flex lg:flex-row flex-col gap-4">
            <AllOrder />
            <CreateOrder/>
        </div>
    )
}