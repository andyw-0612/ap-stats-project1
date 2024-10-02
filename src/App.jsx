import "./App.css";
import Histo from "./components/Histo";
import Box from "./components/Box";
import StemLeaf from "./components/StemLeaf";
import TextSummary from "./components/TextSummary";
import StatisticalSummary from "./components/StatisticalSummary";

function App() {
  const mobileData = [
    105.37, 89, 92.66, 94.66, 68.83, 86.96, 86.35, 94.92, 64.24, 63.17, 60.57,
    88.44, 70.93, 79.81, 126.36, 81.37, 57.28, 68.74, 84.04, 50.34, 95.68,
    64.33, 52.92, 75.49, 81.8, 79.27, 80.57, 91.13, 55.05, 62.17, 67.52, 86.25,
    66.25, 65.35, 92.66, 87.33, 66.55, 53.16, 72.25, 49.63, 96.05, 78.39, 63.96,
    65.85, 73.79, 60.25, 85.09, 78.1, 87.63, 48.47, 84.14, 92.92, 50.31, 76.25,
    90.55, 92.52, 87, 70.18, 70.3, 107.4, 101.37, 51.3, 72.81, 70.11, 98.48,
    86.1, 121.31,
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

  const overviewText = {
    title: "AP Statistics Chapter 1 Project: Typing Speed Comparison",
    overview: [
      "If some texts don't display properly, please make sure your browser is in light mode.",
      "The datasets I chose are results from typing tests using keyboard and mobile. Both datasets are produced by myself \
      through completing the 'words 10 english' test on monkeytype.com on an iPhone and an Apple Magic Keyboard for the mobile \
      typing speed dataset and the keyboard typing speed dataset, respectively.",
      "Word Per Minute (WPM) is calculated as (number of characters typed correctly / 5) * (60 / time spent typing). \
      This is a common formula for calculating an accurate WPM considering the lengths of different words.",
      "The datasets are comprised of 67 test results recorded as WPM. I wanted to explore the difference between keyboard typing and mobile typing. \
      I understand that in most cases, keyboard will be faster than typing on mobile but I'm curious to see the variability, distribution, and specific differences between the two methods.",
    ],
    keyObservations: [""],
  };

  const histoText = {
    title: "Histogram Analysis",
    overview: [
      "From the histogram, we see that both datasets are roughly symmetrical with the keyboard WPM dataset having a single peak at 125 to 130 WPM with a \
      frequency of 9 while the mobile WPM dataset having no apparent peaks.",
      "We see that the distribution for the keyboard WPM is much 'wider', indicating that there's a larger range of typing speeds on keyboard than mobile. \
      This will be discussed further in the Box and Whisker plot as it's much easier and clearer to see the difference.",
      "Since both datasets are roughly symmetrical, we can use mean as a measure of center.",
    ],
    keyObservations: [
      "The mean of the keyboard WPM dataset is 122.06 WPM while the mobile WPM dataset is 77.91 WPM.",
      "We see that the mean of my keyboard typing speed is around 44 WPM faster than the mean of my mobile WPM",
      "The tails of the keyboard WPM dataset are much 'longer' than the tails of the mobile WPM dataset with the keyboard WPM extending up to the 170~ WPM range while the lowest being in the 55-60 WPM range.",
      "We can confirm the keyboard WPM dataset's much larger spread by looking at the standard deviation (not IQR since our data is not skewed). The standard deviation for the mobile WPM dataset is 16.88 WPM while for keyboard is 27.66 WPM, \
      which is almost 1.6 times as large, indicating a much larger spread/variability.",
      "This could be attributed to the consistency of my accuracy in keyboard typing tests. The faster I type, the more likely I will be making mistakes, and the WPM calculation only counts the words that I have typed correctly.",
      "It looks like there are two outliers in the 105-110 WPM bin and 125-130 WPM bin on the mobile WPM dataset while there are no clear outliers in the keyboard WPM dataset by solely inspecting the histogram.",
    ],
  };

  const boxText = {
    title: "Box and Whisker Plot Analysis",
    overview: [
      "From the Box and Whisker plot, we observe a similar trend as the histogram, but losing the information about shape and peaks.",
      "However, we can clearly see that there is one outlier at 126.36 WPM on the mobile WPM dataset as the Box and Whisker plot marks outliers. \
      On the other hand, there are no outliers for the Keyboard WPM dataset.",
      "We can discover further insights and comparison by taking a look at the 5 number summary of both datasets (plus the mean).",
    ],
    keyObservations: [
      "We can confirm our estimation of the symmetrical shape from the histogram. \
      The mean (122.06 WPM) and median (125.29 WPM) of the keyboard WPM datasets are very close considering that the data spans from 56.73 WPM to 170.42 WPM. \
      This is a similar case for the mobile WPM dataset with its median at 78.39 WPM and mean at 77.91 WPM while the dataset spans from 48.47 WPM to 126.36 WPM.",
      "We can also observe the larger spread/variability of the keyboard dataset by comparing the IQR of both datasets, which is much better displayed in a Box and Whisker Plot. \
      For the mobile dataset, the IQR sits at 23.65 WPM, meaning 50% of the data is within 23.65 WPM of each other while the keyboard dataset's IQR sits at 36.95 WPM or 50% of \
      the data is within 36.95 WPM of each other, more than 13 WPM larger, again, displaying a larger spread/variability in the keyboard dataset.",
      "The difference between median of both datasets is also around 47 WPM with the keyboard WPM leading at 125.29 WPM.",
      "Each individual 5 number statistic value of the keyboard WPM dataset is greater than the mobile WPM dataset.",
      "However, the min of the keyboard WPM is very close to the mobile WPM, \
      only around 8 WPM apart while their max differs by around 44 WPM with the keyboard WPM leading at 170.42 WPM.",
      "This confirms our observation of a greater variability in the keyboard WPM dataset compared to the mobile WPM dataset as stated in the Histogram analysis.",
      "We also see that nearly 75% of keyboard WPM is greater than any data points in the mobile WPM dataset: the q1 of the keyboard WPM dataset is 102.91 WPM, nearly as much as the max of the mobile dataset (126.36 WPM). \
      Combined with the information from the Histogram, we know that there are only 2 data points from the mobile WPM dataset that are greater than the q1 of the keyboard dataset.",
    ],
  };

  const stemText = {
    title: "Stem and Leaf Plot Analysis",
    overview: [
      "The Stem and Leaf Plot is similar to a histogram in terms of the information that it displays. But unlike histogram, where we can only see the number of observations that fall within the range of the bin, \
      the Stem and Leaf Plot allows us to see each individual observation.",
      "Furthermore, due to the 'back to back' structure of Stem and Leaf Plots, we can see each bin of each dataset being properly aligned to the corresponding bin \
      of the other dataset, making for an easier comparison.",
    ],
    keyObservations: [
      "We can clearly see that the single peak in the keyboard dataset at the 120-125 WPM aligns with the max/outlier of the mobile dataset along with the specific values",
      "Most information from the Stem and Leaf Plot has already been covered by the histogram, but it is much clearer to observe on the Stem and Leaf Plot along with the \
      specific values of the observation ",
    ],
  };

  const concludingRemarks = {
    title: "Concluding Remarks",
    overview: [
      "Overall, the comparison of the datasets was interesting. I did not think there would be such a huge difference in terms of spread/variability with the keyboard dataset's \
      standard deviation being much larger than that of the mobile dataset's (27.66 WPM for keyboard vs 16.88 WPM for mobile). I did expect the mobile typing speeds to be generally slower \
      than keyboard, but was surprised to see that mobile typing speeds are able to get pretty fast in edge cases (such as the max/outlier in mobile sitting at 126.36 WPM).",
      "After seeing quite a few observations (14/67 or 20.89%) below the 100 WPM mark, I looked back at the full results of those typing tests and discovered that the accuracy of all those tests \
      are below 90%, confirming the hypothesis that I had earlier.",
      "Based on the data, I prefer both the Box and Whisker Plot and Stem and Leaf Plot for making analysis in comparing the datasets. Both types of graphs can be easily stacked \
      on top of each other or side by side, making for direct and easy comparisons regardless of the value you are comparing. Although we chose mean as the center of measure and \
      can be easily determined/estimated in the Stem and Leaf Plot but not the Box and Whisker Plot, the Box and Whisker Plot still provides the advantage of splitting data into \
      quartiles, allowing me to make the observation that nearly 75% of keyboard WPMs are greater than all mobile WPMs. This observation is difficult to see in a Stem and Leaf Plot. \
      Compared to the histogram, a Stem and Leaf plot simply provides more specific information and allows for easier comparison. And since my dataset is not overwhelmingly large \
      (67 samples for each dataset), a Stem and Leaf Plot is still feasible without taking up extremely large vertical or horizontal space and thus to me is preferable over the Histogram.",
    ],
  };
  return (
    <>
      <TextSummary
        title={overviewText.title}
        overview={overviewText.overview}
        keyObservations={[]}
        mobileData={[]}
        keyboardData={[]}
        extraText={[
          `I wrote the website using <a href="https://reactjs.org" target="_blank">ReactJS</a>, the full source code is available at my \
        <a href="https://github.com/andyw-0612/ap-stats-project1" target="_blank" rel="noopener noreferrer">GitHub</a>`,
        ]}
      />
      <StatisticalSummary
        title="Statistical Summary"
        mobileData={mobileData}
        keyboardData={keyboardData}
      />
      <Histo />
      <TextSummary
        title={histoText.title}
        overview={histoText.overview}
        keyObservations={histoText.keyObservations}
        mobileData={[]}
        keyboardData={[]}
      />
      <Box />
      <TextSummary
        title={boxText.title}
        overview={boxText.overview}
        keyObservations={boxText.keyObservations}
        mobileData={mobileData}
        keyboardData={keyboardData}
      />
      <StemLeaf />
      <TextSummary
        title={stemText.title}
        overview={stemText.overview}
        keyObservations={stemText.keyObservations}
        mobileData={[]}
        keyboardData={[]}
      />
      <TextSummary
        title={concludingRemarks.title}
        overview={concludingRemarks.overview}
        keyObservations={[]}
        mobileData={[]}
        keyboardData={[]}
        overviewTitle={false}
      />
    </>
  );
}

export default App;
