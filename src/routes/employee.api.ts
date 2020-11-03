import express from 'express';
import { Employee } from '../models/employee.model';
import errorHandler from './error';
import { User } from '../models/user.model';

const router = express.Router();

// get whether the employee has completed the survey
// should be simple
router.get('/completed', (req, res) => {
  const { _id }  = req.body;
  return Employee.findById(_id)
    .select("firstName lastName completed _id")
    .then((employee) => {
      if (!employee) return errorHandler(res, 'Employee does not exist.');
      return res.status(200).json({ success: true, data: employee });
    })
    .catch((err) => errorHandler(res, err.message));
});

// submit survey response
// change employee completed survey to true
router.post('/survey', (req, res) => {
  return res.status(200).json({ success: true });
});

//redirect to survey
router.route('/survey/:employerSurveyId-:surveyId').get((req, res) => {
  const surveyId = req.params.surveyId;
  const surveyUrl = req.params.employerSurveyId
  const user = User.findOne({ surveyUrl })
  .then((user) => {
    if (!user) return errorHandler(res, 'User does not exist.');
    if (user.surveyIDs.indexOf(surveyId) == -1){
      return errorHandler(res, 'Employee does not exist in company.'); 
    }
  }).catch((err) => errorHandler(res, err.message));

  const employee = Employee.findOne({surveyId})
  .then((employee) => {
      if (!employee) return errorHandler(res, 'Employee does not exist.');
      if (employee.completed.valueOf()){
        res.redirect('/survey/completed');
        return res.status(200).json({ success: true, message: 'Employee has already opened survey' });
      }
      res.redirect('/survey/' + surveyUrl + '-'+ surveyId + '/welcome');
      return res.status(200).json({ success: true, message: 'Employee opened survey' });
  })
  .catch((err) => errorHandler(res, err.message));
});

export default router;
