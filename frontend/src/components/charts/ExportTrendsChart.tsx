import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    month: "Jan",
    tea: 42,
    textiles: 28,
    gems: 18,
    spices: 22,
  },
  {
    month: "Feb",
    tea: 45,
    textiles: 30,
    gems: 20,
    spices: 25,
  },
  {
    month: "Mar",
    tea: 50,
    textiles: 35,
    gems: 22,
    spices: 28,
  },
  {
    month: "Apr",
    tea: 48,
    textiles: 38,
    gems: 24,
    spices: 26,
  },
  {
    month: "May",
    tea: 52,
    textiles: 40,
    gems: 28,
    spices: 30,
  },
  {
    month: "Jun",
    tea: 58,
    textiles: 42,
    gems: 30,
    spices: 34,
  },
  {
    month: "Jul",
    tea: 62,
    textiles: 45,
    gems: 32,
    spices: 38,
  },
  {
    month: "Aug",
    tea: 68,
    textiles: 48,
    gems: 36,
    spices: 40,
  },
  {
    month: "Sep",
    tea: 72,
    textiles: 52,
    gems: 38,
    spices: 42,
  },
  {
    month: "Oct",
    tea: 76,
    textiles: 55,
    gems: 40,
    spices: 45,
  },
  {
    month: "Nov",
    tea: 80,
    textiles: 58,
    gems: 42,
    spices: 48,
  },
  {
    month: "Dec",
    tea: 85,
    textiles: 62,
    gems: 45,
    spices: 52,
  },
];
export const ExportTrendsChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#d9d9d9" />
        <XAxis dataKey="month" stroke="#353535" />
        <YAxis stroke="#353535" />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#d9d9d9",
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="tea"
          stroke="#284b63"
          strokeWidth={2}
          activeDot={{
            r: 8,
          }}
        />
        <Line
          type="monotone"
          dataKey="textiles"
          stroke="#3c6e71"
          strokeWidth={2}
        />
        <Line type="monotone" dataKey="gems" stroke="#353535" strokeWidth={2} />
        <Line
          type="monotone"
          dataKey="spices"
          stroke="#6a8d92"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
