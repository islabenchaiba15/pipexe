"use client";
import React, { useMemo, useState } from "react";
import "../globals.css";
import PopUp from "../../components/PopUp";
import Nav from "../../components/Nav";
import LeftSideBar from "../../components/shared/LeftSideBar";
import RightSideBar from "../../components/shared/RightSideBar";
import CreatePipeFormContextProvider from "../../context/CreatePipeFormContextProvider";
import CoordContextProvider from "../../context/CoordContextProvider";
import dynamic from "next/dynamic";
import DataContextProvider from "@/context/DataContextProvider";
const Home = () => {
  const [color, setColor] = useState("black");
  const [totalDistance, setTotalDistance] = useState(0);
  const Map = dynamic(() => import("@/components/Map"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  return (
    <DataContextProvider>
      <CoordContextProvider>
        <CreatePipeFormContextProvider>
          <div
            className={`mx-auto max-w-[24400px] hide-scrollbar overflow-x-hidden overflow-y-hidden`}
          >
            <Nav />
            <div className="flex flex-row">
              <LeftSideBar />
              <div className="w-full h-full">
                <Map setTotalDistance={setTotalDistance} />
              </div>
              <RightSideBar totalDistance={totalDistance} />
            </div>
          </div>
        </CreatePipeFormContextProvider>
      </CoordContextProvider>
    </DataContextProvider>
  );
};

export default Home;
