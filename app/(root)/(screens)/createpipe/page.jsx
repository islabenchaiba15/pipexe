'use client'; // Add this line at the top

import React,{useState} from 'react';
import MapComponent from '../../../../components/MapComponent';
import PipeForm from '../../../../components/PipeForm';
import CreatePipeFormContextProvider from '../../../../context/CreatePipeFormContextProvider';
import WellContextProvider from '../../../../context/WellContextProvider';

const Page = () => {
    const icon="islam.png"
  return (
    <WellContextProvider>
        <CreatePipeFormContextProvider>
            <div className='flex h-screen w-full'>
                <div className="w-1/2 ">
                    <MapComponent icon={icon}/>
                </div>
                <div className="w-1/2 h-screen bg-white overflow-y-auto pb-16">
                    <PipeForm/>
                </div>
            </div>
        </CreatePipeFormContextProvider>
    </WellContextProvider>


  );
};

export default Page;