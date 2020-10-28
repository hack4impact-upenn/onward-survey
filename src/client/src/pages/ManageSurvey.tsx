import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ManageSurveyTable from '../components/Table';

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

const ManageSurvey = () => {
  return (
    <ContentContainer>
        
          <div className="field">
              <div className="control">
                <EmailInput className="input" type="text" placeholder="Enter In Email"></EmailInput>
              </div>
            </div>
            <Button className="button is-primary fa-align-right">Add Email</Button>
        
        
            <ManageSurveyTable></ManageSurveyTable>
        
    </ContentContainer>
  );
};

export default ManageSurvey;
