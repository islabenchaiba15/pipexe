"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDropDown from "./AvatarDropDown";
import { useAuth } from "@/context/AuthContext";

async function Nav() {
  const {user}=await useAuth()
  if(!user) return null;
  return (
    <div className="relative bg-blueNav p-3 items-center justify-between flex">
      <img
        src={"/pipexe1.png"}
        alt="logo"
        width={150}
        height={100}
        className="ml-8"
      />
      <div className="bg-white py-2 px-4 flex items-center rounded-md shadow-md gap-3">
        <Image
          src="/search.png"
          alt="search"
          width={20}
          height={20}
          className="opacity-70"
        />
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="flex flex-row items-center gap-2 mr-8">
        <AvatarDropDown />
        <div className="md:flex md:flex-col md:justify-center gap-2 hidden ">
          <h1 className="text-white font-bold text-sm ">{user.nom}</h1>
          <h1 className="text-white font-semibold text-xs ">{user.departement}</h1>
        </div>
      </div>
    </div>
  );
}

export default Nav;
