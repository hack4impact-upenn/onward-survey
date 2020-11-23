import { Field } from 'formik';
import React from 'react';

const SurveyQuestionTextbox = (props: any) => {
  return (
    <div>
      <br />
      <p>
        {' '}
        {props.name} 
        <strong>{props.question}</strong> 
        {props.subtext && <><br/> &nbsp;&nbsp;&nbsp;&nbsp; {props.subtext}</> }
        {' '}
      </p>
      <br />
    </div>
  );
};

export default SurveyQuestionTextbox;
