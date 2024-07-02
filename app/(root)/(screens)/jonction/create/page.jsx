'use client'; // Add this line at the top

import React from 'react';
import CreatePipeFormContextProvider from '../../../../../context/CreatePipeFormContextProvider';
import WellContextProvider from '../../../../../context/WellContextProvider';
import JonctionForm from '@/components/JonctionForm';
import dynamic from 'next/dynamic';


const Page = () => {
  const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  const icon="../eye.svg"
  return (
    <WellContextProvider>
      <CreatePipeFormContextProvider>
        <div className='flex h-screen w-full'>
          <div className="w-1/2 ">
            <MapComponent icon={icon}/>
          </div>
          <div className="w-1/2 h-screen bg-white overflow-y-auto pb-16">
            <JonctionForm/>
          </div>
        </div>
      </CreatePipeFormContextProvider>
    </WellContextProvider>

  );
};

export default Page;