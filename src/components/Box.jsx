import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Box = () => {
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

  const prepareBoxPlotData = (data) => {
    const sortedData = [...data].sort((a, b) => a - b);
    const q1 = sortedData[Math.floor(sortedData.length / 4)];
    const median = sortedData[Math.floor(sortedData.length / 2)];
    const q3 = sortedData[Math.floor((sortedData.length * 3) / 4)];
    const iqr = q3 - q1;
    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;

    const min = sortedData.find((v) => v >= lowerFence);
    const max = sortedData.reverse().find((v) => v <= upperFence);

    const outliers = data.filter((v) => v < lowerFence || v > upperFence);

    return { min, q1, median, q3, max, outliers };
  };

  const mobileBoxPlotData = prepareBoxPlotData(mobileData);
  const keyboardBoxPlotData = prepareBoxPlotData(keyboardData);

  const allData = [...mobileData, ...keyboardData];
  const minWPM = Math.floor(Math.min(...allData) / 10) * 10;
  const maxWPM = Math.ceil(Math.max(...allData) / 10) * 10;

  const tickCount = 8;
  const tickValues = Array.from({ length: tickCount }, (_, i) =>
    Math.round(minWPM + (i * (maxWPM - minWPM)) / (tickCount - 1)),
  );

  const LegendItem = ({ color, label }) => (
    <div className="flex items-center mr-4">
      <div className={`w-4 h-4 ${color} mr-2`}></div>
      <span>{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg min-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
          Box and Whisker Plot: Typing Speed Comparison
        </h2>
        <div className="flex justify-center mb-8">
          <LegendItem color="bg-blue-500" label="Mobile WPM" />
          <LegendItem color="bg-red-700" label="Keyboard WPM" />
        </div>
        <div className="relative h-52">
          <div className="flex justify-between h-52 special-padding-grid">
            {/* Grid lines */}
            {tickValues.map((tick, index) => (
              <div
                key={index}
                className="top-0 h-full w-px bg-gray-200"
                id={`box-grid-${index}`}
              ></div>
            ))}
          </div>

          {["Mobile", "Keyboard"].map((device, index) => {
            const data =
              device === "Mobile" ? mobileBoxPlotData : keyboardBoxPlotData;
            const color = device === "Mobile" ? "bg-blue-500" : "bg-rose-700";
            const y = index * 100 + 20;

            return (
              <React.Fragment key={device}>
                <div
                  className={`absolute left-0 top-0 w-full h-16 flex items-center ${device}`}
                  style={{ transform: `translateY(${y}px)` }}
                >
                  <div className="flex-grow relative h-16">
                    {/* Box */}
                    <div
                      className={`absolute h-16 ${color} opacity-30`}
                      style={{
                        left: `${((data.q1 - minWPM) / (maxWPM - minWPM)) * 100}%`,
                        width: `${((data.q3 - data.q1) / (maxWPM - minWPM)) * 100}%`,
                      }}
                    ></div>

                    {/* Whiskers */}
                    <div
                      className={`absolute h-0.5 ${color}`}
                      style={{
                        left: `${((data.min - minWPM) / (maxWPM - minWPM)) * 100}%`,
                        width: `${((data.q1 - data.min) / (maxWPM - minWPM)) * 100}%`,
                        top: "50%",
                      }}
                    ></div>
                    <div
                      className={`absolute h-0.5 ${color}`}
                      style={{
                        left: `${((data.q3 - minWPM) / (maxWPM - minWPM)) * 100}%`,
                        width: `${((data.max - data.q3) / (maxWPM - minWPM)) * 100}%`,
                        top: "50%",
                      }}
                    ></div>

                    {/* Vertical lines */}
                    <div
                      className={`absolute w-0.5 h-16 ${color}`}
                      style={{
                        left: `${((data.min - minWPM) / (maxWPM - minWPM)) * 100}%`,
                      }}
                    ></div>
                    <div
                      className={`absolute w-0.5 h-16 ${color}`}
                      style={{
                        left: `${((data.q1 - minWPM) / (maxWPM - minWPM)) * 100}%`,
                      }}
                    ></div>
                    <div
                      className={`absolute w-0.5 h-16 ${color}`}
                      style={{
                        left: `${((data.median - minWPM) / (maxWPM - minWPM)) * 100}%`,
                      }}
                    ></div>
                    <div
                      className={`absolute w-0.5 h-16 ${color}`}
                      style={{
                        left: `${((data.q3 - minWPM) / (maxWPM - minWPM)) * 100}%`,
                      }}
                    ></div>
                    <div
                      className={`absolute w-0.5 h-16 ${color}`}
                      style={{
                        left: `${((data.max - minWPM) / (maxWPM - minWPM)) * 100}%`,
                      }}
                    ></div>

                    {/* Horizontal lines */}
                    <div
                      className={`absolute h-0.5 ${color}`}
                      style={{
                        left: `${((data.q1 - minWPM) / (maxWPM - minWPM)) * 100}%`,
                        width: `${((data.q3 - data.q1) / (maxWPM - minWPM)) * 100}%`,
                        top: "0",
                      }}
                    ></div>
                    <div
                      className={`absolute h-0.5 ${color}`}
                      style={{
                        left: `${((data.q1 - minWPM) / (maxWPM - minWPM)) * 100}%`,
                        width: `${((data.q3 - data.q1) / (maxWPM - minWPM)) * 100}%`,
                        bottom: "0",
                      }}
                    ></div>

                    {/* Outliers */}
                    {data.outliers.map((outlier, i) => (
                      <div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full ${color}`}
                        style={{
                          left: `${((outlier - minWPM) / (maxWPM - minWPM)) * 100}%`,
                          top: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex justify-between special-padding-tick">
            {tickValues.map((tick, i) => (
              <span key={i}>{tick}</span>
            ))}
          </div>
        </div>
        <div className="mt-2 text-sm text-center text-gray-600">
          Words per Minute (WPM)
        </div>
      </div>
    </div>
  );
};

export default Box;
