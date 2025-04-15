"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { SERVER_URL } from "@/config";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	useEffect(() => {
		const companyToken = localStorage.getItem("company-token");
		if (companyToken) {
			window.location.href = "/company/catalog";
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch(`${SERVER_URL}/company/login/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					password,
				}),
			});

			if (!res.ok) {
				throw new Error("Ошибка при входе");
			}

			const data = await res.json();

			if (data.token) {
				localStorage.setItem("company-token", data.token);
				localStorage.setItem("company-id", data.company_id);
				router.push("/company/catalog");
				toast.success("Успешный вход");
			} else {
				throw new Error("Токен не получен");
			}
		} catch (error) {
			toast.error("Ошибка при входе. Проверьте данные.");
			console.error(error);
		}
	};

	return (
		<div className="2xl:px-20 lg:px-14 lg:py-20 p-8 flex h-screen w-full flex-col justify-between max-w-3xl mx-auto">
			<div className="flex justify-between items-center flex-wrap gap-4">
				<a href="/company">
					<Image
						src="/logo.svg"
						width={128}
						height={0}
						className="w-32 h-auto"
						alt=""
					/>
				</a>
				<Link
					href="/company/auth/register"
					className="flex gap-x-2 bg-white border border-slate-300 px-4 py-2 rounded-md items-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						fill="none"
					>
						<path
							d="M11 21H4C4 17.4735 6.60771 14.5561 10 14.0709M19.8726 15.2038C19.8044 15.2079 19.7357 15.21 19.6667 15.21C18.6422 15.21 17.7077 14.7524 17 14C16.2923 14.7524 15.3578 15.2099 14.3333 15.2099C14.2643 15.2099 14.1956 15.2078 14.1274 15.2037C14.0442 15.5853 14 15.9855 14 16.3979C14 18.6121 15.2748 20.4725 17 21C18.7252 20.4725 20 18.6121 20 16.3979C20 15.9855 19.9558 15.5853 19.8726 15.2038ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
							stroke="#000000"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<p className="font-medium text-zinc-800 text-sm">
						Зарегистрироваться
					</p>
				</Link>
			</div>
			<form onSubmit={handleSubmit} className="flex flex-col gap-y-16">
				<div className="flex flex-col gap-y-4">
					<div className="flex flex-col gap-y-0.5">
						<label
							htmlFor="username"
							className="text-sm text-zinc-600"
						>
							Имя пользователя
						</label>
						<input
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							type="text"
							className="hover:outline-slate-400 hover:dark:outline-zinc-700 outline-none outline-1 focus:border-indigo-600 focus:dark:border-indigo-600 bg-white text-base rounded-xl border-2 text-left border-slate-300 p-2 w-full transition-all"
							required
						/>
					</div>
					<div className="flex flex-col gap-y-0.5">
						<label
							htmlFor="password"
							className="text-sm text-zinc-600"
						>
							Пароль
						</label>
						<input
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							className="hover:outline-slate-400 hover:dark:outline-zinc-700 outline-none outline-1 focus:border-indigo-600 focus:dark:border-indigo-600 bg-white text-base rounded-xl border-2 text-left border-slate-300 p-2 w-full transition-all"
							required
						/>
					</div>
				</div>
				<button
					type="submit"
					disabled={!username || !password}
					className={`bg-yellow-500 ${
						!username || !password
							? "opacity-50 cursor-not-allowed"
							: "hover:bg-yellow-600"
					} rounded-md text-base text-white font-medium py-2 transition-all`}
				>
					Зайти на аккаунт
				</button>
			</form>
			<span className="font-medium text-zinc-800">
				© 2025 Loyal LLP All rights reserved
			</span>
		</div>
	);
}
