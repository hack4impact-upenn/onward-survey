import express from 'express';
import { Employee } from '../models/employee.model';
import { EmployeeResponse } from '../models/employee_response.model';
import { User } from '../models/user.model';
import errorHandler from './error';
import { sendMessage } from './user.util';
import { SENDGRID_EMAIL } from '../utils/config';
import resultEmail from '../templates/resultsEmail';

const router = express.Router();

// get whether the employee has completed the survey
router.get('/:surveyId/completed', (req, res) => {
  const { surveyId } = req.params;

  return Employee.findOne({ surveyId })
    .select('_id employer employerName completed')
    .then((employee) => {
      if (!employee)
        return errorHandler(
          res,
          `Employee with survey ID ${req.body.surveyId} does not exist.`
        );

      return res.status(200).json({ success: true, data: employee });
    })
    .catch((err) => errorHandler(res, err.message));
});

// submit survey response
// change employee completed survey to true
router.post('/survey', async (req, res) => {
  const { employeeId, responses } = req.body;
  Employee.findById(employeeId)
    .select('surveyId employer')
    .then(async (employee) => {
      if (!employee) return errorHandler(res, 'Employee does not exist.');

      const { surveyId, employer } = employee;
      const newEmployeeResponse = new EmployeeResponse({
        surveyId,
        responses,
      });

      // update employee completed survey to true
      try {
        await newEmployeeResponse.save();
        await Employee.updateOne(
          { _id: employeeId },
          { $set: { completed: true } }
        );
        // Find employer, increment number completed, check if number completed >= threshold
        await User.findById(employer)
          .select('numCompleted thresholdMet employees firstName lastName email')
          .then(async (employer) => {
            if (!employer) return errorHandler(res, 'Employer does not exist.');
            // arbitrary threshold of 75% chosen
            if (
              !employer.thresholdMet.valueOf() &&
              Number(employer.numCompleted + 1) /
                Number(employer.employees.length) >=
                0.01
            ) {
              const name = employer.firstName + " " + employer.lastName;
              const html:string = resultEmail(name);
              sendMessage({
                from: SENDGRID_EMAIL,
                to: employer.email,
                subject: 'Survey Results Are Ready!',
                html,
              });
              console.log(employer.thresholdMet.valueOf());
              employer.thresholdMet = true;
            }
            employer.numCompleted = employer.numCompleted + 1;
            employer.save();
          });
      } catch (err) {
        console.log(err);
        return errorHandler(res, err);
      }
      return res.status(200).json({ message: 'success' });
    })
    .catch((err) => errorHandler(res, err.message));
});

// get surveyId from user
router.get('/me/surveyId', (req, res) => {
  const { employeeId } = req.body;

  return Employee.findById(employeeId)
    .select('surveyId')
    .then((employee) => {
      if (!employee) return errorHandler(res, 'Employee does not exist.');

      return res.status(200).json({ success: true, data: employee });
    })
    .catch((err) => errorHandler(res, err.message));
});

export default router;
