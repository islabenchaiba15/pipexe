"use client";
import React, { useEffect, useState } from "react";
import Card from "../../../../../components/pipe/Card";
import AddressCard from "../../../../../components/well/AddressCard";
import Chart from "../../../../../components/pipe/Chart";
import TableDemo from "../../../../../components/well/Table";

import MapComponent from "../../../../../components/MapComponent";
import CreatePipeFormContextProvider from "../../../../../context/CreatePipeFormContextProvider";
import WellContextProvider from "../../../../../context/WellContextProvider";
import { axiosInstance } from "@/Api/Index";
const cardData = [
  {
    label: "Nom",
    amount: "md255",
    icon: "/fire.svg",
    discription: "drilled 15/12/2002",
  },
  {
    label: "Type",
    amount: "Irruptif",
    icon: "/fire.svg",
    discription: "depuis 15/12/2020",
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

function page({ params }) {
  console.log(params);
  const icon = "../puit.svg";
  const [well, setWell] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchWells = async () => {
      try {
        const response = await axiosInstance.get(`/well/${params.id}`);
        setWell(response.data);
        setLoading(false);
        console.log(loading, "looooooooooooooding");
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchWells();
  }, []);
  useEffect(() => {
    console.log("Updated wells state:", well);
    console.log("adrrrrrrrrrrress", well.address);
  }, [well]);
  return (
    !loading && (
      <CreatePipeFormContextProvider>
        <WellContextProvider>
          <div className="flex flex-col gap-5 mx-10 my-4 overflow-x-auto overflow-y-auto no-scrollbar h-screen ">
            <h1 className="text-3xl font-bold text black">Puit details</h1>
            <section className="grid w-full grid-cols-1 gap-4  transition-all sm:grid-cols-2 xl:grid-cols-3 ">
              <Card
                amount={"Nom"}
                icon={"/fire.svg"}
                discription={`drilled ${well.formattedDate}`}
                label={well.name}
              />
              <Card
                amount={"erruptif"}
                icon={"/fire.svg"}
                discription={`depuis ${well.formattedDate}`}
                label={"Type"}
              />

              <AddressCard
                address={"address"}
                wilaya={well.address.wilaya}
                zone={well.address.zone}
                region={well.address.region}
                centre={well.address.centre}
                icon={"/fire.svg"}
              />
            </section>
            <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
              <div
                className={
                  " flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow"
                }
              >
                <p className="p-4 font-semibold">Overview</p>
                <Chart />
              </div>
              <div
                className={
                  " flex flex-col w-full h-[400px] lg:h-full justify-between gap-3 rounded-xl border p-5 shadow "
                }
              >
                <MapComponent icon={icon} coords={well.coords} />
              </div>
            </section>
            <div
              className={
                " flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow pb-24"
              }
            >
              <p className="p-4 font-semibold">Overview</p>
              <TableDemo wellDetails={well} />
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
  );
}

export default page;
