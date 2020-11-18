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

const ViewResultsPage: React.FC<Props> = (props) => {
  return (
    <div>
      {employeeQuery.isLoading && <div>Loading...</div>}
      {employeeQuery.data && TableBody(employeeQuery.data as any)}
    </div>
  );
};

export default ViewResultsPage;
