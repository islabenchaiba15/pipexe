'use client'; // Add this line at the top

import React from 'react';
import WellForm from '../../../../components/well/WellForm';
import CreatePipeFormContextProvider from '../../../../context/CreatePipeFormContextProvider';
import WellContextProvider from '../../../../context/WellContextProvider';
import DataContextProvider from '@/context/DataContextProvider';
import dynamic from 'next/dynamic';

const Page = () => {
  const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  const icon="islam.png"
  return (
    <DataContextProvider>
    <WellContextProvider>
      <CreatePipeFormContextProvider>
        <div className='flex h-screen w-full'>
          <div className="w-1/2 ">
            <MapComponent icon={icon}/>
          </div>
          <div className="w-1/2 h-screen bg-white overflow-y-auto pb-16">
            <WellForm />
          </div>
        </div>
      </CreatePipeFormContextProvider>
    </WellContextProvider>
    </DataContextProvider>

  );
};

export default Page;