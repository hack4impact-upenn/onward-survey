import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ManageSurveyTable from '../components/Table';
import AddEmailField from '../components/AddEmailField';

const ContentContainer = styled.div`
  text-align: center;
  margin: 10vh auto;
  width: 896px;
`;

const ButtonGroup = styled.div`
  margin: 20px;
`;

const Button = styled.button`
  width: 140px;
  height: 50px;
`;
  
const EmailInput = styled.input`
  width: 750px;
  height: 50px;
`;

const EmployerName = styled.b`
  font-weight: 800;
  line-height: 44px;
`;

const ToggleViewGroup = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  width: 280px;
`;

const ToggleViewText = styled.p`
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

const ManageSurvey = () => {
  return (
    //<AddEmailField></AddEmailField>
    <ContentContainer>
          <div className="columns">
            <div className="column is-two-fifths">
              <h1 className="title has-text-left">Welcome Back, <EmployerName>Employer Name</EmployerName>!</h1>
            </div>
          </div>
          <ToggleViewGroup className="columns is-gapless">
            <div className="column is-one-half">
              <ToggleViewText className="has-text-left">View Results</ToggleViewText>
            </div>
            <div className="column is-one-half">
              <ToggleViewText className="has-text-left">Manage Survey</ToggleViewText>
            </div>
          </ToggleViewGroup>
          <ManageSurveyTable></ManageSurveyTable>
          <SurveyButtonGroup>
              <SendOutButton className="button is-primary is-pulled-right is-large">Send Out Survey</SendOutButton>
          </SurveyButtonGroup>
    </ContentContainer>
  );
};

export default ManageSurvey;
