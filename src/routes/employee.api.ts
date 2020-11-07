import express from 'express';
import { Employee } from '../models/employee.model';
import errorHandler from './error';
import { EmployeeResponse } from '../models/employee_response.model';

const router = express.Router();

// get whether the employee has completed the survey
// should be simple
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
          .select('surveyId')
          .then(async (employee) => {
            if (!employee) return errorHandler(res, 'Employee does not exist.');

            const { surveyId } = employee;
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
