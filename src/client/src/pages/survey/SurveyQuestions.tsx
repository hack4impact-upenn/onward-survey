import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { submit } from '../../api/employeeResponseApi';
import { useMutation } from 'react-query';
import { Formik, Form } from 'formik';
import SurveyQuestionTextbox from '../../components/SurveyQuestionTextbox';
import SurveyQuestionAnswer from '../../components/SurveyQuestionAnswer';
import SurveyAnswersScale from '../../components/SurveyAnswersScale';

const ContentContainer = styled.div`
  margin: 10vh auto;
  width: 80vw;
`;

const Button = styled.button`
  width: 200px;
`;

const QuestionContainer = styled.div`
  width: 100%;
  height: 70vh;
  background-color: #ecf0f1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  margin: 20px 0px;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5vh;
`;

interface ParamTypes {
  surveyId: string;
}

const initialValues: ISurveyAnswers = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: ''
};

const SurveyQuestions = () => {
  const history = useHistory();
  const [submitResponseMutate] = useMutation(submit);
  const { surveyId } = useParams<ParamTypes>();
  const [values, setState] = useState(initialValues);

  const handleFormSelection = (event : any, question_number: number, new_value: string) => {
    // console.log(event.target.checked);
    // console.log(question_number);
    // console.log(`${new_value}`);
    values[question_number] = new_value;
    setState(values);
    // console.log(values);
  }

  const convertToArrayOfQuestions = (values: ISurveyAnswers) => {
    var responses = [];
    const numQuestions = Object.keys(values).length;

    for (var i = 1; i <= numQuestions; i++) {
      const obj = { ['q' + i]: values[i] };
      // console.log(`value ${i} is ${values[i]}`);
      responses.push(obj);
    }
    return responses;
  };

  const handleSubmit = async (values: ISurveyAnswers) => {
    const numQuestions = Object.keys(values).length;
    
    var responses = convertToArrayOfQuestions(values);

    for (var i = 1; i <= numQuestions; i++) {
      values
      if (values[i] === "") {
        alert(`Please select an option for each question.`);
        console.log(values[i]);
        return;
      }
    }
    console.log(responses);
    
    const employeeResponse: ISurveyResponse = {
      surveyId: surveyId,
      responses: responses,
    };
    try {
      await submitResponseMutate(employeeResponse);
      alert('Success');
      history.push(`/survey/${surveyId}/nextsteps`);
    } catch (error) {
      alert(`Error: ${error.response.data}`);
    }
  };

  return (
    <ContentContainer>
      <h1 className="title is-3 is-spaced">Onward Financial Survey</h1>
      <h2 className="subtitle is-6">Please complete the survey below.</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <QuestionContainer>
            <SurveyQuestionTextbox
              name="1. "
              question="On a scale of 1-10 how would you rate your financial stability?"
              subtext="1 = not at all stable 5 = more or less stable 10 = totally stable"
            />
            <SurveyAnswersScale questionNumber={1} onChange={handleFormSelection} />
          </QuestionContainer>

          <QuestionContainer>
            <SurveyQuestionTextbox
              name="2. "
              question="How often do you worry about your financial situation?"
            />
            <div>
              <SurveyQuestionAnswer questionNumber={2} potentialAnswer=" Never" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={2} potentialAnswer=" Almost never - a few times a year" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={2} potentialAnswer=" Sometimes - 1-2 times a month" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={2} potentialAnswer=" Frequently - at least weekly" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={2} potentialAnswer=" Almost always - almost everyday, or every day" onChange={handleFormSelection} />
            </div>
          </QuestionContainer>

          <QuestionContainer>
            <SurveyQuestionTextbox
              name="3. "
              question="How would you handle an unexpected $400 expense? (select all that apply)"
            />
            <div>
              <SurveyQuestionAnswer questionNumber={3} potentialAnswer=" Pay with cash or credit card paid in full" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={3} potentialAnswer=" Credit card and pay it off over time" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={3} potentialAnswer=" Money from bank loan" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={3} potentialAnswer=" Use payday loan/overdraft" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={3} potentialAnswer=" Sell something" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={3} potentialAnswer=" Ask for salary advance or loan from workplace" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={3} potentialAnswer=" Other" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={3} potentialAnswer=" Would not be able to pay" onChange={handleFormSelection} />
            </div>
          </QuestionContainer>

          <QuestionContainer>
            <SurveyQuestionTextbox
              name="4. "
              question="What type(s) of financial hardship have you experienced in the past 6 months? (select all that apply)"
            />
            <div>
              <SurveyQuestionAnswer questionNumber={4} potentialAnswer=" Did not pay full rent/mortgage" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={4} potentialAnswer=" Skipped paying a bill or paid late" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={4} potentialAnswer=" Skipped essential medical care due to cost" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={4} potentialAnswer=" Could not afford food" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={4} potentialAnswer=" Had credit declined" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={4} potentialAnswer=" Overdraft a bank account" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={4} potentialAnswer=" Borrowed from a payday lender/pawn shop/car title lender" onChange={handleFormSelection} />
            </div>
          </QuestionContainer>

          <QuestionContainer>
            <SurveyQuestionTextbox
              name="5. "
              question="What kinds of financial help would you use, if it were offered to you by __EMPLOYER NAME___? (select all that apply)"
            />
            <div>
              <SurveyQuestionAnswer questionNumber={5} potentialAnswer=" A free savings account" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={5} potentialAnswer=" Short financial tips" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={5} potentialAnswer=" Articles about how to more effectively save" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={5} potentialAnswer=" Personalized, 1:1 financial coaching" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={5} potentialAnswer=" Loans" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={5} potentialAnswer=" Pay advances" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={5} potentialAnswer=" Other" onChange={handleFormSelection} />
            </div>
          </QuestionContainer>

          <QuestionContainer>
            <SurveyQuestionTextbox
              name="6. "
              question="What are your top financial concerns?"
            />
            <div>
              <SurveyQuestionAnswer questionNumber={6} potentialAnswer=" Having enough emergency savings" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={6} potentialAnswer=" Meeting monthly expenses" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={6} potentialAnswer=" Paying off debt" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={6} potentialAnswer=" Being able to retire/retire on time" onChange={handleFormSelection} />
              <SurveyQuestionAnswer questionNumber={6} potentialAnswer=" Other" onChange={handleFormSelection} />
            </div>
          </QuestionContainer>

          <ButtonContainer>
            <Button className="button is-primary" type="submit">
              Submit
            </Button>
          </ButtonContainer>
        </Form>
      </Formik>
    </ContentContainer>
  );
};

export default SurveyQuestions;
