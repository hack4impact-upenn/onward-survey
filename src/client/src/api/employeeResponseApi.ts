import secureAxios from './core/apiClient';

const submit = ( {employeeId, responses}: ISurveyResponse) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/employees/survey',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        employeeId,
        responses,
      }),
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: Error) => reject(err));
  });
};

const fetchSurveyStatus = (key: string, { surveyId }: { surveyId: string }) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/employees/completed',
      method: 'GET',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        surveyId
      }),
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          reject(err);
        }
      })
  });
};


export { submit, fetchSurveyStatus };
