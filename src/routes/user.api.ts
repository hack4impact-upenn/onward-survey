import { compare, hash } from 'bcrypt';
import csv from 'csv-parser';
import express from 'express';
import fs from 'fs';
import { Types } from 'mongoose';
import multer from 'multer';
import shortid from 'shortid';
import auth from '../middleware/auth';
import { Employee } from '../models/employee.model';
import { EmployeeResponse } from '../models/employee_response.model';
import { IUser, User } from '../models/user.model';
import { SENDGRID_EMAIL } from '../utils/config';
import errorHandler from './error';
import {
  generateAccessToken,
  generateRefreshToken,
  sendMessage,
  validateRefreshToken,
} from './user.util';
import { surveyInvitation, surveyReminder } from '../templates';

const router = express.Router();
const saltRounds = 10;
// use multer to handle uploaded files
const upload = multer({ dest: 'uploads/' });

/* account signup endpoint */
router.post('/signup', async (req, res) => {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { company } = req.body;
  const { password } = req.body;

  if (await User.findOne({ email })) {
    return errorHandler(res, 'User already exists.');
  }

  // hash + salt password
  return hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return errorHandler(res, err.message);
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      institutionName: company,
      password: hashedPassword,
    });

    return newUser
      .save()
      .then(() => res.status(200).json({ success: true }))
      .catch((e) => errorHandler(res, e.message));
  });
});

/* acccount login endpoint */
router.post('/login', async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  const user = await User.findOne({ email });
  // user does not exist
  if (!user) return errorHandler(res, 'User email or password is incorrect.');

  return compare(password, user.password, (err, result) => {
    if (err) return errorHandler(res, err.message);

    if (result) {
      // password matched
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      return Promise.all([accessToken, refreshToken]).then((tokens) =>
        res.status(200).json({
          success: true,
          accessToken: tokens[0],
          refreshToken: tokens[1],
        })
      );
    }

    // wrong password
    return errorHandler(res, 'User email or password is incorrect.');
  });
});

/* account jwt token refresh */
router.post('/refreshToken', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return errorHandler(res, 'No token provided.');
  }

  return validateRefreshToken(refreshToken)
    .then((tokenResponse: IUser) => generateAccessToken(tokenResponse))
    .then((accessToken: string) => {
      res.status(200).json({
        success: true,
        accessToken,
      });
    })
    .catch((err: { code: string; message: string }) => {
      if (err.code) {
        return errorHandler(res, err.message, err.code);
      }
      return errorHandler(res, err.message);
    });
});

/* loop through list of employees and send unique invite email if employee has not completed survey*/
router.post('/sendSurveyUrl', auth, async (req, res) => {
  const { userId } = req;
  try {
    // get employer
    const userEmployer = await User.findById(userId).populate('employees');
    if (!userEmployer) return errorHandler(res, 'User does not exist.');
    const employees = userEmployer.employees;
    if (!employees)
      return errorHandler(res, 'User does not have any employees.');

    //loop through employees to send emails to each
    employees.forEach(async (employeeId) => {
      const employee = await Employee.findById(employeeId);
      if (!employee) return;
      if (employee.completed == false) {
        const { email, employerName, surveyId } = employee;

        sendMessage({
          from: SENDGRID_EMAIL,
          to: email,
          subject: 'Invitation to fill out Survey',
          html: surveyInvitation(employerName, surveyId),
        });
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    errorHandler(res, error.message);
  }
});

/* resending indiviudal survey url based on employee id */
router.post('/sendIndividualUrl', auth, async (req, res) => {
  const { userId } = req;
  const employeeId = req.body._id;

  const employer = await User.findById(userId);
  if (!employer) return errorHandler(res, 'User does not exist.');
  const employee = await Employee.findById(employeeId);
  if (!employee) return errorHandler(res, 'Employee does not exist.');

  try {
    const { email, surveyId } = employee;
    sendMessage({
      from: SENDGRID_EMAIL,
      to: email,
      subject: 'Invitation to fill out Survey',
      html: surveyReminder(surveyId),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    errorHandler(res, error.message);
  }
});

/* Upload CSV*/
router.post('/uploadCSV', upload.single('file'), auth, async (req, res) => {
  const results: any = [];
  const { userId } = req;
  const user = await User.findById(userId);

  // If the file is somehow a csv (frontend shouldn't allow this), then it will fail.
  if (!(req.file.mimetype === 'text/csv')) {
    return res.status(400).json({ success: false });
  }

  fs.createReadStream(req.file.path)
    // It will read the 1st column of the CSV as Name, the 2nd column as Email.
    .pipe(csv(['Name', 'Email']))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // we create a new employee object from the csv data
      // NOTE: many of these are placeholders right now (unspecified behavior)
      results.forEach(async (employee: any) => {
        const surveyId = shortid.generate();
        const newEmployee = new Employee();
        newEmployee.email = employee.Email;
        newEmployee.employer = new Types.ObjectId(userId);
        if (user?.institutionName)
          newEmployee.employerName = user.institutionName;
        newEmployee.surveyId = surveyId;
        newEmployee.completed = false;
        try {
          // upload employee object to MongoDB
          await newEmployee.save();
          await User.updateOne(
            { _id: userId },
            { $push: { employees: newEmployee.id } },
            { $push: { surveyIds: surveyId } }
          );
        } catch (err) {
          return errorHandler(res, err);
        }
      });
      // We are deleting the file that was uploaded from the server.
      fs.unlink(req.file.path, (err) => {
        if (err) console.error(err);
      });
      return res.status(200).json({ success: true });
    });
});


/* user reset survey endpoint */
router.post('/resetSurvey', auth, async (req, res) => {
  const { userId } = req;
  try {
    // get employer
    const userEmployer = await User.findById(userId).populate('employees');
    if (!userEmployer) return errorHandler(res, 'User does not exist.');
    const employees = userEmployer.employees;
    const surveyIds = userEmployer.surveyIDs
    // set employer thresholdMet to false and numCompleted to 0
    await User.updateOne(
      { _id: userId},
      { $set: { thresholdMet: false, numCompleted: 0} }
    );
    // set employee survey completed to false
    if (employees) {
      employees.forEach(async (employeeId) => {
        const employee = await Employee.findById(employeeId).select( '_id completed');
        if (!employee) return;
        await Employee.updateOne(
          { _id: employee._id }, 
          { $set: { completed: false } }
        );
      })
    }
    // delete all relevant survey responses 
    if (surveyIds) {
      surveyIds.forEach(async (surveyId) => {
        await EmployeeResponse.findOneAndDelete(
          { "surveyId" : surveyId}
        );
      })
    }
  } catch (err) {
    return errorHandler(res, err);
  }
  return res.status(200).json({ message: 'success' });
});

/* user fetch self info endpoint */
router.get('/me', auth, async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId).select(
      'firstName lastName email company _id thresholdMet'
    );
    if (!user) return errorHandler(res, 'User does not exist.');
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    return errorHandler(res, err.message);
  }
});

