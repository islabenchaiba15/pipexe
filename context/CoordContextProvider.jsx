'use client'
import React, { useState } from 'react';
import CoordContext from './CoordContext';

const CoordContextProvider = ({ children }) => {
  const [maplayers, setMapLayers] = useState([]);
  const [polylines, setPolylines] = useState([]);

  const values = {
    maplayers,
    setMapLayers,
    polylines,
    setPolylines
  };

  return (
    <CoordContext.Provider value={values}>
      {children}
    </CoordContext.Provider>
  );
};

export default CoordContextProvider;