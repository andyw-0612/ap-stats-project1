import React from "react";

const TextSummary = ({
  title,
  overview,
  keyObservations,
  mobileData,
  keyboardData,
  extraText = [],
  overviewTitle = true,
}) => {
  const calculateFiveNumberSummary = (data) => {
    if (!data || data.length === 0) return null;
    const sortedData = [...data].sort((a, b) => a - b);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const q1 = sortedData[Math.floor(sortedData.length / 4)];
    const median = sortedData[Math.floor(sortedData.length / 2)];
    const q3 = sortedData[Math.floor((sortedData.length * 3) / 4)];
    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;

    return { min, q1, median, q3, max, mean };
  };

  const mobileSummary = calculateFiveNumberSummary(mobileData);
  const keyboardSummary = calculateFiveNumberSummary(keyboardData);

  const renderStatistics = (summary, title, colorClass) => {
    if (!summary) return null;
    return (
      <div>
        <h4 className={`text-lg font-medium mb-2 ${colorClass}`}>{title}</h4>
        <pre className="text-green-400">
          {`min: ${summary.min.toFixed(2)}
q1: ${summary.q1.toFixed(2)}
median: ${summary.median.toFixed(2)}
q3: ${summary.q3.toFixed(2)}
max: ${summary.max.toFixed(2)}
mean: ${summary.mean.toFixed(2)}`}
        </pre>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mb-8">
        {title && (
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {title}
          </h2>
        )}

        {overview && overview.length > 0 && (
          <div className="mb-6">
            {overviewTitle == true && (
              <h3 className="text-xl font-semibold mb-2 text-center text-gray-700">
                Overview
              </h3>
            )}
            {overview.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-3 pl-4 pr-4">
                <pre style={{ display: "inline" }}>&#9;</pre>
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {extraText && extraText.length > 0 && (
          <div className="mb-6">
            {extraText.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-600 mb-3 pl-4 pr-4 text-center"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              ></p>
            ))}
          </div>
        )}

        {(mobileSummary || keyboardSummary) && (
          <div className="flex flex-col items-center mb-6">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
              5 Number + Mean Summary
            </h3>
            <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-6 font-mono text-sm">
              <div className="grid grid-cols-2 gap-4">
                {renderStatistics(
                  mobileSummary,
                  "Mobile Typing (WPM)",
                  "text-blue-400",
                )}
                {renderStatistics(
                  keyboardSummary,
                  "Keyboard Typing (WPM)",
                  "text-rose-400",
                )}
              </div>
            </div>
          </div>
        )}

        {keyObservations && keyObservations.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700 text-center">
              Key Observations
            </h3>
            {keyObservations.map((observation, index) => (
              <p key={index} className="text-gray-600 mb-3 pl-4 pr-4">
                <pre style={{ display: "inline" }}>&#9;</pre>
                {observation}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextSummary;