/* user add new employee endpoint */
router.post('/create/employee', auth, async (req, res) => {
  const { emails } = req.body;
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) return errorHandler(res, 'User does not exist.');

  emails.forEach(async (email: string) => {
    const surveyId = shortid.generate();
    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.employer = new Types.ObjectId(userId);
    newEmployee.employerName = user.institutionName;
    newEmployee.surveyId = surveyId;
    newEmployee.completed = false;

    try {
      await newEmployee.save();
      await User.updateOne(
        { _id: userId },
        { $push: { employees: newEmployee.id } }
      );
      await User.updateOne({ _id: userId }, { $push: { surveyIDs: surveyId } });
    } catch (err) {
      return errorHandler(res, err);
    }
    return res.status(200).json({ message: 'success' });
  });
});

/* user fetch employee emails */
router.get('/emails', auth, (req, res) => {
  const { userId } = req;
  return User.findById(userId)
    .populate('employees')
    .then((user) => {
      if (!user) return errorHandler(res, 'User does not exist.');
      const employees = user.employees;
      return res.status(200).json({ success: true, data: employees });
    })
    .catch((err) => errorHandler(res, err.message));
});

/* delete a single employee */
router.delete('/delete/employee', auth, async (req, res) => {
  const { userId } = req;
  const { _id: employeeId } = req.body;
  const { surveyId } = req.body;
  const { employer } = req.body;

  try {
    await User.updateOne(
      { _id: employer },
      { $pull: { employees: employeeId } }
    );
    await User.updateOne({ _id: employer }, { $pull: { surveyIDs: surveyId } });
    const employee = await Employee.findById(employeeId);

    const user = await User.findById(userId);
    if (!user) return errorHandler(res, 'User does not exist.');

    if (employee && employee.completed) {
      user.numCompleted -= 1;
    }

    const threshold = user.numCompleted / user.employees.length;
    if (threshold < 0.75) {
      user.thresholdMet = false;
      await user.save();
    }

    await Employee.findByIdAndDelete(employeeId);

    return res.status(200).json({ success: true });
  } catch (error) {
    errorHandler(res, error.message);
  }
});

/* retrieve survey data */
router.get('/data', auth, async (req, res) => {
  const { userId } = req;
  return User.findById(userId)
    .select('surveyIDs _id')
    .then(async (user) => {
      if (!user) return errorHandler(res, 'User does not exist.');
      const ids = user.surveyIDs;
      const results = await EmployeeResponse.find({ surveyId: { $in: ids } });

      return res.status(200).json({ success: true, data: results });
    })
    .catch((err) => errorHandler(res, err.message));
});

/* TESTING ENDPOINTS BELOW (DELETE IN PRODUCTION) */
/* fetch all users in database */
router.post('/', (_, res) => {
  User.find({})
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

/* delete all users in database */
router.delete('/', (_, res) => {
  User.deleteMany({})
    .then(() => res.status(200).json({ success: true }))
    .catch((e) => errorHandler(res, e));
});

export default router;
