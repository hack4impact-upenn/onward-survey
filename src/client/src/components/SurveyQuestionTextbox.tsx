import { Field } from 'formik';
import React from 'react';

const SurveyQuestionTextbox = (props: any) => {
  return (
    <div>
      <br />
      <p>
        {' '}
        {props.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit?{' '}
      </p>
      <br />
      <Field
        name={props.name}
        className="input"
        type="text"
        placeholder="Type Response Here"
      ></Field>
      <br />
    </div>
  );
};

export default SurveyQuestionTextbox;
