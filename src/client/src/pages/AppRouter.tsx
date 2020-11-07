import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import Login from './authflow/Login';
import Signup from './authflow/Signup';
import Dashboard from './Dashboard';
import Main from './Main';
import ManageSurvey from './ManageSurvey';
import Profile from './Profile';
import Expired from './survey/Expired';
import NextSteps from './survey/NextSteps';
import SurveyQuestions from './survey/SurveyQuestions';
import SurveyWelcome from './survey/Welcome';

const AppRouter = () => {
  return (
    <Router>
      <AppContainer>
        <Switch>
          <PublicRoute exact loginRedirect path="/" component={Main} />
          <PublicRoute exact loginRedirect path="/signup" component={Signup} />
          <PublicRoute exact loginRedirect path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={ManageSurvey} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PublicRoute
            exact
            loginRedirect={false}
            path="/dashboard-old"
            component={Dashboard}
          />
          <PublicRoute
            exact
            loginRedirect={false}
            path="/survey/:surveyId/welcome"
            component={SurveyWelcome}
          />
          <PublicRoute
            exact
            loginRedirect={false}
            path="/survey/:employerId/:employeeId/questions"
            component={SurveyQuestions}
          />
          <PublicRoute
            exact
            loginRedirect={false}
            path="/survey/:employerId/:employeeId/nextsteps"
            component={NextSteps}
          />
          <PublicRoute
            exact
            loginRedirect={false}
            path="/survey/expired"
            component={Expired}
          />
          <PublicRoute exact={false} loginRedirect path="/" component={Main} />
        </Switch>
      </AppContainer>
    </Router>
  );
};

export default AppRouter;
