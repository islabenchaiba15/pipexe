'use client'
import React, { useContext, useEffect, useState } from "react";
import CoordContext from "../context/CoordContext";
import { splitCoordinatesByDistance } from "./Map";
import axios from "axios";
import fetchElevation from "@/lib/functions";

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
  console.log(formData);
  console.log(maplayers);
  console.log(polylines);
  cons.log(elevations);
  return (
    <div className=" p-6">
      <h2>Form Complete</h2>
      <pre>islammmmmm{JSON.stringify(elevations, null, 2)}</pre>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <pre>{JSON.stringify(maplayers, 0, 2)}</pre>
      <pre>{JSON.stringify(polylines, 0, 2)}</pre>
    </div>
  );
};

export default FormComplete;
