"use client"; // Add this line at the top

import React, { useState } from "react";
import CreatePipeFormContextProvider from "@/context/CreatePipeFormContextProvider";
import CoordContextProvider from "@/context/CoordContextProvider";
import WellContextProvider from "@/context/WellContextProvider";
import DataContextProvider from "@/context/DataContextProvider";
import ManifoldMap from "@/components/ManifoldMap";
import UpdateAndTerminateForm from "./UpdateAndTerminateForm";

const UpdatePage = () => {
  const [totalDistance, setTotalDistance] = useState(0);
  return (
    <DataContextProvider>
      <CoordContextProvider>
        <WellContextProvider>
          <CreatePipeFormContextProvider>
            <div className="flex h-[95%] w-full">
              <div className="w-1/2 ">
                <ManifoldMap setTotalDistance={setTotalDistance} />
              </div>
              <div className="w-1/2 h-screen bg-white overflow-y-auto pb-16">
                <UpdateAndTerminateForm totalDistance={totalDistance} />
              </div>
            </div>
          </CreatePipeFormContextProvider>
        </WellContextProvider>
      </CoordContextProvider>
    </DataContextProvider>
  );
};

export default UpdatePage;
