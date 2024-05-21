'use client'
import React from 'react'
import Card from '../../../../../components/pipe/Card';
import TableDemo from '../../../../../components/pipe/Table';

import MapComponent from '../../../../../components/MapComponent';
import CreatePipeFormContextProvider from '../../../../../context/CreatePipeFormContextProvider';
import WellContextProvider from '../../../../../context/WellContextProvider';
import Chart from '../../../../../components/pipe/Chart';
const cardData = [
  {
    label: "depart",
    amount: "MD245",
    icon:"/fire.svg",
    discription: "zone 17",
  },
  {
    label: "destination",
    amount: "E2A",
    icon:"/fire.svg",
    discription: "manifold sation",
  },
  {
    label: "longeur",
    amount: "1200",
    icon:"/fire.svg",
    discription: "metre",
  },
  {
    label: "Nature",
    amount: "GAS",
    icon:"/fire.svg",
    discription: "Collecteur",
  }
];

function page() {
  return (
    <CreatePipeFormContextProvider>
      <WellContextProvider>
          <div className="flex flex-col gap-5 mx-10 my-4 overflow-x-auto overflow-y-auto no-scrollbar h-screen ">
            <h1 className='text-3xl font-bold text black'>Dashboard</h1>
            <section className="grid w-full grid-cols-1 gap-4  transition-all sm:grid-cols-2 xl:grid-cols-4 ">
              {cardData.map((d, i) => (
                <Card
                  key={i}
                  amount={d.amount}
                  icon={d.icon}
                  discription={d.discription}
                  label={d.label}
                />
              ))}
            </section>
            <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
               <div className={" flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow"}>
                  <p className="p-4 font-semibold">Overview</p>
                  <Chart/>
                </div>
                <div className={" flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow "}>
                  <MapComponent />
                </div>
            </section>
            <div className={" flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow pb-24"}>
            <p className="p-4 font-semibold">Overview</p>
              <TableDemo/>
            </div>
            {/* <div className={" flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow "}>
              <TableDemo/>
            </div>
            <div className={" flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow "}>
              <TableDemo/>
            </div> */}
          </div>
      </WellContextProvider>
    </CreatePipeFormContextProvider>
  )
}

export default page