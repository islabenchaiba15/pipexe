import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8042", "#FF8042", "#FF8042"];

function Circle({ label, stats }) {
  // Create chart data with proportions
  const chartData = Object.keys(stats)
    .filter(key => key !== 'total' && stats[key] > 0) // Filter out zero values and total
    .map(key => ({
      name: key,
      value: stats[key],
      percentage: (stats[key] / stats.total) * 100
    }));

  // Handle the case where the label is "Total"
  if (label.toLowerCase() === 'total') {
    return (
      <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
        <ResponsiveContainer width={80} height={80}>
          <PieChart>
            <Pie
              data={[{ name: 'total', value: stats.total, percentage: 100 }]}
              cx="50%"
              cy="50%"
              innerRadius={25}
              outerRadius={35}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="percentage"
              startAngle={90}
              endAngle={450}
            >
              <Cell key="cell-total" fill="#8884d8" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
      <ResponsiveContainer width={80} height={80}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={35}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="percentage"
            startAngle={90}
            endAngle={450}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name === label.toLowerCase() ? "#8884d8" : "#e0e0e0"} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Circle;
