import React, { useState } from "react";
import '../styles/manage_survey.css';
import SurveyTabs from "../components/SurveyTabs";

interface Props {}
const ManageSurvey: React.FC<Props> = (props) => {
  return (
    <SurveyTabs></SurveyTabs>
  );
};

export default ManageSurvey;
