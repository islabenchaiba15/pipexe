"use client";
import React, { useState } from "react";
import DashboardCard from "../../components/Dashboard/DahboardCard";
import Chart from "../../components/pipe/Chart";
import TableDemo from "../../components/Dashboard/Table";
import InspectionCard from "./InspectionCard";
import TableInspection from "./TableInspection";
import { CreateInspection } from "./CreateInspection";
import { Input } from "../ui/input";
import { FromSelect } from "../FromSelect";
const DemandeInspection = ({ stats }) => {
  const cardData = [
    {
      label: "decision",
      amount: "376",
      // icon: "/fire.svg",
      unit: "unitées",
    },
    {
      label: "demander",
      amount: "97",
      // icon: "/fire.svg",
      unit: "unitées",
    },
    {
      label: "inspection",
      amount: "113",
      // icon: "/fire.svg",
      unit: "unitées",
    },
    {
      label: "construction",
      amount: "176",
      // icon: "/fire.svg",
      unit: "unitées",
    },
    {
      label: "terminé",
      amount: "176",
      // icon: "/fire.svg",
      unit: "unitées",
    },
  ];

  const type = [
    {
      value: "periodic",
      label: "periodic",
    },
    {
      value: "non-periodic",
      label: "non-periodic",
    },
  ];

  const transformedCardData = Object.keys(stats).map((key) => {
    return {
      label: key,
      amount: stats[key].toString(), // Convert the amount to a string
      // icon: "/fire.svg",
      unit: "unitées",
    };
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState([]);
  return (
    <div className="flex flex-col gap-5">
      <section className="grid w-full grid-cols-1 gap-4  transition-all sm:grid-cols-2 xl:grid-cols-4 ">
        {transformedCardData.map((d, i) => (
          <InspectionCard
            key={i}
            amount={d.amount}
            icon={"/fire.svg"}
            label={d.label}
            stats={stats}
          />
        ))}
      </section>
      <div
        className={
          " flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow pb-24 bg-white"
        }
      >
        <p className="p-4 font-semibold">Overview</p>
        <div className="flex justify-between items-center gap-1 px-2  rounded-2xl">
          <Input
            type="text"
            placeholder="recherche nom ou prenom"
            className="border-0 focus:border-0 no-focus bg-gray-100 sm:max-w-[280px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FromSelect
            filters={type}
            title="type of inpections"
            selectedValues={selectedType}
            onSelect={setSelectedType}
          />
        </div>
        <TableInspection selectedType={selectedType} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default DemandeInspection;
