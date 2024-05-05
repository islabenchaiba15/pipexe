import React, { useContext } from 'react';
import Draggable from "react-draggable";
import CoordContext from '../context/CoordContext';
import { splitCoordinatesByDistance } from './Map';

const FormComplete = ({ formData }) => {


  const distances=formData.length
  console.log('isaaaaaaaaaaaaaaaaaaaaal',formData.length)
  const {maplayers}=useContext(CoordContext)
  const polylines = splitCoordinatesByDistance(maplayers, distances);

  console.log(formData)
  console.log(maplayers)
  console.log(polylines)
  return (
    <Draggable className="z-50">
        <div className="z-50 fixed flex items-center justify-center mr-[50%] "> 
          <div className="bg-white rounded shadow-xl p-6">
            <h2>Form Complete</h2>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <pre>{JSON.stringify(maplayers,0,2)}</pre>
            <pre>{JSON.stringify(polylines,0,2)}</pre>
          </div>
        </div>   
    </Draggable>
  );
};

export default FormComplete;