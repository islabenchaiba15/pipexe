"use client";
import React, { useState, useEffect, useContext } from "react";
import Card from "../../../../../components/pipe/Card";
import AddressCard from "../../../../../components/well/AddressCard";
import TableDemo from "../../../../../components/manifold/Table";
import PressureCard from "../../../../../components/manifold/PressureCard";
import Image from "next/image";
import CreatePipeFormContextProvider from "../../../../../context/CreatePipeFormContextProvider";
import WellContextProvider from "../../../../../context/WellContextProvider";
import { axiosInstance } from "@/Api/Index";
import Chart from "@/components/manifold/Chart";

import WellContext from "@/context/WellContext";
import TempChart from "@/components/manifold/TempChart";
import dynamic from "next/dynamic";
const cardData = [
  {
    label: "Nom",
    amount: "md255",
    icon: "/eye.svg",
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
    icon: "/Assetanes14.svg",
    pressure: "Pressure",
    number: "100",
  },
];

function page({ params }) {
  console.log("paraaaams", params);
  const icon = "../manifold.svg";
  const [manifold, setManifold] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pressure, setPressure] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  useEffect(() => {
    const fetchManifolds = async () => {
      try {
        const response = await axiosInstance.get(`/manifold/${params.id}`);
        setManifold(response.data);
        setLoading(false);
        console.log(loading, "looooooooooooooding");
      } catch (error) {
        console.error("Error fetching manifolds", error);
      }
    };
    fetchManifolds();
  }, []);
  useEffect(() => {
    console.log("opppppppppppppp", pressure);
  }, [pressure]);
  return (
    !loading && (
      <CreatePipeFormContextProvider>
        <WellContextProvider>
          <div className="ml-[10%] w-[80%]">
            <div className="flex flex-col gap-5 mx-10 my-4 overflow-x-auto overflow-y-auto no-scrollbar h-screen ">
              <div className="flex items-center space-x-2">
                <Image
                  src={"/pngarrow.png"}
                  alt={"Add"}
                  height={35}
                  width={35}
                  className="cursor-pointer"
                />
                <h1 className="text-3xl font-bold text-black my-4">
                  Manifold details
                </h1>
              </div>

              <section className="grid w-full grid-cols-1 gap-4  transition-all sm:grid-cols-2 xl:grid-cols-3 ">
                <Card
                  label={"Nom"}
                  icon={"/Assetanes12.svg"}
                  discription={`drilled ${manifold.formattedDate}`}
                  amount={manifold.name}
                />
                <AddressCard
                  address={"Address"}
                  wilaya={manifold.address.wilaya}
                  zone={manifold.address.zone}
                  region={manifold.address.region}
                  centre={manifold.address.centre}
                  icon={"/Assetanes11.svg"}
                />
                {RealData.map((add, index) => (
                  <PressureCard
                    key={index}
                    Temperature={add.Temperature}
                    amount={temperature}
                    pressure={add.pressure}
                    number={pressure}
                    icon={add.icon}
                  />
                ))}
              </section>
              <section className="flex flex-col lg:flex-row lg:items-center gap-4 transition-all ">
                <div className="lg:w-1/2 w-full gap-3 rounded-xl border p-5 shadow">
                  <p className="p-4 font-semibold">
                    Pressure Arrival & Departure
                  </p>
                  <Chart setPressure={setPressure} />
                </div>
                <div className="lg:w-1/2 w-full h-[400px] lg:h-full gap-3 rounded-xl border p-5 shadow ">
                  <MapComponent
                    icon={icon}
                    coords={manifold.coords}
                    page={"manifold"}
                  />
                </div>
              </section>
              <section className="flex flex-col lg:flex-row lg:items-center gap-4 transition-all ">
                <div className="lg:w-1/2 w-full gap-3 rounded-xl border p-5 shadow">
                  <p className="p-4 font-semibold">Temerature chart</p>
                  <TempChart
                    setTemperature={setTemperature}
                    indice2={"tempArrivé"}
                    indice1={"tempDepart"}
                  />
                </div>
                <div className="lg:w-1/2 w-full gap-3 rounded-xl border p-5 shadow">
                  <p className="p-4 font-semibold">Pression transversal</p>
                  <TempChart indice2={"production"} indice1={"test"} />
                </div>
              </section>
              <div
                className={
                  " flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow pb-24"
                }
              >
                <p className="p-4 font-semibold">Overview</p>
                <TableDemo manifoldDetails={manifold} />
              </div>
              {/* <div className={" flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow "}>
              <TableDemo/>
            </div>
            <div className={" flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow "}>
              <TableDemo/>
            </div> */}
            </div>
          </div>
        </WellContextProvider>
      </CreatePipeFormContextProvider>
    )
  );
}

export default page;
