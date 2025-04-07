import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
const data = [
  {
    quarter: "Q1 2022",
    actual: 8.2,
    projected: 7.5,
  },
  {
    quarter: "Q2 2022",
    actual: 10.5,
    projected: 9.0,
  },
  {
    quarter: "Q3 2022",
    actual: 12.8,
    projected: 11.5,
  },
  {
    quarter: "Q4 2022",
    actual: 15.2,
    projected: 14.0,
  },
  {
    quarter: "Q1 2023",
    actual: 14.8,
    projected: 15.5,
  },
  {
    quarter: "Q2 2023",
    actual: 16.5,
    projected: 16.0,
  },
  {
    quarter: "Q3 2023",
    actual: 18.2,
    projected: 17.0,
  },
  {
    quarter: "Q4 2023",
    actual: 20.5,
    projected: 19.0,
  },
];
export const ExportGrowthChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#d9d9d9" />
        <XAxis dataKey="quarter" stroke="#353535" />
        <YAxis stroke="#353535" />
        <Tooltip
          formatter={(value) => [`${value}%`, ""]}
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#d9d9d9",
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="actual"
          name="Actual Growth"
          stroke="#284b63"
          fill="#284b63"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="projected"
          name="Projected Growth"
          stroke="#3c6e71"
          fill="#3c6e71"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
