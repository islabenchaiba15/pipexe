'use client'
import React, { useState } from 'react';
import WellContext from './WellContext';
const WellContextProvider=({children})=> {
    const [marker, setMarker] = useState([]);
    const [activeCoordinates,setActiveCoordinates] = useState(false)
    const [ischecked, setChecked] = useState(false)
    const [formData, setFormData] = useState({});
 
    const values={
        marker,
        setMarker,
        activeCoordinates,
        setActiveCoordinates,
        ischecked,
        setChecked,
        formData,
        setFormData,
    }
  return (
    <WellContext.Provider value={values}>
        {children}
    </WellContext.Provider>
  )
}

export default WellContextProvider