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

const survey : String[][] = [[],[],[],[],[],[]]
const counters : Map<String,number>[] = []

const organizeArray = (results:any) => {
  for (var i = 0; i < results.length; i++)
  {
    
    const result = results[i];

    if (result.responses instanceof Array)
    {
      for (var j = 0; j < result.responses.length; j++)
      {
        const answerObject = result.responses[j]
        survey[j].push(answerObject[Object.keys(answerObject)[0]]);
      }
    }
  }
}
//
//
// assuming that there is one answer per question (not an array)
//
//

const partitionIntoMaps = () =>
{
  for (var i = 0; i < survey.length; i++)
  {
    const numberedArray = survey[i];
    for (var j = 0; j < survey.length; j++)
    {
      
        let prevCount = counters[i].get(numberedArray[j])
        if (!prevCount)
        {
          prevCount = 0
        }
        counters[i].set(numberedArray[j], prevCount+1)
    }
  }
}

const mapsToArrays = () =>
{
  
}






const ViewResultsPage: React.FC<Props> = (props) => {
  return (
    <div>
      {employeeQuery.isLoading && <div>Loading...</div>}
      {employeeQuery.data && TableBody(employeeQuery.data as any)}
    </div>
  );
};

export default ViewResultsPage;
