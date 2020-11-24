import React from 'react';

const SurveyQuestionAnswer = (props: any) => {
  return (
    <div>
      <label className="checkbox">
        <input type="checkbox" />
        {props.potentialAnswer}
      </label>
    </div>
  );
};

export default SurveyQuestionAnswer;
