import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Table from '../components/Table';

const ContentContainer = styled.div`
  text-align: center;
  margin: 10vh auto;
  width: 80vw;
`;

const ButtonGroup = styled.div`
  margin: 20px;
`;

const Button = styled.button`
  margin: 5px;
`;

const ManageSurvey = () => {
  const history = useHistory();

  return (
    <ContentContainer>
    </ContentContainer>
  );
};

export default ManageSurvey;
