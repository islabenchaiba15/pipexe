'use client'; // Add this line at the top

import React from 'react';
import MapComponent from '../../../../../components/MapComponent';
import CreatePipeFormContextProvider from '../../../../../context/CreatePipeFormContextProvider';
import WellContextProvider from '../../../../../context/WellContextProvider';
import JonctionForm from '@/components/JonctionForm';


const Page = () => {
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