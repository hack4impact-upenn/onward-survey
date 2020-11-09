import React, { useState } from "react";
import styled from 'styled-components';
import AddEmailField from '../components/AddEmailField';
import ManageSurveyTable from '../components/Table';
//import SurveyTabs from '../components/SurveyTabs';
import ManageSurveyTab from '../components/ManageSurveyTab';
import ViewResultsTab from '../components/ViewResultsTab';
import '../styles/manage_survey.css';
import SurveyTabs from "../components/SurveyTabs";

const ContentContainer = styled.div`
  text-align: center;
  margin: 6vh auto;
  width: 896px;
  font-family: 'Montserrat';
  font-weight: 400px;
`;

const EmployerName = styled.b`
  font-family: 'Montserrat';
  font-weight: bold;
  line-height: 44px;
`;

const WelcomeText = styled.h1`
  width: 315px;
`;

const TabsContainer = styled.div`
    padding-bottom: 25px;
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 18px;
`;

const Tab = styled.li`
    font-size: 16px;
    color: #00AADE;
`;

const GetTab = (props: any) => {
  const tabName = props.tabName;
  if (tabName === "Survey Results")
  {
    return <ViewResultsTab></ViewResultsTab>;
  }
  else
  {
    return <ManageSurveyTab></ManageSurveyTab>;
  }
}
interface Props {}
const ManageSurvey: React.FC<Props> = (props) => {
  let clickedTab = "Manage Survey";

  return (
    <SurveyTabs></SurveyTabs>
  );
};

export default ManageSurvey;
