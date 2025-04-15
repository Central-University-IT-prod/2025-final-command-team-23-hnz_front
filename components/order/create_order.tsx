"use client"
import { useEffect, useState } from "react"
import CreatePayment from "./create_payment"
import { Scanner } from "@yudiel/react-qr-scanner"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface Item {
    id: string;
    company_id: string;
    name: string;
    price: string;
    status: string;
    description: string;
    cnt: number;
}

interface OrderItem {
    item_id: string;
    quantity: number;
    sell_price: number;
}

function transformItemsToOrderItems(items: Item[]): OrderItem[] {
    return items.map(item => ({
        item_id: item.id,
        quantity: item.cnt,
        sell_price: parseFloat(item.price),
    }));
}

export default function CreateOrder() {
    const [code, setCode] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [summ_to_payment, setSummToPayment] = useState(0)
    const [summ_with_sale, setSummWithSale] = useState(0)
    const [after_sale_balance, setSaleBalance] = useState(0)
    const [client_balance, setClientBalance] = useState(0)
    const [selectType, setSelectType] = useState(0)
    const [CanSpend, setCanSpend] = useState(0)

    useEffect(() => {
        const orderData = localStorage.getItem("order")
        const data_order = JSON.parse(orderData || "[]");

        const calculateTotalPrice = (items: typeof data_order): number => {
            return items.reduce((total: number, item: { price: string; cnt: number }) => {
                const itemPrice = parseFloat(item.price) * item.cnt;
                return total + itemPrice;
            }, 0);
        };

        const totalPrice = calculateTotalPrice(data_order);
        setSummToPayment(totalPrice)
    }, [])
    const send_back_payment = async (code_photo: string) => {
        const res = await fetch(`https://prod-team-23-j7mhbm13.REDACTED/api/cashier/pre-sale/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: JSON.parse(localStorage.getItem("order") || "[]"),
                client_id: Number(code_photo),
                total_price: summ_to_payment
            })
        })
        const data = await res.json()
        setSaleBalance(data.points_earn)
        setClientBalance(data.client_balance)
        setCanSpend(data.points_used)
        setSummWithSale(data.price_with_sale)
    }

    const sell = async () => {
        let price = 0
        let points_used = 0
        if (selectType === 0) price = summ_to_payment, points_used = 0
        else price = summ_with_sale, points_used = CanSpend

        if (code === "") {
            const res = await fetch(`https://prod-team-23-j7mhbm13.REDACTED/api/cashier/pre-sale/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: JSON.parse(localStorage.getItem("order") || "[]"),
                    client_id: null,
                    total_price: summ_to_payment
                })
            })
            const data = await res.json()
            setSaleBalance(data.points_earn)
            setClientBalance(data.client_balance)
            setCanSpend(data.points_used)
            setSummWithSale(data.price_with_sale)


        }
        const res = await fetch(`https://prod-team-23-j7mhbm13.REDACTED/api/cashier/sell/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: transformItemsToOrderItems(JSON.parse(localStorage.getItem("order") || "[]")),
                client_id: Number(code || null),
                total_price: summ_to_payment,
                total_price_with_sale: price,
                points_used: points_used
            })
        })
        localStorage.removeItem("order")
    }
    const EndWork = async () => {
        localStorage.setItem("order", "")
        location.replace("/product")
    }
    return (
        <>
            <div className="lg:w-1/3 w-full flex flex-col gap-y-4 bg-white shadow-sm border border-slate-300 rounded-lg p-4">
                <div className="flex flex-col gap-y-2">
                    <span className="text-xl font-medium">Покупка товаров</span>
                    <div className="flex flex-col gap-y-0.5">
                        {code.length > 0 ? (
                            <div className="flex flex-col gap-y-4">
                                <div className="flex flex-col">
                                    <span>Номер карты: {code}</span>
                                    <span>Количество баллов: {client_balance}</span>
                                    {selectType === 0 ? (
                                        <span>Начислено будет баллов: {after_sale_balance}</span>
                                    ) : (
                                        <span>Будет потрачено баллов: {CanSpend}</span>
                                    )}
                                </div>
                                <div className="flex bg-zinc-300 rounded-md p-1 gap-x-2 px-2 py-1">
                                    <button onClick={() => setSelectType(0)} className={`w-full text-sm ${selectType === 0 ? ("bg-white") : null} rounded-md py-1 transition`}>Копить</button>
                                    <button onClick={() => setSelectType(1)} className={`w-full text-sm ${selectType === 1 ? ("bg-white") : null} rounded-md py-1 transition`}>Потратить  все</button>

                                </div>
                            </div>
                        ) : (
                            <>
                                <span>Для получение баллов, необходимо предоставить qr-code</span>
                                <DialogRoot size="lg" open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
                                    <DialogTrigger asChild>
                                        <button className="bg-yellow-400 text-sm w-full py-2 text-zinc-700 rounded-md hover:bg-yellow-500 transition" onClick={() => { setIsOpen(true) }}>Добавить карту</button>

                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Добавление лояльности</DialogTitle>
                                        </DialogHeader>
                                        <DialogBody>
                                            <Scanner onScan={(result) => { setCode(result[0].rawValue); setIsOpen(false); send_back_payment(result[0].rawValue) }} />
                                        </DialogBody>
                                    </DialogContent>
                                </DialogRoot >
                            </>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-y-2 mt-6">
                    <div className="flex justify-between w-full">
                        <span>К оплате</span>
                        <span className="text-lg font-bold">{selectType === 0 ? summ_to_payment : summ_with_sale} ₽</span>
                    </div>
                    {summ_to_payment === 0 ? (
                        <span>Добавьте товары в корзину</span>
                    ) : (
                        <>
                            <span className="text-sm font-medium">Выберите оплату</span>
                            <div className="flex gap-x-2">
                                <CreatePayment selectType={selectType} summ_to_payment={summ_to_payment} summ_with_sale={summ_with_sale} CanSpend={CanSpend} code={code} />
                                <DialogRoot size="lg">
                                    <DialogTrigger asChild>
                                    <button onClick={() => sell()} className="bg-indigo-400 text-sm w-full py-2 text-zinc-700 rounded-md hover:bg-indigo-500 transition">Оплачено наличкой</button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Онлайн оплата</DialogTitle>
                                        </DialogHeader>
                                        <DialogBody>

                                            <div className="flex flex-col gap-y-4 w-full items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6em" height="6em" viewBox="0 0 1024 1024" className="fill-white">
                                                    <path className="fill-emerald-400" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path>
                                                </svg>
                                                <span className="text-lg font-medium text-zinc-800">Покупка оплачена, Удачного дня!</span>
                                                <button className="bg-indigo-400 px-4 py-1 text-sm text-white hover:bg-indigo-500 rounded-md transition" onClick={() => EndWork()}>Продолжить работу</button>
                                            </div>
                                        </DialogBody>
                                    </DialogContent>
                                </DialogRoot>
                            </div>
                        </>
                    )}
                </div>
            </div >
        </>

    )
}