import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';

const TabsContainer = styled.div`
    padding-bottom: 34px;
    font-family: 'Montserrat';
    font-weight: 700;
`;

interface Props {}
const SurveyTabs: React.FC<Props> = (props) => {
    return(
        <TabsContainer className="tabs is-large">
            <ul>
                <li className="is-active"><a>Manage Survey</a></li>
                <li><a>View Results</a></li>
            </ul>
        </TabsContainer>
    )
}

export default SurveyTabs;
   
