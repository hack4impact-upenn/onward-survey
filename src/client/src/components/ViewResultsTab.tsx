import React from 'react';
import auth from '../utils/auth';
import { fetchData } from '../api/userApi';
import { useQuery } from 'react-query';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

interface Props {}

const employeeQuery = useQuery(
  ['fetchData', { accessToken: auth.getAccessToken() }],
  fetchData,
  {
    refetchOnWindowFocus: false,
  }
);

const map1 = new Map()
const map2 = new Map()
const map3 = new Map()
const map4 = new Map()
const map5 = new Map()
const map6 = new Map()

const survey: String[][] = [[], [], [], [], [], []];
const counters: Map<String, number>[] = [map1, map2, map3, map4, map5, map6];
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
      let prevCount = counters[i].get(numberedArray[j]);
      if (!prevCount) {
        prevCount = 0;
      }
      counters[i].set(numberedArray[j], prevCount + 1);
    }
  }
};


const mapsToArrays = () => {
  for (var i = 0; i < finalData.length; i++)
  {
    for (let [key, value] of counters[i])
    {
      const response = 
      const obj = 
    }
  }
};

const ViewResultsPage: React.FC<Props> = (props) => {
  return (
    <div>
      {employeeQuery.isLoading && <div>Loading...</div>}
      {employeeQuery.data && TableBody(employeeQuery.data as any)}
    </div>
  );
};

export default ViewResultsPage;
