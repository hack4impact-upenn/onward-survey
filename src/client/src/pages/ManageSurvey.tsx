import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ManageSurveyTable from '../components/Table';
import AddEmailField from '../components/AddEmailField';
import SurveyTabs from '../components/ToggleTabs';
import '../styles/manage_survey.css'

const ContentContainer = styled.div`
  text-align: center;
  margin: 10vh auto;
  width: 896px;
  font-family: 'Montserrat';
`

const EmployerName = styled.b`
  font-family: 'Montserrat';  
  font-weight: bold;
  line-height: 44px;
`;

const ToggleViewGroup = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  width: 300px;
`;

const ToggleViewText = styled.p`
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 600;
  color: #00AADE;
`;

 const SurveyButtonGroup = styled.form`
  padding-top: 72px;
  padding-bottom: 94px;
  height: 100px;
 `;

const SendOutButton = styled.div`
  font-weight: 700;
  font-size: 24px;
  width: 322px;
  height: 60px;
  background: #00D898;
`;

const WelcomeText = styled.h1`
  width: 315px;
`;

const ManageSurvey = () => {
  return (
    <ContentContainer>
          <div className="columns">
            <div className="column is-two-fifths">
              <WelcomeText className="title has-text-left">Welcome Back, <EmployerName>Employer Name</EmployerName>!</WelcomeText>
            </div>
          </div>
          <SurveyTabs></SurveyTabs>
          
          <AddEmailField></AddEmailField>
          <ManageSurveyTable></ManageSurveyTable>
          <SurveyButtonGroup>
              <SendOutButton className="button is-primary is-pulled-right is-large">Send Out Survey</SendOutButton>
          </SurveyButtonGroup>
    </ContentContainer>
  );
};

export default ManageSurvey;
