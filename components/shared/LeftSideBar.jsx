"use client";
import Image from "next/image";
import React from "react";
import { Input } from "@nextui-org/react";
import Drop from "../Drop";
import Tree from "../Tree";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
function LeftSideBar() {
  return (
    <div className="sticky w-[450px] overflow-x-hidden bg-white flex flex-col gap-4 justify-start items-center overflow-auto mx-1 ">
      <Tabs defaultValue="account" className="mt-10 w-full mx-4">
        <p className="text-gray-400 text-lg font-semibold mb-2">Analytics</p>
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p className="text-gray-400 text-lg font-semibold mt-2">Recherche</p>
          <div className="flex border-black flex-row items-center justify-between gap-2 p-3">
            <img
              src={"/search.png"}
              width={"auto"}
              height={"auto"}
              className="w-8 h-8 "
            />
            <input
              type="email"
              label="Email"
              className="outline-none"
              placeholder="search"
            />
            <Drop />
          </div>
          <div className="w-full ">
            <Tree />
          </div>
        </TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
    </div>
  );
}

export default LeftSideBar;
