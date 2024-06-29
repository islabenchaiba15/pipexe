"use client";
import React, { useContext, useEffect, useState } from "react";
import CoordContext from "../context/CoordContext";
import { splitCoordinatesByDistance } from "./Map";
import axios from "axios";
import fetchElevation from "@/lib/functions";
import { Button } from "@/components/ui/button";
import { Divider } from "@nextui-org/react";
import { convertData, createSegments } from "@/app/Fucntions/function";
import { axiosInstance } from "@/Api/Index";

const FormCompleteUpdate = ({ formData }) => {
  const [elevations, setElevations] = useState({});
  let distancesWithoutLastValue;
  const { maplayers } = useContext(CoordContext);
  let result, segments, polylines;

  const distances = formData && formData.length ? formData.length : 0;
  if (distances === 0) {
    distancesWithoutLastValue = [];
    result = convertData(maplayers, formData);
  } else {
    distancesWithoutLastValue = formData.length.slice(0, -1);
    polylines = splitCoordinatesByDistance(
      maplayers,
      distancesWithoutLastValue
    );
    segments = createSegments(polylines, formData,elevations);
    result = convertData(maplayers, formData);
  }
  console.log('loooooooooooooooooooooooooooog',formData)
  console.log("isaaaaaaaaaaaaaaaaaaaaal", segments);

  

  const dataa = {
    result,
    segments,
    elevations
  };
  const onsubmit = async () => {
    console.log("seeeeeeeeeeeeeeed");
    const { data } = await axiosInstance.post(
      "/pipe/create-pipe",
      JSON.stringify(dataa),
      {
        headers: {
          "Content-Type": "application/json", // Change to application/json
        },
      }
    );
  };

  return (
    <div className=" p-6">
      <h2>Form Complete</h2>
      <pre>{JSON.stringify(elevations, null, 2)}</pre>

      <Divider className="my-4" />
      <Divider className="my-4" />

      <pre>{JSON.stringify(segments, null, 2)}</pre>
      <Divider className="my-4" />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <Divider className="my-4" />
      <Divider className="my-4" />

      <pre>{JSON.stringify(maplayers, 0, 2)}</pre>
      <Divider className="my-4" />
      <Divider className="my-4" />

      <pre>{JSON.stringify(polylines, 0, 2)}</pre>

      <Divider className="my-4" />
      <Divider className="my-4" />

      <Button variant="outline" onClick={onsubmit}>
        Button
      </Button>
    </div>
  );
};

export default FormCompleteUpdate;
