"use client";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import PopUp from "./PopUp";
import DragModal from "./DragModal";
function LeftBarDropDown({ totalDistance, icon, affichage, title }) {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 border p-4 ">
      <Image src={icon} alt="icon" width={50} height={50} />
    </div>
  );
}

export default LeftBarDropDown;
