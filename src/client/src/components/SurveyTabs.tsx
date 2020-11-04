import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';
import PropTypes from 'prop-types';

const TabsContainer = styled.div`
    padding-bottom: 25px;
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 18px;
`;

const Tab = styled.li`
    font-size: 16px;
    color: #00AADE;
`;


type Props = {
    tabName: string
  }
const SurveyTabs: React.FC<Props> = (props) => {
    const [selectedTab, setSelectedTab] = useState(0);
    return(
        
        <TabsContainer className="tabs is-large">
            <ul>
                <Tab>
                  <a
                  onClick =  {() => {
                      props.tabName = "View Results";
                      //console.log("Clicked tab: " + clickedTab);
                  }}>
                    View Results
                  </a>
                </Tab>
                <Tab className="is-active">
                  <a
                    onClick =  {() => {
                      props.tabName = "Manage Survey";
                      //console.log("Clicked tab: " + clickedTab);
                    }}>
                    Manage Survey
                  </a>
                </Tab>
            </ul>
        </TabsContainer>
    )
}

export default SurveyTabs;
   
