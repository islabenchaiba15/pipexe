"use client"; // Add this line at the top

import React, { useState } from "react";
import Map from "../../../../../components/Map";
import PipeForm from "../../../../../components/PipeForm";
import CreatePipeFormContextProvider from "../../../../../context/CreatePipeFormContextProvider";
import CoordContextProvider from "../../../../../context/CoordContextProvider";
import DragModal from "../../../../../components/DragModal";
import WellContextProvider from "../../../../../context/WellContextProvider";

const Page = () => {
  const [totalDistance, setTotalDistance] = useState(0);
  return (
    <CoordContextProvider>
      <WellContextProvider>
        <CreatePipeFormContextProvider>
          <div className="flex h-screen w-full">
            <div className="w-1/2 ">
              <Map setTotalDistance={setTotalDistance} />
            </div>
            <div className="w-1/2 h-screen bg-white overflow-y-auto pb-16">
              <DragModal totalDistance={totalDistance} />
            </div>
          </div>
        </CreatePipeFormContextProvider>
      </WellContextProvider>
    </CoordContextProvider>
  );
};

export default Page;
