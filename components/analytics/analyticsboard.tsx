"use client"
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { DateRangePicker } from "@heroui/react";
import { CalendarDate, DateValue } from "@internationalized/date";
import ChartDaily from "./chart";
import ChartDay from "./chart2";
import ChartUser from "./chart3";
import ChartUsersTwo from "./chartuser";

const getCalendarDate = (date: Date) =>
    new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());


export default function AnalyticsBoard() {
    const now = getCalendarDate(new Date());
    const sevenDaysAgo = getCalendarDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

    const [date, setDate] = useState<any>({
        start: sevenDaysAgo,
        end: now,
    });

    const [data, setData] = useState([]);
    const [dataDay, setDataDay] = useState([]);

    const fetchData = async (startDate: DateValue, endDate: DateValue) => {
        const token = localStorage.getItem("company-token");
        const res = await fetch('https://prod-team-23-j7mhbm13.REDACTED/api/company/stats/money/daily/', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from_date: `${startDate.year}-${(startDate.month).toString().padStart(2, '0')}-${(startDate.day).toString().padStart(2, '0')}`,
                to_date: `${endDate.year}-${(endDate.month).toString().padStart(2, '0')}-${(endDate.day).toString().padStart(2, '0')}`
            })
        });
        const data = await res.json();
        setData(data);
    };
    const formatDate = (date: Date) => {
        if (!(date instanceof Date)) {
            return "N/A";
        }
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const fetchDataDay = async () => {
        const token = localStorage.getItem("company-token");
        const res = await fetch('https://prod-team-23-j7mhbm13.REDACTED/api/company/stats/money/', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: formatDate(new Date())
            })
        });
        const data = await res.json();
        setDataDay(data);
    };
    const [dataCashier, setDataCashier]: any[] = useState([])
    const fetchCashier = async (startDate: DateValue, endDate: DateValue) => {
        const token = localStorage.getItem("company-token");
        const res = await fetch('https://prod-team-23-j7mhbm13.REDACTED/api/company/stats/money/cashier/daily/', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from_date: `${startDate.year}-${(startDate.month).toString().padStart(2, '0')}-${(startDate.day).toString().padStart(2, '0')}`,
                to_date: `${endDate.year}-${(endDate.month).toString().padStart(2, '0')}-${(endDate.day).toString().padStart(2, '0')}`
            })
        });
        const data = await res.json();
        setDataCashier(data);
    };

    const [dataUser, setDataUser]: any[] = useState([])
    const fetchUser = async (startDate: DateValue, endDate: DateValue) => {
        const token = localStorage.getItem("company-token");
        const res = await fetch('https://prod-team-23-j7mhbm13.REDACTED/api/client/stats/amount/', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from_date: `${startDate.year}-${(startDate.month).toString().padStart(2, '0')}-${(startDate.day).toString().padStart(2, '0')}`,
                to_date: `${endDate.year}-${(endDate.month).toString().padStart(2, '0')}-${(endDate.day).toString().padStart(2, '0')}`
            })
        });
        const data = await res.json();
        setDataUser(data[0]);
    }

    useEffect(() => {
        fetchDataDay();
    }, []);

    useEffect(() => {
        if (date && date.start && date.end) {
            fetchData(date.start, date.end);
            fetchCashier(date.start, date.end)
            fetchUser(date.start, date.end)
        }
    }, [date]);

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex justify-between w-full">
                <span className="text-3xl text-zinc-800 font-bold">Аналитика</span>
                <DateRangePicker
                    visibleMonths={2}
                    className="border border-slate-300 rounded-md w-fit"
                    value={date}
                    onChange={setDate}
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex bg-white rounded-xl w-full p-4 border border-slate-300 flex-col gap-y-4 shadow-sm">
                    <span className="text-zinc-800 font-medium text-xl">Статистика по пользователям за промежуток времени</span>
                    <div className="flex lg:flex-row flex-col gap-4">
                        <div className="lg:w-1/4 w-full flex flex-col gap-8">
                            <div className="flex flex-col">
                                <span className="text-lg font-medium text-zinc-800">{dataUser.all_transactions_count}</span>
                                <span className="text-sm text-zinc-600">Всего пользователей</span>
                            </div>
                            <div className="flex gap-x-2">
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium text-zinc-800">{dataUser.all_loyal}</span>
                                    <span className="text-sm text-zinc-600">Пользователи с лояльностью</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium text-zinc-800">{dataUser.all_no_loyal}</span>
                                    <span className="text-sm text-zinc-600">Пользователи без лояльности</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <ChartUsersTwo data={dataUser.result}/>
                        </div>
                    </div>
                </div>
                <div className="flex lg:flex-row flex-col gap-2">
                    <div className="bg-white rounded-xl w-full lg:w-2/3 p-4 border border-slate-300 flex flex-col gap-y-4 shadow-sm">
                        <span className="text-zinc-800 font-medium text-xl">Статистика за все дни</span>
                        <ChartDaily data={data} />
                    </div>
                    <div className="bg-white rounded-xl w-full lg:w-1/3 p-4 border border-slate-300 flex flex-col gap-y-4 shadow-sm">
                        <span className="text-zinc-800 font-medium text-xl">Статистика за день</span>
                        <ChartDay data={dataDay} />
                    </div>
                </div>
                <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2">
                    {dataCashier.map((item: { cashier_name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; result: any; }, index: Key | null | undefined) => (
                        <div className="bg-white rounded-xl w-full p-4 border border-slate-300 flex flex-col gap-y-4 shadow-sm" key={index}>
                            <span className="text-zinc-800 font-medium text-xl">Статистика {item.cashier_name}</span>
                            <ChartUser data={item.result} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
