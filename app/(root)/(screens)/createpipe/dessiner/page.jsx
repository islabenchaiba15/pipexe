"use client"; // Add this line at the top

import React, { useState } from "react";
import PipeForm from "../../../../../components/PipeForm";
import CreatePipeFormContextProvider from "../../../../../context/CreatePipeFormContextProvider";
import CoordContextProvider from "../../../../../context/CoordContextProvider";
import DragModal from "../../../../../components/DragModal";
import Map from "../../../../../components/Map";

import WellContextProvider from "../../../../../context/WellContextProvider";
import DataContextProvider from "@/context/DataContextProvider";
import dynamic from "next/dynamic";

const Page = () => {
  const [totalDistance, setTotalDistance] = useState(0);
  const activeLayer = "OpenStreetMap";
  const [activeButton, setActiveButton] = useState("Map");
  const [selectedNetworks, setSelectedNetworks] = useState([
    "Gas",
    "Oil",
    "Water",
  ]);
  const [selectedWells, setSelectedWells] = useState([
    "Eruptive",
    "Gas Injector",
    "Gas Lift",
    "Water Injector",
  ]);
  const [selectedLines, setSelectedLines] = useState(["Collect", "Collector"]);
  const [selectedLineSizes, setSelectedLineSizes] = useState([
    '2"',
    '4"',
    '6"',
    '8"',
  ]);

  return (
    <DataContextProvider>
      <CoordContextProvider>
        <WellContextProvider>
          <CreatePipeFormContextProvider>
            <div className="flex h-screen w-full">
              <div className="w-1/2 ">
                <Map
                  activeButton={activeButton}
                  selectedNetworks={selectedNetworks}
                  selectedWells={selectedWells}
                  selectedLines={selectedLines}
                  selectedLineSizes={selectedLineSizes}
                  activeLayer={activeLayer}
                  setTotalDistance={setTotalDistance}
                />
              </div>
              <div className="w-1/2 h-screen bg-white overflow-y-auto pb-16">
                <DragModal totalDistance={totalDistance} />
              </div>
            </div>
          </CreatePipeFormContextProvider>
        </WellContextProvider>
      </CoordContextProvider>
    </DataContextProvider>
  );
};

export default Page;
