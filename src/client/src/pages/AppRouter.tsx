import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import PrivateRoute from '../components/routing/PrivateRoute';
import PublicRoute from '../components/routing/PublicRoute';
import Login from './authflow/Login';
import Signup from './authflow/Signup';
import Dashboard from './Dashboard';
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
          {/* <PublicRoute exact path="/" component={Main} /> */}
          <PublicRoute exact path="/signup" component={Signup} />
          <PublicRoute exact path="/" component={Login} />
          <PrivateRoute exact path="/dashboard" component={ManageSurvey} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/dashboard-old" component={Dashboard} />
          <Route
            exact
            path="/survey/:surveyId/welcome"
            component={SurveyWelcome}
          />
          <Route
            exact
            path="/survey/:surveyId/questions"
            component={SurveyQuestions}
          />
          <Route
            exact
            path="/survey/:surveyId/nextsteps"
            component={NextSteps}
          />
          <Route exact path="/survey/expired" component={Expired} />
          <Route path="/" component={Login} />
        </Switch>
      </AppContainer>
    </Router>
  );
};

export default AppRouter;
