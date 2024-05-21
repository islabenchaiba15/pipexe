'use client'; // Add this line at the top

import React from 'react';
import MapComponent from '../../../../components/MapComponent';
import WellForm from '../../../../components/well/WellForm';
import CreatePipeFormContextProvider from '../../../../context/CreatePipeFormContextProvider';
import WellContextProvider from '../../../../context/WellContextProvider';

const Page = () => {
  return (
    <WellContextProvider>
      <CreatePipeFormContextProvider>
        <div className='flex h-screen w-full'>
          <div className="w-1/2 ">
            <MapComponent />
          </div>
          <div className="w-1/2 h-screen bg-white overflow-y-auto pb-16">
            <WellForm/>
          </div>
        </div>
      </CreatePipeFormContextProvider>
    </WellContextProvider>

  );
};

export default Page;