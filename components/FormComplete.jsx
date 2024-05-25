"use client";
import React, { useContext, useEffect, useState } from "react";
import CoordContext from "../context/CoordContext";
import { splitCoordinatesByDistance } from "./Map";
import axios from "axios";
import fetchElevation from "@/lib/functions";
import { Button } from "@/components/ui/button"
import { Divider } from "@nextui-org/react";
import { convertData, createSegments } from "@/app/Fucntions/function";
import { axiosInstance } from "@/Api/Index";

const FormComplete = ({ formData }) => {
  const distances = formData.length;
  const [elevations, setElevations] = useState({});
  const distancesWithoutLastValue = formData.length.slice(0, -1);
  console.log("isaaaaaaaaaaaaaaaaaaaaal", formData.length);
  const { maplayers } = useContext(CoordContext);
  const polylines = splitCoordinatesByDistance(
    maplayers,
    distancesWithoutLastValue
  );
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

  const segments = createSegments(polylines, formData);
  const result = convertData(maplayers, formData);


  const onsubmit =async()=>{
    console.log('seeeeeeeeeeeeeeed')
    const { data } = await axiosInstance.post("/pipe/create-pipe", [result, segments]);

  }
  return (
    <div className=" p-6">
      <h2>Form Complete</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>

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

      <Button variant="outline" onClick={onsubmit}>Button</Button>

    </div>
  );
};

export default FormComplete;
