'use client'
import React, { useState } from 'react';
import Map from '../../components/Map';
import PopUp from '../../components/PopUp';
import Nav from '../../components/Nav';
import LeftSideBar from '../../components/shared/LeftSideBar';
import RightSideBar from '../../components/shared/RightSideBar';
import CreatePipeFormContextProvider from '../../context/CreatePipeFormContextProvider';
import CoordContextProvider from '../../context/CoordContextProvider';
const locations = [
  { name: 'Marker 1', coordinates: [31.68788714146774,6.05887782503541] },
  { name: 'Marker 1', coordinates: [31.672280916245967,6.144775430053329] },
  
  // Add more locations as needed
];
const Home = () => {
  const [color, setColor] = useState('black'); 
  const [totalDistance, setTotalDistance] = useState(0);
  return (
    <CoordContextProvider>
    <CreatePipeFormContextProvider>
      <div className={`mx-auto max-w-[24400px] hide-scrollbar overflow-x-hidden overflow-y-hidden` }>
        <Nav/>
        <div className="flex flex-row">
          <LeftSideBar/>
            <div className="w-full ">
                <Map setTotalDistance={setTotalDistance}/>
            </div>
          <RightSideBar totalDistance={totalDistance} />
        </div>
      </div>
    </CreatePipeFormContextProvider>
    </CoordContextProvider>
  );
};

export default Home;