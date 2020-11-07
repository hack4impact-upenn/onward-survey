import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';


const SurveyQuestionTextbox = (props: any) => {
  return (
    <div>
        <br />
            <p> {props.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit? </p>
        <br />
            <Field 
                name={props.name} className="input" type="text" placeholder="Type Response Here">
            </Field>
        <br />
    </div>
  );
};

export default SurveyQuestionTextbox;