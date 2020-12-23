import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SurveyTabs from '../components/SurveyTabs';
import '../styles/manage_survey.css';

interface Props {}

interface Params {
  tab?: string;
}
const ManageSurvey: React.FC<Props> = () => {
  let { tab } = useParams<Params>();
  const history = useHistory();

  if (!tab) tab = 'manage';

  return <SurveyTabs defaultTab={tab} history={history} />;
};

export default ManageSurvey;
