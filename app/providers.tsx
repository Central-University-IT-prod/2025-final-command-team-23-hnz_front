"use client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ChakraProvider value={defaultSystem}>
			{children}
			<Toaster />
		</ChakraProvider>
	);
}
