import { createHash } from "crypto";
import { NextResponse } from "next/server";
const axios = require("axios");

export async function POST(req: Request) {
    const { paymentId } = await req.json()
    const token = atob(process.env.PAYMENT_PASSWORD || "") + paymentId + process.env.PAYMENT_LOGIN
    const tokenSha256 = createHash('sha256')
        .update(new TextEncoder().encode(token))
        .digest('hex');
    const create_payment_tin = await axios.post(`https://securepay.tinkoff.ru/v2/GetState`,
        {
            "TerminalKey": process.env.PAYMENT_LOGIN,
            "PaymentId": parseInt(paymentId, 10),
            "Token": tokenSha256,
        }
    );
    const status = create_payment_tin.data.Status
    return NextResponse.json({ status: status })
}