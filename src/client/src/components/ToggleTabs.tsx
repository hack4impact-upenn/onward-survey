import React from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
  padding-bottom: 25px;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 18px;
`;

const Tab = styled.li`
  font-size: 16px;
  color: #00aade;
`;

interface Props {}
const SurveyTabs: React.FC<Props> = (props) => {
  return (
    <TabsContainer className="tabs is-large">
      <ul>
        <Tab>
          <a>View Results</a>
        </Tab>
        <Tab className="is-active">
          <a>Manage Survey</a>
        </Tab>
      </ul>
    </TabsContainer>
  );
};

export default SurveyTabs;
