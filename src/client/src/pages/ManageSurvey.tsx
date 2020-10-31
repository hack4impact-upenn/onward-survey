import React from 'react';
import styled from 'styled-components';
import AddEmailField from '../components/AddEmailField';
import ManageSurveyTable from '../components/Table';
import SurveyTabs from '../components/ToggleTabs';
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

const SurveyButtonGroup = styled.form`
  margin-top: 40px;
  padding-bottom: 94px;
  height: 100px;
`;

const SendOutButton = styled.div`
  font-weight: 700;
  font-size: 24px;
  width: 200px;
  height: 60px;
  background: #00d898;
`;

const WelcomeText = styled.h1`
  width: 315px;
`;

const ManageSurvey = () => {
  return (
    <ContentContainer>
      <div className="columns">
        <div className="column is-two-fifths">
          <WelcomeText className="title has-text-left">
            Welcome Back, <EmployerName>Employer Name</EmployerName>!
          </WelcomeText>
        </div>
      </div>
      <SurveyTabs></SurveyTabs>

      <AddEmailField></AddEmailField>
      <ManageSurveyTable></ManageSurveyTable>
      <SurveyButtonGroup>
        <SendOutButton className="button is-primary is-pulled-right">
          Send Out Survey
        </SendOutButton>
      </SurveyButtonGroup>
    </ContentContainer>
  );
};

export default ManageSurvey;
