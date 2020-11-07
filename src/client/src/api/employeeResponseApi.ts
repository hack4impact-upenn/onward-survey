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

const fetchSurveyStatus = (key: string, surveyId: string) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/employees/'+surveyId+'/completed',
      method: 'GET',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: Error) => reject(err));
  });
};


export { submit, fetchSurveyStatus };
