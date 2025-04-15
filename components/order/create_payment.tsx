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
import { QrCode } from "@chakra-ui/react"
import { useEffect, useState } from "react"

function transformItemsToOrderItems(items: any): any {
    return items.map((item: { id: any; cnt: any; price: string; }) => ({
        item_id: item.id,
        quantity: item.cnt,
        sell_price: parseFloat(item.price),
    }));
}


export default function CreatePayment({ selectType, summ_to_payment, summ_with_sale, CanSpend, code }: any) {
    const [qr, setQr] = useState("")
    const [confirm, setConfirm] = useState(false)
    const checkStatus = async (paymentId: any) => {
        return new Promise<void>(async (resolve) => {
            const interval = setInterval(async () => {
                const res = await fetch("/tinek/check_payment", {
                    method: "POST",
                    body: JSON.stringify({
                        paymentId: paymentId,
                    }),
                });
                const data = await res.json();

                if (data.status === "CONFIRMED") {
                    setConfirm(true);
                    clearInterval(interval);
                    resolve();
                }
            }, 3000);
        });
    };

    const create_payment = async () => {
        let price = 0
        if(selectType === 0) price = summ_to_payment
        else price = summ_with_sale
        const res = await fetch("/tinek/create_payment", {
            method: "POST",
            body: JSON.stringify({
                amount: price*100
            }),
        });
        const data = await res.json();
        setQr(data.payment_url);
        await checkStatus(data.paymentId);
        sell()
    };

    const EndWork = async () => {
        localStorage.setItem("order", "")
        location.replace("/product")
    }
    const [isOpen, setIsOpen] = useState(false)

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
    
    return (
        <DialogRoot size="lg">
            <DialogTrigger asChild>
                <button className="bg-yellow-400 text-sm w-full py-2 text-zinc-700 rounded-md hover:bg-yellow-500 transition" onClick={() => { create_payment(); setIsOpen(true) }}>Онлайн</button>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Онлайн оплата</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    {confirm ? (
                        <div className="flex flex-col gap-y-4 w-full items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="6em" height="6em" viewBox="0 0 1024 1024" className="fill-white">
                                <path className="fill-emerald-400" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path>
                            </svg>
                            <span className="text-lg font-medium text-zinc-800">Покупка оплачена, Удачного дня!</span>
                            <button className="bg-indigo-400 px-4 py-1 text-sm text-white hover:bg-indigo-500 rounded-md transition" onClick={() => EndWork()}>Продолжить работу</button>
                        </div>
                    ) : (
                        <QrCode.Root size={"xl"} value={qr} className="w-full">
                            <QrCode.Frame className="w-full flex">
                                <QrCode.Pattern className="w-full flex" />
                            </QrCode.Frame>
                        </QrCode.Root>

                    )}
                </DialogBody>

            </DialogContent>
        </DialogRoot >
    )
}