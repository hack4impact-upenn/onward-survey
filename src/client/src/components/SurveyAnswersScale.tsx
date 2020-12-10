import React from 'react';

const SurveyAnswersScale = (props: any) => {
  return (
    <div>
      Not stable at all
      <label className="radio">
        <p>1</p>
        <br />
        <input
          type="radio"
          name="answer"
          onChange={(e) => props.onChange(e, props.questionNumber, '1')}
        />
      </label>
      &nbsp;
      <label className="radio">
        <p>2</p>
        <br />
        <input
          type="radio"
          name="answer"
          onChange={(e) => props.onChange(e, props.questionNumber, '2')}
        />
      </label>
      &nbsp;
      <label className="radio">
        <p>3</p>
        <br />
        <input
          type="radio"
          name="answer"
          onChange={(e) => props.onChange(e, props.questionNumber, '3')}
        />
      </label>
      &nbsp;
      <label className="radio">
        <p>4</p>
        <br />
        <input
          type="radio"
          name="answer"
          onChange={(e) => props.onChange(e, props.questionNumber, '4')}
        />
      </label>
      &nbsp;
      <label className="radio">
        <p>5</p>
        <br />
        <input
          type="radio"
          name="answer"
          onChange={(e) => props.onChange(e, props.questionNumber, '5')}
        />
      </label>
      &nbsp;
      <label className="radio">
        <p>6</p>
        <br />
        <input
          type="radio"
          name="answer"
          onChange={(e) => props.onChange(e, props.questionNumber, '6')}
        />
      </label>
      &nbsp;
      <label className="radio">
        <p>7</p>
        <br />
        <input
          type="radio"
          name="answer"
          onChange={(e) => props.onChange(e, props.questionNumber, '7')}
        />
      </label>
      &nbsp;
      <label className="radio">
        <p>8</p>
        <br />
        <input
          type="radio"
          name="answer"
          onChange={(e) => props.onChange(e, props.questionNumber, '8')}
        />
      </label>
      &nbsp;
      <label className="radio">
        <p>9</p>
        <br />
        <input
          type="radio"
          name="answer"
          onChange={(e) => props.onChange(e, props.questionNumber, '9')}
        />
      </label>
      &nbsp;
      <label className="radio">
        <p>10</p>
        <br />
        <input
          type="radio"
          name="answer"
          onChange={(e) => props.onChange(e, props.questionNumber, '10')}
        />
      </label>
      Totally stable
    </div>
  );
};

export default SurveyAnswersScale;
