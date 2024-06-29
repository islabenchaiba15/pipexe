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
    <DataContextProvider>
      <CoordContextProvider>
        <WellContextProvider>
          <CreatePipeFormContextProvider>
            <div className="flex w-full h-full"> {/* Added h-full */}
              <div className="w-1/2 h-screen"> {/* Changed to h-full */}
                <ManifoldMap inspectionID={inspectionID} setTotalDistance={setTotalDistance} />
              </div>
              <div className="w-1/2 h-full overflow-y-auto no-scrollbar"> {/* Changed to h-full */}
                <UpdateManifoldForm inspectionID={inspectionID} totalDistance={totalDistance} />
              </div>
            </div>
          </CreatePipeFormContextProvider>
        </WellContextProvider>
      </CoordContextProvider>
    </DataContextProvider>
  );
};
export default UpdatePage