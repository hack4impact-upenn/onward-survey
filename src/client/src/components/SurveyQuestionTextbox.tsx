import React from 'react';
import styled from 'styled-components';

const SurveyQuestionTextbox = (props: any) => {
  return (
    <div>
        <br />
            <p> {props.number} Lorem ipsum dolor sit amet, consectetur adipiscing elit? </p>
        <br />
            <input className="input" type="text" placeholder="Type Response Here"></input>
        <br />
    </div>
      
   
  );
};

export default SurveyQuestionTextbox;