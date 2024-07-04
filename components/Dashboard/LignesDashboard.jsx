"use client";
import React, { useState } from "react";
import DashboardCard from "../../components/Dashboard/DahboardCard";
import Chart from "../../components/pipe/Chart";
import TableDemo from "../../components/pipe/Table";
function page() {
  const cardData = [
    {
      label: "Total pipes",
      amount: "376",
      icon: "/fire.svg",
      unit: "unitées",
    },
    {
      label: "Total collectors",
      amount: "97",
      icon: "/fire.svg",
      unit: "unitées",
    },
    {
      label: "Total collects",
      amount: "113",
      icon: "/fire.svg",
      unit: "unitées",
    },
    {
      label: "nombre de ",
      amount: "176",
      icon: "/fire.svg",
      unit: "unitées",
    },
  ];
  return (
    <div>
      <section className="grid w-full grid-cols-1 gap-4  transition-all sm:grid-cols-2 xl:grid-cols-4 ">
        {cardData.map((d, i) => (
          <DashboardCard
            key={i}
            amount={d.amount}
            icon={d.icon}
            unit={d.unit}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <div
          className={
            " flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow"
          }
        >
          <p className="p-4 font-semibold">Overview</p>
          {/* <Chart/> */}
        </div>
        {/* <div className={" flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow "}>
                  <MapComponent />
                </div> */}
      </section>
      <div
        className={
          " flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow pb-24"
        }
      >
        <p className="p-4 font-semibold">Overview</p>
        <TableDemo />
      </div>
    </div>
  );
}

export default page;
