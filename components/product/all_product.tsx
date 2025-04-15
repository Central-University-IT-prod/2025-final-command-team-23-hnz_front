"use client"
import { useEffect, useState } from "react"
import CardProduct from "./CardProduct"

export default function AllProduct() {
    const [product, setProduct]: any[] = useState([])
    const getProduct = async () => {
        try {
            const res = await fetch(`https://prod-team-23-j7mhbm13.REDACTED/api/company/${localStorage.getItem("company_id")}/item/`,{
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            setProduct(data.results)
        } catch (e) {
            localStorage.removeItem("order")
            localStorage.removeItem("company_id")
            localStorage.removeItem("token")
            localStorage.removeItem("cashier_id")
        }
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <div className="grid xl:grod-cols-3 lg:grid-cols-2 grid-cols-1 2xl:grid-cols-4 gap-2">
            {product ? product.map((item: any, index: any) => (
                <CardProduct data={item} key={index} />
            )):(
                <span className="italic text-zinc-700">Ничего...</span>
            )}
        </div>
    )
}