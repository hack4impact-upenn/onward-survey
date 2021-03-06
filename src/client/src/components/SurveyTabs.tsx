import React from 'react';
import { useQuery } from 'react-query';
import { fetchMe } from '../api/userApi';
import auth from '../utils/auth';
import styled from 'styled-components';
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
  color: #00aade;
`;

interface MyProfileResponse extends IAPIResponse {
  data: {
    _id: string;
    email: string;
    company: string;
    firstName: string;
    lastName: string;
  };
}

function MyEmployerName() {
  const query = useQuery(
    ['fetchMe', { accessToken: auth.getAccessToken() }],
    fetchMe,
    {
      refetchOnWindowFocus: false,
    }
  );
  if (query.data) {
    const { data: myProfile } = query as any;
    const profile: MyProfileResponse = myProfile;
    return (
      <WelcomeText className="title has-text-left">
        Welcome Back,{' '}
        <EmployerName>
          <span>{profile.data.firstName}</span>
        </EmployerName>
        !
      </WelcomeText>
    );
  } else {
    return <span> </span>;
  }
}

class SurveyTabs extends React.Component<
  { defaultTab: string; history: any },
  { tabClicked: number }
> {
  constructor(props: any) {
    super(props);

    if (props.defaultTab === 'manage') {
      this.state = { tabClicked: 2 };
    } else {
      this.state = { tabClicked: 1 };
    }
  }

  clickTab1() {
    this.setState({
      tabClicked: 1,
    });
    this.props.history.push('/dashboard/results');
  }

  clickTab2() {
    this.setState({
      tabClicked: 2,
    });
    this.props.history.push('/dashboard/manage');
  }

  render() {
    return (
      <ContentContainer>
        <div className="columns">
          <div className="column is-two-fifths">
            <MyEmployerName />
          </div>
        </div>
        <TabsContainer className="tabs is-large">
          <ul>
            <Tab className={this.state.tabClicked == 1 ? 'is-active' : ''}>
              <a
                onClick={() => {
                  this.clickTab1();
                }}
              >
                View Results
              </a>
            </Tab>
            <Tab className={this.state.tabClicked == 2 ? 'is-active' : ''}>
              <a
                onClick={() => {
                  this.clickTab2();
                }}
              >
                Manage Survey
              </a>
            </Tab>
          </ul>
        </TabsContainer>
        <div>
          {this.state.tabClicked == 1 && <ViewResultsTab></ViewResultsTab>}

          {this.state.tabClicked == 2 && <ManageSurveyTab></ManageSurveyTab>}
        </div>
      </ContentContainer>
    );
  }
}

export default SurveyTabs;
