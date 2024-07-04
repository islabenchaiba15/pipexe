/** @format */

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils"
import Image from "next/image";
import dynamic from "next/dynamic";
// ... (other imports)

const Circle = dynamic(() => import("../shared/Circle"), {
  ssr: false,
});
export default function DashboardCard({
    label,
    icon,
    amount,
    unit,
  }) {
  return (
    <div  className={" flex flex-row-reverse w-full justify-between gap-3 rounded-xl border p-5 shadow bg-white"}>
      <div className="flex justify-between w-1/2 gap-2 items-center">
        {/* label */}
        {/* icon */}
        {/* <Circle/> */}
      </div>
      <section className="flex flex-col w-1/2 gap-2">
        <Image src={icon} alt="yy" width={20} height={20} />
        <p className="text-lg font-medium">{label}</p>
        <h2 className="text-3xl font-bold">{amount}</h2>
        <p className="text-lg text-gray-500">{unit}</p>
      </section>
    </div>
  );
}
