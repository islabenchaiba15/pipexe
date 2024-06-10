"use client";
import React, { useState } from "react";
import DataContext from "./DataContext";
const DataContextProvider = ({ children }) => {
  const [wells, setWells] = useState([]);
  const [manifolds, setManifolds] = useState([]);
  const [junctions, setJunctions] = useState([]);
  const [pipes, setPipes] = useState([]);

  const values = {
    wells,
    setWells,
    manifolds,
    setManifolds,
    junctions,
    setJunctions,
    pipes, setPipes
  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
