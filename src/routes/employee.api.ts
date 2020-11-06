import express from 'express';
import { Employee } from '../models/employee.model';
import errorHandler from './error';
import { User } from '../models/user.model';
import { EmployeeResponse } from '../models/employee_response.model';

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
router.post('/survey', async (req, res) => {
  const { employeeId, responses } = req.body;
  const employee = Employee.findById(employeeId)
    .select("surveyId")
    .then(async (employee) => {
      if (!employee) return errorHandler(res, 'Employee does not exist.');

      const surveyId = employee.surveyId;
      const newEmployeeResponse = new EmployeeResponse({
        surveyId,
        responses,
      });

      // update employee completed survey to true
      try {
        await newEmployeeResponse.save();
        await Employee.updateOne(
          {_id: employeeId},
          { $set: { completed: true } }
        )
      }
      catch (err) {
        console.log(err);
        return errorHandler(res, err);
      }
      return res.status(200).json({ message: 'success' });
    })
    .catch((err) => errorHandler(res, err.message));
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
      //for some reason employee.completed is always true regardless of its value
      if (employee.completed){
       res.render('../client/src/pages/survey/expired'); //need a view engine to render
       return res.status(200).json({ success: true, message: 'Employee has already opened survey' });
      }
    res.render('../client/src/pages/survey/'+surveyUrl+'/'+surveyId+'/welcome');
    return res.status(200).json({ success: true, message: 'Employee opened survey' });
  })
  .catch((err) => errorHandler(res, err.message));
});

// get me
// protected route (should be protected is not atm)
router.get('/me/surveyId', (req, res) => {
  const { employeeId }  = req.body;

  return Employee.findById(employeeId)
    .select('surveyId')
    .then((employee) => {
      if (!employee) return errorHandler(res, 'Employee does not exist.');

      return res.status(200).json({ success: true, data: employee });
    })
    .catch((err) => errorHandler(res, err.message));
});

export default router;
