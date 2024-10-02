import React from "react";

const StatisticalSummary = ({
  title = "Statistical Summary",
  mobileData,
  keyboardData,
}) => {
  const sampleMobileData = [23, 25, 28, 30, 32, 34, 35, 37, 39, 41];
  const sampleKeyboardData = [45, 48, 50, 52, 55, 58, 60, 62, 65, 68];

  const calculateStats = (data) => {
    if (!data || data.length === 0) return null;
    const sortedData = [...data].sort((a, b) => a - b);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const q1 = sortedData[Math.floor(sortedData.length / 4)];
    const median = sortedData[Math.floor(sortedData.length / 2)];
    const q3 = sortedData[Math.floor((sortedData.length * 3) / 4)];
    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
    const iqr = q3 - q1;
    const std = Math.sqrt(
      data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
        data.length,
    );

    return { min, q1, median, q3, max, mean, iqr, std };
  };

  const mobileSummary = calculateStats(mobileData || sampleMobileData);
  const keyboardSummary = calculateStats(keyboardData || sampleKeyboardData);

  const renderStatistics = (summary, title, colorClass) => {
    if (!summary) return null;
    const labels = {
      min: "min",
      q1: "q1",
      median: "median",
      q3: "q3",
      max: "max",
      mean: "mean",
      iqr: "IQR",
      std: "standard deviation",
    };
    return (
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className={`text-lg font-medium mb-4 ${colorClass}`}>{title}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(summary).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span className="font-medium">{labels[key]}:</span>
              <span>{value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {renderStatistics(
            mobileSummary,
            "Mobile Typing (WPM)",
            "text-blue-600",
          )}
          {renderStatistics(
            keyboardSummary,
            "Keyboard Typing (WPM)",
            "text-rose-600",
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticalSummary;
