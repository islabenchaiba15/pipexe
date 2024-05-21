/** @format */

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils"
import Image from "next/image";

export default function Card({
    label,
    icon,
    amount,
    discription,
  }) {
  return (
    <div  className={" flex flex-row-reverse w-full justify-between gap-3 rounded-xl border p-5 shadow"}>
      <section className="flex justify-between gap-2">
        {/* label */}
        {/* icon */}
        <Image src={icon} alt="yy" width={50} height={50} />
      </section>
      <section className="flex flex-col gap-2">
        <p className="text-md">{label}</p>
        <h2 className="text-2xl font-semibold">{amount}</h2>
        <p className="text-lg text-gray-500">{discription}</p>
      </section>
    </div>
  );
}
