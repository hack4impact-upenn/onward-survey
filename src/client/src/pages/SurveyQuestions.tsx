import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import SurveyQuestionTextbox from '../components/SurveyQuestionTextbox';

const ContentContainer = styled.div`
    margin: 10vh auto;
    width: 80vw;
`;

const Button = styled.button`
    width: 25%;
    float: right
`;

const SurveyQuestions = () => {
    return (
        <ContentContainer>
            <h1 className="title is-3 is-spaced">Onward Financial Survey</h1>
            <h2 className="subtitle is-6">Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Quisque molestie, 
                sapien sit amet dapibus dictum, sapien turpis maximus diam, 
                pulvinar tempus augue lorem eu nisl.
            </h2>

            <SurveyQuestionTextbox number="1." />
            <SurveyQuestionTextbox number="2." />
            <SurveyQuestionTextbox number="3." />
            <SurveyQuestionTextbox number="4." />

            <br />
            <Button className="button is-primary"> Submit </Button>
        </ContentContainer>
    )
}

export default SurveyQuestions; 