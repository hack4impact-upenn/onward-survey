import secureAxios from './core/apiClient';

const submit = ({ surveyId, responses} : ISurveyResponse) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/employees/survey',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        surveyId,
        responses,
      }),
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: Error) => reject(err));
  });
};


export { submit };
