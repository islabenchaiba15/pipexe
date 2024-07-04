"use client";
import React, { useEffect, useState } from "react";
import Card from "../../../../../components/pipe/Card";
import TableDemo from "../../../../../components/pipe/Table";

import CreatePipeFormContextProvider from "../../../../../context/CreatePipeFormContextProvider";
import WellContextProvider from "../../../../../context/WellContextProvider";
import Chart from "../../../../../components/pipe/Chart";
import { axiosInstance } from "@/Api/Index";
import dynamic from "next/dynamic";
const cardData = [
  {
    label: "depart",
    amount: "MD245",
    icon: "/fire.svg",
    discription: "zone 17",
  },
  {
    label: "destination",
    amount: "E2A",
    icon: "/fire.svg",
    discription: "manifold sation",
  },
  {
    label: "longeur",
    amount: "1200",
    icon: "/fire.svg",
    discription: "metre",
  },
  {
    label: "Nature",
    amount: "GAS",
    icon: "/fire.svg",
    discription: "Collecteur",
  },
];

function page({ params }) {
  const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  const [pipe, setPipe] = useState([]);
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pipeDetails = await axiosInstance.get(`/pipe/${params.id}`);
        const segmentDetails = await axiosInstance.get(
          `/pipe/${params.id}/segments`
        );
        setPipe(pipeDetails.data);
        setSegments(segmentDetails.data);
        setLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("detaiiiiiiiiils", segments);
    console.log("detaiiiiiiiiilspiiiiiiiiiiiiiiiipe", pipe);
  }, [pipe, segments]);
  const data = { pipe, segments };

  return (
    !loading && (
      <CreatePipeFormContextProvider>
        <WellContextProvider>
          <div className="flex flex-col gap-5 mx-10 my-4 overflow-x-auto overflow-y-auto no-scrollbar h-screen ">
            <h1 className="text-3xl font-bold text black">Pipe details</h1>
            <section className="grid w-full grid-cols-1 gap-4  transition-all sm:grid-cols-2 xl:grid-cols-4 ">
              <Card
                label={"From"}
                icon={"/fire.svg"}
                discription={`zone 17`}
                amount={pipe.fromDetails.name}
              />
              <Card
                label={"Destination"}
                icon={"/fire.svg"}
                discription={`zone 17`}
                amount={pipe.toDetails.name}
              />
              <Card
                label={"Length"}
                icon={"/fire.svg"}
                discription={`metre`}
                amount={pipe.length}
              />
              <Card
                label={"Nature"}
                icon={"/fire.svg"}
                discription={pipe.nature}
                amount={pipe.type}
              />
            </section>

            <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
              <div
                className={
                  " flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow"
                }
              >
                <p className="p-4 font-semibold">Elevation</p>
                <Chart pipe={pipe} />
              </div>
              <div
                className={
                  " flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow "
                }
              >
                <MapComponent
                  icon={"../islam.png"}
                  pipe={pipe}
                  segments={segments}
                  page={"pipe"}
                />
              </div>
            </section>
            <div
              className={
                " flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow pb-24"
              }
            >
              <p className="p-4 font-semibold">Overview</p>
              <TableDemo segments={segments} pipe={pipe} />
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
