"use client"; // Add this line at the top

import React, { useState } from "react";
import CreatePipeFormContextProvider from "@/context/CreatePipeFormContextProvider";
import CoordContextProvider from "@/context/CoordContextProvider";
import WellContextProvider from "@/context/WellContextProvider";
import DataContextProvider from "@/context/DataContextProvider";
import ManifoldMap from "@/components/ManifoldMap";
import UpdateManifoldForm from "./UpdateManifoldForm";

 const UpdatePage = ({inspectionID}) => {
  const [totalDistance, setTotalDistance] = useState(0);
  return (
    <div>
      islam
    </div>
  );
};
export default UpdatePage