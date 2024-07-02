'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import CreatePipeFormContextProvider from '../../../../../context/CreatePipeFormContextProvider';
import WellContextProvider from '../../../../../context/WellContextProvider';
import ManifoldForm from '../../../../../components/manifold/ManifoldForm';

const MapComponentNoSSR = dynamic(() => import('../../../../../components/MapComponent'), {
  ssr: false,
});

const Page = () => {
  const icon = "../manifold.svg"
  return (
    <WellContextProvider>
      <CreatePipeFormContextProvider>
        <div className='flex h-screen w-full'>
          <div className="w-1/2 ">
            <MapComponentNoSSR icon={icon} page=""/>
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