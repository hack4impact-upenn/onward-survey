import React from 'react';

const SurveyQuestionAnswer = (props: any) => {
  return (
    <div>
      <label className="checkbox">
        <input type="checkbox" onChange={(e) => props.onChange(e, props.questionNumber, props.potentialAnswer)} />
        {props.potentialAnswer}
      </label>
    </div>
  );
};

export default SurveyQuestionAnswer;
