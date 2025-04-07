import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
const data = [
  {
    name: "Europe",
    value: 35,
  },
  {
    name: "North America",
    value: 25,
  },
  {
    name: "Asia",
    value: 20,
  },
  {
    name: "Middle East",
    value: 10,
  },
  {
    name: "Australia",
    value: 5,
  },
  {
    name: "Africa",
    value: 3,
  },
  {
    name: "South America",
    value: 2,
  },
];
const COLORS = [
  "#284b63",
  "#3c6e71",
  "#5f8a8c",
  "#6a8d92",
  "#819fa3",
  "#98b1b4",
  "#b0c4c6",
];
export const MarketDistributionChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, "Market Share"]}
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#d9d9d9",
            borderRadius: "0.5rem",
          }}
        />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
};
