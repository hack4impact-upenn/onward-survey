import React, {ReactElement, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';
import PropTypes from 'prop-types';
import { thru } from 'lodash';
import ManageSurveyTab from '../components/ManageSurveyTab';
import ViewResultsTab from '../components/ViewResultsTab';

const ContentContainer = styled.div`
  text-align: center;
  margin: 6vh auto;
  width: 896px;
  font-family: 'Montserrat';
  font-weight: 400px;
`;

const EmployerName = styled.b`
  font-family: 'Montserrat';
  font-weight: bold;
  line-height: 44px;
`;

const WelcomeText = styled.h1`
  width: 315px;
`;

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

class SurveyTabs extends React.Component<{}, {tabClicked: number}> {

    constructor(props:any){
        super(props);
        this.state = {tabClicked : 2};
    }
    
    clickTab1(){
        this.setState({
            tabClicked: 1
        });
    }

    clickTab2(){
        this.setState({
            tabClicked: 2
        });
    }

    render(){
        
        return(
            <ContentContainer>
                <div className="columns">
                    <div className="column is-two-fifths">
                    <WelcomeText className="title has-text-left">
                        Welcome Back, <EmployerName>Employer Name</EmployerName>!
                    </WelcomeText>
                    </div>
                </div>
                <TabsContainer className="tabs is-large">
                    <ul>
                        <Tab>
                        <a
                        onClick =  {() => {
                            this.clickTab1();
                        }}>
                            View Results
                        </a>
                        </Tab>
                        <Tab className="is-active">
                        <a
                            onClick =  {() => {
                            this.clickTab2();
                            }}>
                            Manage Survey
                        </a>
                        </Tab>
                    </ul>
                </TabsContainer>
                <div>
                    {(this.state.tabClicked == 1) && (
                        <ViewResultsTab></ViewResultsTab>
                    )}

                    {(this.state.tabClicked == 2) && (
                        <ManageSurveyTab></ManageSurveyTab>
                    )}
                </div>
            </ContentContainer>
        )
    }
}

export default SurveyTabs;
   
