import React from 'react';
import styled from 'styled-components';
import AddEmailField from '../components/AddEmailField';
import ManageSurveyTable from '../components/Table';
import UploadCSV from '../components/UploadCSV';
//import SurveyTabs from '../SurveyTabs';
import '../styles/manage_survey.css';

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

interface Props {}
const ManageSurveyTab: React.FC<Props> = (props) => {
  return (
    <div>
      <AddEmailField></AddEmailField>
      <UploadCSV></UploadCSV>
      <ManageSurveyTable></ManageSurveyTable>
      <SurveyButtonGroup>
        <SendOutButton className="button is-primary is-pulled-right">
          Send Out Survey
        </SendOutButton>
      </SurveyButtonGroup>
    </div>
  );
};

export default ManageSurveyTab;
