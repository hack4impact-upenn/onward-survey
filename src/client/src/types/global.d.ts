/**
 * Define your global interfaces here
 */

declare interface IUserSignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

declare interface IUserLogin {
  email: string;
  password: string;
}

declare interface IAPIResponse {
  success: boolean;
}

declare interface ISurveyAnswers {
  [questionNumber: number]: string;
}

declare interface ISurveyResponse {
  surveyId: string;
  responses: Object[];
}

declare module 'react-bulma-components';