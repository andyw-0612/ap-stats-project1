import React from "react";

const StemLeaf = () => {
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

  const processData = (data) => {
    const stems = {};
    data.forEach((value) => {
      const stem = Math.floor(value / 10);
      const leaf = value % 10;
      if (!stems[stem]) stems[stem] = { lower: [], upper: [] };
      if (leaf < 5) {
        stems[stem].lower.push(leaf.toFixed(2));
      } else {
        stems[stem].upper.push(leaf.toFixed(2));
      }
    });
    Object.values(stems).forEach((stem) => {
      stem.lower.sort((a, b) => parseFloat(a) - parseFloat(b));
      stem.upper.sort((a, b) => parseFloat(a) - parseFloat(b));
    });
    return stems;
  };

  const mobileStems = processData(mobileData);
  const keyboardStems = processData(keyboardData);
  const allStems = [
    ...new Set([...Object.keys(mobileStems), ...Object.keys(keyboardStems)]),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <div className="flex flex-col items-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mb-8">
        <h2 className="text-2xl font-bold mb-10 text-center text-gray-800">
          Stem and Leaf Plot: Typing Speed Comparison
        </h2>
        <div className="flex font-mono text-sm">
          <div className="w-[45%] pr-2 text-right">
            {allStems.flatMap((stem) => [
              <div
                key={`mobile-${stem}-lower`}
                className="flex justify-end items-center h-6"
              >
                <span className="text-blue-600 bg-blue-50 px-1 whitespace-nowrap overflow-hidden">
                  {mobileStems[stem]?.lower.join(" ") || "\u00A0"}
                </span>
              </div>,
              <div
                key={`mobile-${stem}-upper`}
                className="flex justify-end items-center h-6"
              >
                <span className="text-blue-600 bg-blue-50 px-1 whitespace-nowrap overflow-hidden">
                  {mobileStems[stem]?.upper.join(" ") || "\u00A0"}
                </span>
              </div>,
            ])}
          </div>
          <div className="w-[10%] flex">
            <div className="flex-1 text-right pr-1">
              <div className="h-full w-px bg-gray-300 ml-auto"></div>
            </div>
            <div className="flex-1 text-center">
              {allStems.flatMap((stem) => [
                <div
                  key={`stem-${stem}-lower`}
                  className="h-6 flex items-center justify-center"
                >
                  <span className="text-black font-semibold">{stem}</span>
                </div>,
                <div
                  key={`stem-${stem}-upper`}
                  className="h-6 flex items-center justify-center"
                >
                  <span className="text-black font-semibold">{stem}</span>
                </div>,
              ])}
            </div>
            <div className="flex-1 text-left pl-1">
              <div className="h-full w-px bg-gray-300"></div>
            </div>
          </div>
          <div className="w-[45%] pl-2">
            {allStems.flatMap((stem) => [
              <div
                key={`keyboard-${stem}-lower`}
                className="flex items-center h-6"
              >
                <span className="text-rose-600 bg-rose-50 px-1 whitespace-nowrap overflow-hidden">
                  {keyboardStems[stem]?.lower.join(" ") || "\u00A0"}
                </span>
              </div>,
              <div
                key={`keyboard-${stem}-upper`}
                className="flex items-center h-6"
              >
                <span className="text-rose-600 bg-rose-50 px-1 whitespace-nowrap overflow-hidden">
                  {keyboardStems[stem]?.upper.join(" ") || "\u00A0"}
                </span>
              </div>,
            ])}
          </div>
        </div>
        <div className="mt-8 text-sm text-gray-600">
          <p className="font-semibold mb-2">Key:</p>
          <p>
            <span className="text-blue-600 bg-blue-50 px-1">3.44</span>{" "}
            <span className="text-black font-semibold">|</span>{" "}
            <span className="text-black font-semibold">8</span> = 83.44 WPM on
            mobile
          </p>
          <p>
            <span className="text-black font-semibold">12</span>{" "}
            <span className="text-black font-semibold">|</span>{" "}
            <span className="text-rose-600 bg-rose-50 px-1">6.12</span> = 126.12
            WPM on keyboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default StemLeaf;
