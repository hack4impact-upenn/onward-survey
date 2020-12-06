import React from 'react';
import styled from 'styled-components';
import AddEmailField from '../components/AddEmailField';
import ManageSurveyTable from '../components/Table';
import UploadCSV from '../components/UploadCSV';
//import SurveyTabs from '../SurveyTabs';
import '../styles/manage_survey.css';
import secureAxios from '../utils/apiClient';
import auth from '../utils/auth';

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

const handleSendAll = () => {
  secureAxios({
    url: '/api/users/sendSurveyUrl',
    method: 'POST',
    timeout: 0,
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`,
      'Content-Type': 'application/json',
    }
  })
    .then(() => alert("Surveys Sent!"))
    .catch((err: Error) => alert(err.message));
};

interface Props {}
const ManageSurveyTab: React.FC<Props> = (props) => {
  return (
    <div>
      <AddEmailField></AddEmailField>
      <UploadCSV></UploadCSV>
      <ManageSurveyTable></ManageSurveyTable>
      <SurveyButtonGroup>
        <SendOutButton className="button is-primary is-pulled-right" onClick={() => handleSendAll()} >
          Send Out Survey
        </SendOutButton>
      </SurveyButtonGroup>
    </div>
  );
};

export default ManageSurveyTab;
