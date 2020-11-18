import React from 'react';
import auth from '../utils/auth';
import { fetchData } from '../api/userApi';
import { useQuery } from 'react-query';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

interface Props {}

const ViewResultsPage = () => {
const employeeQuery = useQuery(
  ['fetchData', { accessToken: auth.getAccessToken() }],
  fetchData,
  {
    refetchOnWindowFocus: false,
  }
);

const map1 = new Map<String, number>([
  ['1', 0],
  ['2', 0],
  ['3', 0],
  ['4', 0],
  ['5', 0],
  ['6', 0],
  ['7', 0],
  ['8', 0],
  ['9', 0],
  ['10', 0],
]);
const map2 = new Map<String, number>([
  ['A', 0],
  ['B', 0],
  ['C', 0],
  ['D', 0],
  ['E', 0],
]);
const map3 = new Map<String, number>([
  ['A', 0],
  ['B', 0],
  ['C', 0],
  ['D', 0],
  ['E', 0],
  ['F', 0],
  ['G', 0],
  ['H', 0],
  ['I', 0],
]);
const map4 = new Map<String, number>([
  ['A', 0],
  ['B', 0],
  ['C', 0],
  ['D', 0],
  ['E', 0],
  ['F', 0],
  ['G', 0],
]);
const map5 = new Map<String, number>([
  ['A', 0],
  ['B', 0],
  ['C', 0],
  ['D', 0],
  ['E', 0],
  ['F', 0],
  ['G', 0],
]);
const map6 = new Map<String, number>([
  ['A', 0],
  ['B', 0],
  ['C', 0],
  ['D', 0],
  ['E', 0],
]);

const survey: String[][] = [[], [], [], [], [], []];
const counters: Map<number, Map<String, number>> = new Map([
  [1, map1],
  [2, map2],
  [3, map3],
  [4, map4],
  [5, map5],
  [6, map6],
]);
const finalData: Object[][] = [[], [], [], [], [], []];

const organizeArray = (results: any) => {
  for (var i = 0; i < results.length; i++) {
    const result = results[i];

    if (result.responses instanceof Array) {
      for (var j = 0; j < result.responses.length; j++) {
        const answerObject = result.responses[j];
        survey[j].push(answerObject[Object.keys(answerObject)[0]]);
      }
    }
  }
};
//
//
// assuming that there is one answer per question (not an array)
//
//

const partitionIntoMaps = () => {
  for (var i = 0; i < survey.length; i++) {
    const numberedArray = survey[i];
    for (var j = 0; j < survey.length; j++) {
      if (counters.has(j)) {
        let surveyMap = counters.get(j) ?? new Map();
        const surveyMapAnswer = surveyMap.get(numberedArray[j]) ?? -1;
        surveyMap.set(numberedArray[j], surveyMapAnswer + 1);
      }
    }
  }
};

const mapsToArrays = () => {
  for (var i = 0; i < finalData.length; i++) {
    const surveyMap: Map<String, number> =
      counters.get(i) ?? new Map<String, number>();
    surveyMap.forEach((value, key) => {
      var jsonObject: any = {};
      jsonObject.x = key;
      jsonObject.y = value;
      finalData[i].push(jsonObject);
    });
  }
};

const createFinalData = (results: any) => {
  organizeArray(results);
  partitionIntoMaps();
  mapsToArrays();
  return finalData;
};

const MyTable = (res: Object[]) => {
  const data = createFinalData(res);
  console.log(data);
  //const data = res;
  return (
    <VictoryChart
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      domainPadding={20}
    >
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickValues={[1, 2, 3, 4]}
        tickFormat={['1', '2', '3', '4']}
      />
      {/* <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={(x) => (`$${x / 1000}k`)}
      /> */}
      <VictoryBar data={data[0]} x="Answers" y="Number of responses" />
    </VictoryChart>
  );
};


  return (
    <div>
      {employeeQuery.isLoading && <div>Loading...</div>}
      {employeeQuery.data &&
        MyTable(employeeQuery.data as any)}
    </div>
  );
}

export default ViewResultsPage;
