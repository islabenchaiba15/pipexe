"use client";
import React, { useMemo, useState } from "react";
import DataContext from "./DataContext";
const DataContextProvider = ({ children }) => {
  const [wells, setWells] = useState([]);
  const [manifolds, setManifolds] = useState([]);
  const [junctions, setJunctions] = useState([]);
  const [pipes, setPipes] = useState([]);

  const contextValue = useMemo(() => ({
    wells,
    setWells,
    manifolds,
    setManifolds,
    junctions,
    setJunctions,
    pipes,
    setPipes,
  }), [wells, manifolds, junctions, pipes]);
  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
