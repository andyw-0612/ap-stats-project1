import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Histo = () => {
  const mobileData = [
    105.37, 89.0, 92.66, 94.66, 68.83, 86.96, 86.35, 94.92, 64.24, 63.17, 60.57,
    88.44, 70.93, 79.81, 126.36, 81.37, 57.28, 68.74, 84.04, 50.34, 95.68,
    64.33, 52.92, 75.49, 81.8, 79.27, 80.57, 91.13, 55.05, 62.17, 67.52, 86.25,
    66.25, 65.35, 92.66, 87.33, 66.55, 53.16, 72.25, 49.63, 96.05, 78.39, 63.96,
    65.85, 73.79, 60.25, 85.09, 78.1, 87.63, 48.47, 84.14, 92.92, 50.31, 76.25,
    90.55, 92.52, 87.0, 70.18, 70.3,
  ];

  const keyboardData = [
    126.12, 164.46, 157.46, 102.91, 138.77, 127.86, 153.76, 109.43, 68.33,
    160.84, 111.23, 121.88, 129.21, 107.88, 160.96, 158.45, 124.47, 165.33,
    107.79, 136.12, 136.16, 127.34, 74.49, 99.18, 103.28, 124.83, 89.5, 139.86,
    102.6, 143.7, 131.28, 92.06, 121.22, 94.97, 169.92, 143.16, 72.75, 121.42,
    62.05, 115.13, 102.04, 128.78, 107.24, 125.29, 98.59, 93.17, 131.13, 150.46,
    87.82, 126.69, 128.93, 147.2, 120.62, 108.75, 56.73, 119.75, 132.56, 82.47,
    132.31, 107.81, 76.65, 162.62, 129.29, 163.32, 133.31, 170.42, 155.87,
  ];

  const prepareHistogramData = (data, binSize = 5) => {
    const bins = {};
    const minValue = Math.floor(Math.min(...data) / binSize) * binSize;
    const maxValue = Math.ceil(Math.max(...data) / binSize) * binSize;

    for (let i = minValue; i <= maxValue; i += binSize) {
      bins[i] = { binStart: i, binEnd: i + binSize, count: 0 };
    }

    data.forEach((value) => {
      const binIndex = Math.floor(value / binSize) * binSize;
      if (bins[binIndex]) {
        bins[binIndex].count += 1;
      }
    });

    return Object.values(bins);
  };

  const mobileHistogramData = prepareHistogramData(mobileData);
  const keyboardHistogramData = prepareHistogramData(keyboardData);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p>{`${data.binStart} - ${data.binEnd} WPM: ${data.count}`}</p>
        </div>
      );
    }
    return null;
  };

  const allData = [...mobileData, ...keyboardData];
  const minWPM = Math.floor(Math.min(...allData) / 10) * 10;
  const maxWPM = Math.ceil(Math.max(...allData) / 10) * 10;

  const LegendItem = ({ color, label }) => (
    <div className="flex items-center mr-4">
      <div className={`w-4 h-4 ${color} mr-2`}></div>
      <span>{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg min-w-5xl w-full mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Histogram: Typing Speed Comparison
        </h2>
        <div className="flex justify-center mb-6">
          <LegendItem color="bg-blue-500" label="Mobile WPM" />
          <LegendItem color="bg-red-700" label="Keyboard WPM" />
        </div>
        <div className="flex flex-col space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mobileHistogramData}
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis
                dataKey="binStart"
                type="number"
                domain={[minWPM, maxWPM]}
                tickCount={10}
              />
              <YAxis
                label={{
                  value: "Frequency",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#3b82f6" name="Mobile" />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={keyboardHistogramData}
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis
                dataKey="binStart"
                type="number"
                domain={[minWPM, maxWPM]}
                tickCount={10}
                label={{
                  value: "Words per Minute (WPM)",
                  position: "insideBottom",
                  offset: -10,
                }}
              />
              <YAxis
                label={{
                  value: "Frequency",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#be123c" name="Keyboard" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Histo;
