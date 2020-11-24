import React from 'react';

const SurveyQuestionTextbox = (props: any) => {
  return (
    <div
      style={{
        width: '60%',
        textAlign: 'center',
        padding: '20px 0px',
      }}
    >
      <h4 className="title is-4">
        {' '}
        {props.name} {props.question}
      </h4>
      {props.subtext} <br />
    </div>
  );
};

export default SurveyQuestionTextbox;
