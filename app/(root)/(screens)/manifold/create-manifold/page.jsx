'use client'; // Add this line at the top

import React from 'react';
import MapComponent from '../../../../../components/MapComponent';
import CreatePipeFormContextProvider from '../../../../../context/CreatePipeFormContextProvider';
import WellContextProvider from '../../../../../context/WellContextProvider';
import ManifoldForm from '../../../../../components/manifold/ManifoldForm';
import ManifoldMap from '@/components/ManifoldMap';

const Page = () => {
  const icon="../manifold.svg"
  return (
    <WellContextProvider>
      <CreatePipeFormContextProvider>
        <div className='flex h-screen w-full'>
          <div className="w-1/2 ">
            <MapComponent icon={icon} page=""/>
          </div>
          <div className="w-1/2 h-screen bg-white overflow-y-auto pb-16">
            <ManifoldForm/>
          </div>
        </div>
      </CreatePipeFormContextProvider>
    </WellContextProvider>

  );
};

export default Page;