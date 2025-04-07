import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: "Tea",
    current: 320,
    previous: 280,
  },
  {
    name: "Textiles",
    current: 285,
    previous: 250,
  },
  {
    name: "Spices",
    current: 210,
    previous: 190,
  },
  {
    name: "Coconut",
    current: 195,
    previous: 165,
  },
  {
    name: "Agriculture",
    current: 180,
    previous: 155,
  },
  {
    name: "Gems",
    current: 175,
    previous: 160,
  },
  {
    name: "Rubber",
    current: 165,
    previous: 140,
  },
];
export const CategoryComparisonChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#d9d9d9" />
        <XAxis dataKey="name" stroke="#353535" />
        <YAxis stroke="#353535" />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#d9d9d9",
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        <Bar
          name="Current Year"
          dataKey="current"
          fill="#284b63"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          name="Previous Year"
          dataKey="previous"
          fill="#3c6e71"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
