import React from "react";

const StatCard = ({ title, value, icon: Icon, trend,  theme = "light" }) => {
  const themeClasses = theme === "dark" 
    ? "bg-gray-800 text-gray-200 border-gray-700" 
    : "bg-white text-gray-800 border-gray-200";

  return (
    <div className={`p-6 rounded-lg border shadow-sm ${themeClasses} `}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">from last month</span>
            </div>
          )}
        </div>
        <div className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-blue-50"}`}>
          <Icon className={`${theme === "dark" ? "text-gray-200" : "text-blue-600"}`} size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;