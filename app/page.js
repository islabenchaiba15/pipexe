import React from 'react';
import Map from '../components/Map';
const locations = [
  { name: 'Marker 1', coordinates: [31.68788714146774,6.05887782503541] },
  { name: 'Marker 1', coordinates: [31.672280916245967,6.144775430053329] },

  // Add more locations as needed
];

const Home = () => {
  return (
    <div>
      <Map locations={locations} />
    </div>
  );
};

export default Home;