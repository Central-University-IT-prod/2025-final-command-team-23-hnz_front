const axios = require("axios");
import { createHash } from "crypto";
import { NextResponse } from "next/server";

interface PaymentRequest {
    amount: number;
}

function getRandomOrderId(): string {
    return `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

export async function POST(req: Request) {
    try {
        const { amount }: PaymentRequest = await req.json();

        const orderId = getRandomOrderId();
        const paymentPassword = atob(process.env.PAYMENT_PASSWORD || "");
        const token = `${amount}Оплата товара${orderId}${paymentPassword}${process.env.PAYMENT_LOGIN}`;
        const tokenSha256 = createHash("sha256").update(token).digest("hex");

        const create_payment_tin = await axios.post(
            `https://securepay.tinkoff.ru/v2/Init`,
            {
                TerminalKey: process.env.PAYMENT_LOGIN,
                Amount: amount,
                OrderId: orderId,
                Description: "Оплата товара",
                Token: tokenSha256,
                Receipt: {
                    Email: "gashagashanov@gmail.com",
                    Taxation: "osn",
                    Items: [{
                        Name: "Оплата заказа",
                        Price: amount,
                        Quantity: 1,
                        Amount: amount,
                        Tax: "vat10",
                    }],
                },
            }
        );

        return NextResponse.json({
            payment_url: create_payment_tin.data.PaymentURL,
            paymentId: create_payment_tin.data.PaymentId,
            data: create_payment_tin.data,
        });

    } catch (error: any) {
        console.error(
            "Error creating payment:",
            error.response?.data || error.message
        );
        return NextResponse.json(
            {
                message: "ERROR",
                details: error.response?.data || error.message,
            },
            { status: 500 }
        );
    }
}