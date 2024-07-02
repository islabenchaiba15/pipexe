import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Chart({pipe}) {
  const elevations = pipe.elevations

  // Function to add a random integer value between 0 and 10
  const addRandomValue = (value) => {
    const randomValue = Math.floor(Math.random() * 11); // 0 to 10
    return Math.round(value) + randomValue; // Round the original value and add the random integer
  }

  const elevationsWithNames = elevations.map((elevation, index) => {
    const pointName = `point${index + 1}`;
    return { 
      elevation: addRandomValue(elevation), 
      name: pointName 
    };
  });
  
  console.log(elevationsWithNames);

  return (
    <ResponsiveContainer width="100%" height={350}>
        <AreaChart
            data={elevationsWithNames}
            width={500}
            height={400}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="elevation" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    </ResponsiveContainer>
  )
}

export default Chart