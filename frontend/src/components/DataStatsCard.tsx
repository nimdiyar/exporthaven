import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
interface DataStatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  color: string;
}
export const DataStatsCard: React.FC<DataStatsCardProps> = ({
  title,
  value,
  change,
  trend,
  description,
  color,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
      <h3
        className="text-lg font-medium mb-2"
        style={{
          color,
        }}
      >
        {title}
      </h3>
      <div className="flex items-end justify-between mb-4">
        <span
          className="text-3xl font-bold"
          style={{
            color,
          }}
        >
          {value}
        </span>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          {change}
        </div>
      </div>
      <p className="text-sm text-[#353535]">{description}</p>
    </div>
  );
};
