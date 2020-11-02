import React, { useState } from "react";
import styled from 'styled-components';
import AddEmailField from '../components/AddEmailField';
import ManageSurveyTable from '../components/Table';
import SurveyTabs from '../components/ToggleTabs';
import ManageSurveyTab from '../components/ManageSurveyTab';
import '../styles/manage_survey.css';

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

const ManageSurvey = () => {
  const [tab, setTab] = useState("");

  return (
    <ContentContainer>
      <div className="columns">
        <div className="column is-two-fifths">
          <WelcomeText className="title has-text-left">
            Welcome Back, <EmployerName>Employer Name</EmployerName>!
          </WelcomeText>
        </div>
      </div>
      <SurveyTabs>
        //implement tab switching
      </SurveyTabs>
      
    </ContentContainer>
  );
};

export default ManageSurvey;
