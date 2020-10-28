import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ManageSurveyTable from '../components/Table';

const ContentContainer = styled.div`
  text-align: center;
  margin: 10vh auto;
  width: 80vh;
`;

const ButtonGroup = styled.div`
  margin: 20px;
`;

const Button = styled.button`
  margin: 5px;
`;

const ManageSurvey = () => {

  return (
    <ContentContainer>
        <ManageSurveyTable></ManageSurveyTable>
    </ContentContainer>
  );
};

export default ManageSurvey;
