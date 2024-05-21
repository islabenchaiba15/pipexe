'use client'; // Add this line at the top

import React from 'react';
import MapComponent from '../../../../components/MapComponent';
import PipeForm from '../../../../components/PipeForm';
import CreatePipeFormContextProvider from '../../../../context/CreatePipeFormContextProvider';
const Page = () => {
  return (
    <CreatePipeFormContextProvider>
    <div className='flex h-screen w-full'>
      <div className="w-1/2 ">
        <MapComponent />
      </div>
      <div className="w-1/2 h-screen bg-white overflow-y-auto pb-16">
        <PipeForm/>
      </div>
    </div>
    </CreatePipeFormContextProvider>

  );
};

export default Page;