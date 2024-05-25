import { Inter } from "next/font/google";
import "../globals.css";
import * as React from "react";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  
  return (
      <html lang="en">
          <body className={`${inter.className} mx-auto max-w-[24400px] hide-scrollbar overflow-x-hidden overflow-y-hidden` }>
              {children}
              <Toaster />

          </body>
      </html>
  );
}
