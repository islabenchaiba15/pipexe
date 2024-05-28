"use client";
import React from "react";
import Card from "../../../../../components/pipe/Card";
import AddressCard from "../../../../../components/well/AddressCard";
import Chart from "../../../../../components/pipe/Chart";
import TableDemo from "../../../../../components/well/Table";
import PressureCard from "../../../../../components/manifold/PressureCard";
import MapComponent from "../../../../../components/MapComponent";
import CreatePipeFormContextProvider from "../../../../../context/CreatePipeFormContextProvider";
import WellContextProvider from "../../../../../context/WellContextProvider";
const cardData = [
  {
    label: "Nom",
    amount: "md255",
    icon: "/fire.svg",
    discription: "drilled 15/12/2002",
  },
];

const address = [
  {
    label: "address",
    wilaya: "ouargla",
    centre: "centre 123",
    region: "Hassi messaoud",
    zone: "E2A",
    icon: "/fire.svg",
  },
];
const RealData = [
  {
    Temperature: "Temperature",
    amount: "30",
    icon: "/fire.svg",
    pressure: "pressure",
    number: "100",
  },
];

function page() {
  const icon = "../manifold.svg";
  return (
    <CreatePipeFormContextProvider>
      <WellContextProvider>
        <div className="flex flex-col gap-5 mx-10 my-4 overflow-x-auto overflow-y-auto no-scrollbar h-screen ">
          <h1 className="text-3xl font-bold text black">Puit details</h1>
          <section className="grid w-full grid-cols-1 gap-4  transition-all sm:grid-cols-2 xl:grid-cols-3 ">
            {cardData.map((d, i) => (
              <Card
                key={i}
                amount={d.amount}
                icon={d.icon}
                discription={d.discription}
                label={d.label}
              />
            ))}
            {address.map((add, index) => (
              <AddressCard
                key={index}
                address={add.label}
                wilaya={add.wilaya}
                zone={add.zone}
                region={add.region}
                centre={add.centre}
                icon={add.icon}
              />
            ))}
            {RealData.map((add, index) => (
              <PressureCard
                key={index}
                Temperature={add.Temperature}
                amount={add.amount}
                pressure={add.pressure}
                number={add.number}
                icon={add.icon}
              />
            ))}
          </section>
          <section className="flex flex-col lg:flex-row lg:items-center gap-4 transition-all ">
            <div className="lg:w-1/2 w-full gap-3 rounded-xl border p-5 shadow">
              <p className="p-4 font-semibold">Overview</p>
              <Chart />
            </div>
            <div className="lg:w-1/2 w-full h-[400px] lg:h-full gap-3 rounded-xl border p-5 shadow ">
              <MapComponent icon={icon} />
            </div>
          </section>
          <div
            className={
              " flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow pb-24"
            }
          >
            <p className="p-4 font-semibold">Overview</p>
            <TableDemo />
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
  );
}

export default page;