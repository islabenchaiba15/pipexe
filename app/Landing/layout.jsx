import Nav from "@/components/Nav";
import "../globals.css";
import { Inter } from "next/font/google";
import * as React from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <div className="mx-auto max-w-[10440px] hide-scrollbar overflow-x-hidden bg-black h-full">
        {children}
     </div>
  );
}
