import { Field } from 'formik';
import React from 'react';
import label from 'styled-components';


const SurveyQuestionAnswer = (props: any) => {
  return (
    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;
       <label className="checkbox">
          <input type="checkbox"/>
          {props.potentialAnswer}
        </label>
    </div>
  );
};

export default SurveyQuestionAnswer;
