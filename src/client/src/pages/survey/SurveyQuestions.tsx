import React from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { submit } from '../../api/employeeResponseApi';
import { useMutation } from 'react-query';
import { Formik, Form } from 'formik';
import SurveyQuestionTextbox from '../../components/SurveyQuestionTextbox';

const ContentContainer = styled.div`
  margin: 10vh auto;
  width: 80vw;
`;

const Button = styled.button`
  width: 25%;
  float: right;
`;

interface ParamTypes {
  employerId: string;
  employeeId: string;
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
  const { employerId, employeeId } = useParams<ParamTypes>();

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
      employeeId: employeeId,
      responses: responses,
    };
    try {
      await submitResponseMutate(employeeResponse);
      alert('Success');
      history.push('/survey/' + employerId + '/' + employeeId + '/nextsteps');
    } catch (error) {
      alert(`Error: ${error.response.data}`);
    }
  };

  return (
    <ContentContainer>
      <h1 className="title is-3 is-spaced">Onward Financial Survey</h1>
      <h2 className="subtitle is-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        molestie, sapien sit amet dapibus dictum, sapien turpis maximus diam,
        pulvinar tempus augue lorem eu nisl.
      </h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <SurveyQuestionTextbox name="1" />
          <SurveyQuestionTextbox name="2" />
          <SurveyQuestionTextbox name="3" />
          <SurveyQuestionTextbox name="4" />
          <br />
          <Button className="button is-primary" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </ContentContainer>
  );
};

export default SurveyQuestions;
