import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';

const TabsContainer = styled.div`
    padding-bottom: 34px;
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 18px;
`;

const Tab = styled.li`
    font-size: 18px;
    color: #00AADE;
`;

interface Props {}
const SurveyTabs: React.FC<Props> = (props) => {
    return(
        <TabsContainer className="tabs is-large">
            <ul>
                <Tab><a>View Results</a></Tab>
                <Tab className="is-active"><a>Manage Survey</a></Tab>
            </ul>
        </TabsContainer>
    )
}

export default SurveyTabs;
   
