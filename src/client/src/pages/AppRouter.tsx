import React from 'react';
import Main from './Main';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import SurveyQuestions from './survey/SurveyQuestions';
import SurveyWelcome from './survey/Welcome';
import NextSteps from './survey/NextSteps';
import AppContainer from '../components/AppContainer';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ManageSurvey from './ManageSurvey';

const AppRouter = () => {
  return (
    <Router>
      <AppContainer>
        <Switch>
          <PublicRoute exact path="/" component={Main} />
          <PublicRoute exact path="/signup" component={Signup} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PublicRoute exact path="/manage-survey" component={ManageSurvey} />
          <PublicRoute exact path="/survey/questions" component={SurveyQuestions} />
          <PublicRoute exact path="/survey/welcome" component={SurveyWelcome} />
          <PublicRoute exact path="/survey/nextsteps" component={NextSteps} />
          <PublicRoute exact={false} path="/" component={Main} />
        </Switch>
      </AppContainer>
    </Router>
  );
};

export default AppRouter;
