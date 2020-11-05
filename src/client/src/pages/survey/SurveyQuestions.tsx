import React from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { submit } from '../../api/employeeResponseApi';
import { useMutation } from 'react-query';
import { Formik, FormikProps, Form, Field, ErrorMessage, FieldArray } from 'formik';
import auth from '../../api/core/auth';
import { fetchMe } from '../../api/userApi';
import SurveyQuestionTextbox from '../../components/SurveyQuestionTextbox';

const ContentContainer = styled.div`
    margin: 10vh auto;
    width: 80vw;
`;

const Button = styled.button`
    width: 25%;
    float: right
`;

interface ParamTypes {
    employerId: string;
    employeeId: string;
}

interface MyProfileResponse extends IAPIResponse {
    data: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      surveyId: string;
    };
  }

var responses = [
    '',
    '',
    0
];


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

    const profileQuery = useQuery(
        ['fetchMe', { accessToken: auth.getAccessToken() }],
        fetchMe,
        {
          refetchOnWindowFocus: false,
        }
      );

    const getSurveyID = (res: MyProfileResponse) => {
        const { data: myProfile } = res;
        return myProfile.surveyId;
    }

    const convertToArrayOfQuestions = (values: ISurveyAnswers) => {
        var responses = [];
        const numQuestions = Object.keys(values).length;

        for (var i = 1; i <= numQuestions; i++) {
            const obj = {["q"+i]: values[i]};
            responses.push(obj);
        }
        return responses;
    }

    const handleSubmit = async (values: ISurveyAnswers) => {
        var surveyID = getSurveyID(profileQuery.data as any);
        var responses = convertToArrayOfQuestions(values);
        const employeeResponse: ISurveyResponse = {
            surveyId: surveyID,
            responses: responses,
        };
        try {
            await submitResponseMutate(employeeResponse);
            alert('Success');
            history.push('/survey/'+employerId+'/'+employeeId+'/nextsteps');
        } catch (error) {
            alert(`Error: ${error.response.data}`);
        }
    };

    return (
        <ContentContainer>
            <h1 className="title is-3 is-spaced">Onward Financial Survey</h1>
            <h2 className="subtitle is-6">Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque molestie,
                sapien sit amet dapibus dictum, sapien turpis maximus diam,
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
    )    
}

export default SurveyQuestions;