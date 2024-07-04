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

const FormComplete = ({ formData }) => {
  const [elevations, setElevations] = useState({});
  let distancesWithoutLastValue;
  const { maplayers } = useContext(CoordContext);
  let result, segments, polylines;

  const distances = formData && formData.length ? formData.length : 0;
  useEffect(() => {
    const fetchAllElevations = async () => {
      const elevationsData = {};

      const promises = maplayers.flatMap((layer, layerIndex) =>
        layer.latlngs[0].map(async (latlng, latlngIndex) => {
          const elevation = await fetchElevation(latlng.lat, latlng.lng);
          elevationsData[`${layerIndex}-${latlngIndex}`] = elevation;
        })
      );

      // Flatten the promises array and wait for all to complete
      await Promise.all(promises.flat());

      const flatElevations = Object.values(elevationsData);
      setElevations(flatElevations);
    };

    fetchAllElevations();
  }, [maplayers]);

  if (distances === 0) {
    distancesWithoutLastValue = [];
    result = convertData(maplayers, formData);
  } else {
    distancesWithoutLastValue = formData.length.slice(0, -1);
    polylines = splitCoordinatesByDistance(
      maplayers,
      distancesWithoutLastValue
    );
    segments = createSegments(polylines, formData, elevations);
    result = convertData(maplayers, formData);
  }
  console.log("loooooooooooooooooooooooooooog", formData);
  console.log("isaaaaaaaaaaaaaaaaaaaaal", segments);

  const dataa = {
    result,
    segments,
    elevations,
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
    <div className=" h-screen  mx-4">
      <div className="flex justify-start ">
      <h1 className="font-semi my-4 mx-5">
        Are you sure to create the pipe ? if yes then click create
      </h1>
      </div>
      <div className="flex justify-end items-center mt-[60%]">
        <Button variant="outline">
          cancel
        </Button>
        <Button variant="" onClick={onsubmit}>
          create
        </Button>
      </div>
    </div>
  );
};

export default FormComplete;
