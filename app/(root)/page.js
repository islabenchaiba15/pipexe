"use client";
import React, { useMemo, useState } from "react";
import "../globals.css";
import PopUp from "../../components/PopUp";
import Nav from "../../components/Nav";
import CreatePipeFormContextProvider from "../../context/CreatePipeFormContextProvider";
import CoordContextProvider from "../../context/CoordContextProvider";
import dynamic from "next/dynamic";
import DataContextProvider from "@/context/DataContextProvider";

// Dynamic imports for components with SSR disabled
const DynamicLeftSideBar = dynamic(() => import("@/components/shared/LeftSideBar"), {
  loading: () => <p>Left sidebar is loading...</p>,
  ssr: false,
});
const DynamicRightSideBar = dynamic(() => import("@/components/shared/RightSideBar"), {
  loading: () => <p>Right sidebar is loading...</p>,
  ssr: false,
});
const DynamicMap = dynamic(() => import("@/components/Map"), {
  loading: () => <p>A map is loading...</p>,
  ssr: false,
});

const Home = () => {
  const [color, setColor] = useState("black");
  const [totalDistance, setTotalDistance] = useState(0);

  return (
    <DataContextProvider>
      <CoordContextProvider>
        <CreatePipeFormContextProvider>
          <div className={`mx-auto max-w-[24400px] hide-scrollbar overflow-x-hidden overflow-y-hidden`}>
            <Nav />
            <div className="flex flex-row">
              <DynamicLeftSideBar />
              <div className="w-full h-full">
                <DynamicMap setTotalDistance={setTotalDistance} />
              </div>
              <DynamicRightSideBar totalDistance={totalDistance} />
            </div>
          </div>
        </CreatePipeFormContextProvider>
      </CoordContextProvider>
    </DataContextProvider>
  );
};

export default Home;
