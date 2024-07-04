"use client";
import React, { Suspense, useMemo, useState } from "react";
import "../globals.css";
import PopUp from "../../components/PopUp";
import Nav from "../../components/Nav";
import CreatePipeFormContextProvider from "../../context/CreatePipeFormContextProvider";
import CoordContextProvider from "../../context/CoordContextProvider";
import dynamic from "next/dynamic";
import DataContextProvider from "@/context/DataContextProvider";
import LoadingPage from "@/components/LoadingPage";

// Dynamic imports for components with SSR disabled
const DynamicLeftSideBar = dynamic(
  () => import("@/components/shared/LeftSideBar"),
  {
    loading: () => <LoadingPage />,
    ssr: false,
  }
);
const DynamicRightSideBar = dynamic(
  () => import("@/components/shared/RightSideBar"),
  {
    loading: () => <LoadingPage />,
    ssr: false,
  }
);
const DynamicMap = dynamic(() => import("@/components/Map"), {
  loading: () => <LoadingPage />,
  ssr: false,
});

const Home = ({}) => {
  const [color, setColor] = useState("black");
  const [totalDistance, setTotalDistance] = useState(0);
  const [activeLayer, setActiveLayer] = useState("OpenStreetMap");
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
        <CreatePipeFormContextProvider>
          <Suspense fallback={<LoadingPage />}>
            <div
              className={`mx-auto max-w-[24400px] hide-scrollbar overflow-x-hidden overflow-y-hidden`}
            >
              <Nav />
              <div className="flex flex-row">
                <DynamicLeftSideBar
                  activeButton={activeButton}
                  setActiveButton={setActiveButton}
                  setSelectedNetworks={setSelectedNetworks}
                  setSelectedWells={setSelectedWells}
                  setSelectedLines={setSelectedLines}
                  setSelectedLineSizes={setSelectedLineSizes}
                  selectedNetworks={selectedNetworks}
                  selectedWells={selectedWells}
                  selectedLines={selectedLines}
                  selectedLineSizes={selectedLineSizes}
                />
                <div className="w-full h-full">
                  <DynamicMap
                    activeLayer={activeLayer}
                    setTotalDistance={setTotalDistance}
                    activeButton={activeButton}
                    selectedNetworks={selectedNetworks}
                    selectedWells={selectedWells}
                    selectedLines={selectedLines}
                    selectedLineSizes={selectedLineSizes}
                  />
                </div>
                <DynamicRightSideBar
                  totalDistance={totalDistance}
                  activeLayer={activeLayer}
                  setActiveLayer={setActiveLayer}
                />
              </div>
            </div>
          </Suspense>
        </CreatePipeFormContextProvider>
      </CoordContextProvider>
    </DataContextProvider>
  );
};

export default Home;
