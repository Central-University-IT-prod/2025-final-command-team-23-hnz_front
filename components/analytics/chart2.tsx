'use client';
import React, { useEffect, useRef, useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart, Line } from 'recharts';

export default function ChartDay({ data }: any) {
    const myDivRef = useRef(null);
    const [divWidth, setDivWidth] = useState(0);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setDivWidth(entry.contentRect.width);
            }
        });

        if (myDivRef.current) {
            observer.observe(myDivRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [divWidth]);

    const formatDate = (date: Date) => {
        if (!(date instanceof Date)) {
            return "N/A";
        }
        const hour = date.getHours().toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${hour}:00 ${day}.${month}.${year}`;
    };

    const CustomTooltip = ({ active, payload, colors }: any) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0];
            return (
                <div className="dark:bg-zinc-900 bg-white p-4 rounded-md flex flex-col gap-y-1 border border-slate-300 dark:border-zinc-700">
                    <p className='text-gray-900 dark:text-gray-50 text-sm font-medium'>Статистика за {formatDate(new Date(dataPoint.payload.hour))}</p>
                    <div className='flex flex-col gap-y-0'>
                        {payload.map((dataPoint: any, index: number) => (
                            <p key={index} className={`text-sm text-[${dataPoint.stroke}]`} style={{ color: colors[dataPoint.dataKey] }}>{`${dataPoint.name}: ${dataPoint.value}`}</p>
                        ))}
                    </div>
                </div>
            );
        }

        return null;
    };
    const colors = {
        total_price: "#805AD5",
        total_points_earned: "#5AD6CC",
    };

    return (
        <div className="w-full h-fit" ref={myDivRef}>
            <LineChart width={divWidth - 32} height={240} data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: '12px' }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: '12px' }} />
                <Tooltip content={({ active, payload, label }) => <CustomTooltip active={active} payload={payload} colors={colors} />} />
                <Legend />
                <Line type="monotone" dataKey="total_price" stroke="#805AD5" name='Денег заработано'/>
                <Line type="monotone" dataKey="total_points_earned" stroke="#5AD6CC" name="Заработано очков" />
            </LineChart>
        </div>
    );
}