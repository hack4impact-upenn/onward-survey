import React from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchSurveyStatus } from '../../api/employeeResponseApi';
import { fetchMe } from '../../api/userApi';

const ContentContainer = styled.div`
  margin: 10vh auto;
  width: 80vw;
`;
const ButtonGroup = styled.div`
  margin: 40px auto 0px;
`;

const Button = styled.button`
  width: 40%;
  min-width: 90px;
  margin: 0px 20px 10px auto;
`;

interface MySurveyLinkResponse extends IAPIResponse {
  data: {
    _id: string;
    employer: string;
    employerName: string;
    completed: boolean;
  };
}

interface ParamTypes {
  surveyId: string;
}

const Welcome = () => {
  const history = useHistory();
  const { surveyId } = useParams<ParamTypes>();

  const surveyCompletedQuery = useQuery(
    ['fetchSurveyStatus', surveyId],
    fetchSurveyStatus,
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  const SurveyIntro = (res: MySurveyLinkResponse) => {
    const { data: myProfile } = res;
    if (!myProfile.completed) {
      return (
        <div className="column has-text-left is-one-third">
          <h1 className="title is-3"> Onward Financial Survey </h1>
          <p>
            Your employer, <b>{myProfile.employerName}</b>, has requested that
            you fill out this anonymous survey to learn more about the company's
            financial status.
          </p>
          <br />
          <p>
            Your responses to this survey will be kept anonymous, and your
            employer will not be able to view any individual data - only the
            company statistics as a whole.
          </p>
          <ButtonGroup>
            <Button
              className="button is-secondary is-light"
              onClick={() => history.back()}
            >
              Learn More
            </Button>
            <Button
              className="button is-primary"
              onClick={() =>
                history.push(
                  `/survey/${myProfile.employerName}/${myProfile._id}/questions`
                )
              }
            >
              Get Started
            </Button>
          </ButtonGroup>
        </div>
      );
    } else {
      return (
        <div className="column has-text-left is-one-third">
          <h1 className="title is-3"> Onward Financial Survey </h1>
          <p>Survey is expired.</p>
        </div>
      );
    }
  };

  return (
    <ContentContainer>
      <div className="columns is-mobile is-centered is-vcentered">
        <div className="column is-one-third">
          <img src="../../images/standing-3@2x.png" alt="Standing Person" />
        </div>
        {surveyCompletedQuery.isLoading && <div>Loading...</div>}
        {surveyCompletedQuery.data &&
          SurveyIntro(surveyCompletedQuery.data as any)}
        {surveyCompletedQuery.error && (
          <div>!!!{surveyCompletedQuery.error.message}</div>
        )}
      </div>
    </ContentContainer>
  );
};

export default Welcome;
