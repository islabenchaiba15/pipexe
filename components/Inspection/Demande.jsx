'use client'
import React, { useState } from 'react'
import DashboardCard from '../../components/Dashboard/DahboardCard';
import Chart from '../../components/pipe/Chart';
import TableDemo from '../../components/Dashboard/Table';
import InspectionCard from './InspectionCard';
import TableInspection from './TableInspection';
import { CreateInspection } from './CreateInspection';
const DemandeInspection=()=> {
  const cardData = [
    {
      label: "decision",
      amount: "376",
      icon:"/fire.svg",
      unit: "unitées",
    },
    {
      label: "demander",
      amount: "97",
      icon:"/fire.svg",
      unit: "unitées",
    },
    {
      label: "inspection",
      amount: "113",
      icon:"/fire.svg",
      unit: "unitées",
    },
    {
      label: "construction",
      amount: "176",
      icon:"/fire.svg",
      unit: "unitées",
    },
    {
      label: "terminé",
      amount: "176",
      icon:"/fire.svg",
      unit: "unitées",
    }
  ];
  return (
        <div className='flex flex-col gap-5'>
            <section className="grid w-full grid-cols-1 gap-4  transition-all sm:grid-cols-2 xl:grid-cols-5 ">
              {cardData.map((d, i) => (
                <InspectionCard
                  key={i}
                  amount={d.amount}
                  icon={d.icon}
                  label={d.label}
                />
              ))}
            </section>
            <div className={" flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow pb-24 bg-white"}>
              <p className="p-4 font-semibold">Overview</p>
              <TableInspection/>
            </div>
    </div>
  )
}

export default DemandeInspection