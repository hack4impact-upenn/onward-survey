import { Field } from 'formik';
import React from 'react';
import label from 'styled-components';


const SurveyAnswersScale = (props: any) => {
  return (
    <div>
                &nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;
            Not stable at all &nbsp;
            <label className="radio">
              <p>1</p><br/>
              <input type="radio" name="answer"/>
            </label>&nbsp;

            <label className="radio">
              <p>2</p><br/>
              <input type="radio" name="answer"/>
            </label>&nbsp;

            <label className="radio">
              <p>3</p><br/>
              <input type="radio" name="answer"/>
            </label>&nbsp;

            <label className="radio">
              <p>4</p><br/>
              <input type="radio" name="answer"/>
            </label>&nbsp;

            <label className="radio">
              <p>5</p><br/>
              <input type="radio" name="answer"/>
            </label>&nbsp;

            <label className="radio">
              <p>6</p><br/>
              <input type="radio" name="answer"/>
            </label>&nbsp;

            <label className="radio">
              <p>7</p><br/>
              <input type="radio" name="answer"/>
            </label>&nbsp;

            <label className="radio">
              <p>8</p><br/>
              <input type="radio" name="answer"/>
            </label>&nbsp;

            <label className="radio">
              <p>9</p><br/>
              <input type="radio" name="answer"/>
            </label>&nbsp;

            <label className="radio">
              <p>10</p><br/>
              <input type="radio" name="answer"/>
            </label>&nbsp;
            Totally stable &nbsp;
    </div>
  );
};

export default SurveyAnswersScale;
