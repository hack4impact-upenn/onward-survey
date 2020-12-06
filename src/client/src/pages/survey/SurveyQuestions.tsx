import React from 'react';
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

const initialValues = {
  1: '',
  2: '',
  3: '',
  4: '',
};

const SurveyQuestions = () => {
  const history = useHistory();
  const [submitResponseMutate] = useMutation(submit);
  const { surveyId } = useParams<ParamTypes>();

  const convertToArrayOfQuestions = (values: ISurveyAnswers) => {
    var responses = [];
    const numQuestions = Object.keys(values).length;

    for (var i = 1; i <= numQuestions; i++) {
      const obj = { ['q' + i]: values[i] };
      responses.push(obj);
    }
    return responses;
  };

  const handleSubmit = async (values: ISurveyAnswers) => {
    var responses = convertToArrayOfQuestions(values);

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
            <SurveyAnswersScale />
          </QuestionContainer>

          <QuestionContainer>
            <SurveyQuestionTextbox
              name="2. "
              question="How often do you worry about your financial situation?"
            />
            <div>
              <SurveyQuestionAnswer potentialAnswer=" Never" />
              <SurveyQuestionAnswer potentialAnswer=" Almost never - a few times a year" />
              <SurveyQuestionAnswer potentialAnswer=" Sometimes - 1-2 times a month" />
              <SurveyQuestionAnswer potentialAnswer=" Frequently - at least weekly" />
              <SurveyQuestionAnswer potentialAnswer=" Almost always - almost everyday, or every day" />
            </div>
          </QuestionContainer>

          <QuestionContainer>
            <SurveyQuestionTextbox
              name="3. "
              question="How would you handle an unexpected $400 expense? (select all that apply)"
            />
            <div>
              <SurveyQuestionAnswer potentialAnswer=" Pay with cash or credit card paid in full" />
              <SurveyQuestionAnswer potentialAnswer=" Credit card and pay it off over time" />
              <SurveyQuestionAnswer potentialAnswer=" Money from bank loan" />
              <SurveyQuestionAnswer potentialAnswer=" Use payday loan/overdraft" />
              <SurveyQuestionAnswer potentialAnswer=" Sell something" />
              <SurveyQuestionAnswer potentialAnswer=" Ask for salary advance or loan from workplace" />
              <SurveyQuestionAnswer potentialAnswer=" Other" />
              <SurveyQuestionAnswer potentialAnswer=" Would not be able to pay" />
            </div>
          </QuestionContainer>

          <QuestionContainer>
            <SurveyQuestionTextbox
              name="4. "
              question="What type(s) of financial hardship have you experienced in the past 6 months? (select all that apply)"
            />
            <div>
              <SurveyQuestionAnswer potentialAnswer=" Did not pay full rent/mortgage" />
              <SurveyQuestionAnswer potentialAnswer=" Skipped paying a bill or paid late" />
              <SurveyQuestionAnswer potentialAnswer=" Skipped essential medical care due to cost" />
              <SurveyQuestionAnswer potentialAnswer=" Could not afford food" />
              <SurveyQuestionAnswer potentialAnswer=" Had credit declined" />
              <SurveyQuestionAnswer potentialAnswer=" Overdraft a bank account" />
              <SurveyQuestionAnswer potentialAnswer=" Borrowed from a payday lender/pawn shop/car title lender" />
            </div>
          </QuestionContainer>

          <QuestionContainer>
            <SurveyQuestionTextbox
              name="5. "
              question="What kinds of financial help would you use, if it were offered to you by __EMPLOYER NAME___? (select all that apply)"
            />
            <div>
              <SurveyQuestionAnswer potentialAnswer=" A free savings account" />
              <SurveyQuestionAnswer potentialAnswer=" Short financial tips" />
              <SurveyQuestionAnswer potentialAnswer=" Articles about how to more effectively save" />
              <SurveyQuestionAnswer potentialAnswer=" Personalized, 1:1 financial coaching" />
              <SurveyQuestionAnswer potentialAnswer=" Loans" />
              <SurveyQuestionAnswer potentialAnswer=" Pay advances" />
              <SurveyQuestionAnswer potentialAnswer=" Other" />
            </div>
          </QuestionContainer>

          <QuestionContainer>
            <SurveyQuestionTextbox
              name="6. "
              question="What are your top financial concerns?"
            />
            <div>
              <SurveyQuestionAnswer potentialAnswer=" Having enough emergency savings" />
              <SurveyQuestionAnswer potentialAnswer=" Meeting monthly expenses" />
              <SurveyQuestionAnswer potentialAnswer=" Paying off debt" />
              <SurveyQuestionAnswer potentialAnswer=" Being able to retire/retire on time" />
              <SurveyQuestionAnswer potentialAnswer=" Other" />
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
