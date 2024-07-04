"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import Drop from "../Drop";
import Tree from "../Tree";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
function LeftSideBar({activeButton,
  setActiveButton,
  setSelectedNetworks,
  setSelectedWells,
  setSelectedLines,
  setSelectedLineSizes,
  selectedNetworks,
  selectedWells,
  selectedLines,
  selectedLineSizes,
}) {

  const toggleSelection = (selectedItems, setSelectedItems) => (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  return (
    // <div className="sticky w-[450px] overflow-x-hidden bg-white flex flex-col gap-4 justify-start items-center overflow-auto mx-1 ">
    //   <Tabs defaultValue="account" className="mt-5 w-full mx-4">
    //     <p className="text-black text-base font-black mb-2 ml-4">Display</p>
    //     <TabsList className="grid w-full grid-cols-2 ">
    //       <TabsTrigger value="account">Map</TabsTrigger>
    //       <TabsTrigger value="password">dashboard</TabsTrigger>
    //     </TabsList>
    //     <TabsContent value="account">
    //     <p className="text-black text-base font-black mb-2 ml-4">Filter</p>
    //     <p className="text-black text-base font-semibold mb-2 ml-4">Network</p>
    //       <div className="w-full ">
    //         {/* <Tree /> */}
    //       </div>
    //     </TabsContent>
    //     <TabsContent value="password"></TabsContent>
    //   </Tabs>
    // </div>
    <div className="p-4 w-80 bg-white rounded-full shadow-lg">
      <div className="mb-4">
        <div className="text-sm font-black">Display</div>
        <div className="flex space-x-0 mt-2 pl-2">
          <button
            onClick={() => setActiveButton("Map")}
            className={`py-1 w-[48%] text-sm border ${
              activeButton === "Map"
                ? "bg-blue-100 text-blue-700 border-blue-700 rounded-l-md"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Map
          </button>
          <button
            onClick={() => setActiveButton("Dashboard")}
            className={`py-1 w-[48%] text-sm border ${
              activeButton === "Dashboard"
                ? "bg-blue-100 text-blue-700 border-blue-700 rounded-r-md"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Dashboard
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-black">Filters</div>

        <div className="mt-4">
          <div className="text-xs font-semibold">Networks</div>
          <div className="flex flex-wrap -mr-2 -mb-2 mt-2">
            {["Gas", "Oil", "Water"].map((network) => (
              <button
                key={network}
                onClick={() =>
                  toggleSelection(
                    selectedNetworks,
                    setSelectedNetworks
                  )(network)
                }
                className={`px-4 py-2 mr-2 mb-2 rounded-full ${
                  selectedNetworks.includes(network)
                    ? "bg-blueNav text-white text-xs"
                    : "bg-gray-200 text-blueNav text-xs"
                }`}
              >
                {network}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-xs font-semibold">Wells</div>
          <div className="flex flex-wrap -mr-2 -mb-2 mt-2">
            {["Eruptive", "Gas Lift", "Gas Injector", "Water Injector"].map(
              (well) => (
                <button
                  key={well}
                  onClick={() =>
                    toggleSelection(selectedWells, setSelectedWells)(well)
                  }
                  className={`px-4 py-2 mr-2 mb-2 rounded-full ${
                    selectedWells.includes(well)
                      ? "bg-blueNav text-white text-xs"
                      : "bg-gray-200 text-blueNav text-xs"
                  }`}
                >
                  {well}
                </button>
              )
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs font-semibold">Pipes</div>
          <div className="flex flex-wrap -mr-2 -mb-2 mt-2">
            {["Collect", "Collector"].map((line) => (
              <button
                key={line}
                onClick={() =>
                  toggleSelection(selectedLines, setSelectedLines)(line)
                }
                className={`px-4 py-2 mr-2 mb-2 rounded-full ${
                  selectedLines.includes(line)
                    ? "bg-blueNav text-white text-xs"
                    : "bg-gray-200 text-blueNav text-xs"
                }`}
              >
                {line}
              </button>
            ))}
          </div>
          <div className="flex space-x-2 mt-4">
            <input
              type="text"
              placeholder="Min year"
              className="w-1/2 px-4 py-2 border rounded-full text-xs"
            />
            <input
              type="text"
              placeholder="Max year"
              className="w-1/2 px-4 py-2 border rounded-full text-xs"
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <input
              type="text"
              placeholder="Min length"
              className="w-1/2 px-4 py-2 border rounded-full text-xs"
            />
            <input
              type="text"
              placeholder="Max length"
              className="w-1/2 px-4 py-2 border rounded-full text-xs"
            />
          </div>
          <div className="flex flex-wrap -mr-2 -mb-2 mt-4">
            {['2"', '4"', '6"', '8"'].map((size) => (
              <button
                key={size}
                onClick={() =>
                  toggleSelection(selectedLineSizes, setSelectedLineSizes)(size)
                }
                className={`px-3 py-2 mr-2 mb-2 rounded-full ${
                  selectedLineSizes.includes(size)
                    ? "bg-blueNav text-white text-xs"
                    : "bg-gray-200 text-blueNav text-xs"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs font-semibold">Manifold</div>
          <div className="flex space-x-2 mt-2">
            <input
              type="text"
              placeholder="Min year"
              className="w-1/2 px-4 py-2 border rounded-full text-xs"
            />
            <input
              type="text"
              placeholder="Max year"
              className="w-1/2 px-4 py-2 border rounded-full text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
