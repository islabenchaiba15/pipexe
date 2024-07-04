/** @format */

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import Image from "next/image";

export default function PressureCard({
  Temperature,
  amount,
  icon,
  pressure,
  number,
}) {
  return (
    <div
      className={
        " flex flex-row-reverse w-full justify-between gap-3 rounded-xl border p-5 shadow"
      }
    >
      <section className="flex justify-between gap-2">
        {/* label */}
        {/* icon */}
        <Image src={icon} alt="yy" width={85} height={85} />
      </section>
      <section className="flex flex-col gap-2">
        <p className="text-md text-gray-500 font-bold">{Temperature}</p>
        <h2 className="text-lg font-semibold">{amount}°</h2>
        <p className="text-md text-gray-500 font-bold">{pressure} </p>
        <p className="text-lg font-semibold">{number} Bar</p>
      </section>
    </div>
  );
}
