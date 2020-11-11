import { compare, hash } from 'bcrypt';
import express from 'express';
import { Types } from 'mongoose';
import shortid from 'shortid';
import auth from '../middleware/auth';
import { IEmployee, Employee } from '../models/employee.model';
import { IUser, User } from '../models/user.model';
import { SENDGRID_EMAIL } from '../utils/config';
import errorHandler from './error';
import {
  generateAccessToken,
  generateRefreshToken,
  sendMessage,
  validateRefreshToken,
} from './user.util';

const router = express.Router();
const saltRounds = 10;

/* account signup endpoint */
router.post('/signup', async (req, res) => {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { institutionName } = req.body;

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
      institutionName,
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

/* loop through list of employees and send unique invite email */
router.post('/sendSurveyUrl', auth, async (req, res) => {
  const { userId } = req;
  try {
    // get employer
    const employer = await User.findById(userId).populate('employees');
    if (!employer) return errorHandler(res, 'User does not exist.');
    const employees = employer.employees;
    if (!employees)
      return errorHandler(res, 'User does not have any employees.');

    //loop through employees to send emails to each
    employees.forEach(async (employeeId) => {
      const employee = await Employee.findById(employeeId);
      if (!employee) return;
      const { email, firstName, lastName, surveyId } = employee;
      const html = `<p>Dear ${firstName} ${lastName}, <br/><br/> Please fill out your employee survey using this unique ID: <strong> ${surveyId} </strong><br/><br/>Sincerely,<br/>The Onward Financial Team</p>`;

      sendMessage({
        from: SENDGRID_EMAIL,
        to: email,
        subject: 'Inivitation to fill out Survey',
        html,
      });
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    errorHandler(res, error.message);
  }
});

/* resending indiviudal survey url based on employee id */
router.post('/sendIndividualUrl', auth, async (req, res) => {
  const { userId } = req;
  const { employeeId } = req.body;

  const employer = await User.findById(userId);
  if (!employer) return errorHandler(res, 'User does not exist.');
  const employee = await Employee.findById(employeeId);
  if (!employee) return errorHandler(res, 'Employee does not exist.');

  try {
    const { email, firstName, lastName, surveyId } = employee;
    const html = `<p>Dear ${firstName} ${lastName}, <br/><br/> Please fill out your employee survey using this unique ID: <strong> ${surveyId} </strong><br/><br/>Sincerely,<br/>The Onward Financial Team</p>`;

    sendMessage({
      from: SENDGRID_EMAIL,
      to: email,
      subject: 'Inivitation to fill out Survey',
      html,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    errorHandler(res, error.message);
  }
});

/* user fetch self info endpoint */
router.get('/me', auth, (req, res) => {
  const { userId } = req;

  return User.findById(userId)
    .select('firstName lastName email _id')
    .then((user) => {
      if (!user) return errorHandler(res, 'User does not exist.');

      return res.status(200).json({ success: true, data: user });
    })
    .catch((err) => errorHandler(res, err.message));
});

/* user add new employee endpoint */
router.post('/create/employee', auth, async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const { userId } = req;
  const user = await User.findById(userId);
  const surveyId = shortid.generate();
  if (!user) return errorHandler(res, 'User does not exist.');

  // create new employee
  const newEmployee = new Employee();
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.email = email;
  newEmployee.employer = new Types.ObjectId(userId);
  newEmployee.employerName = user.institutionName;
  newEmployee.surveyId = surveyId;
  newEmployee.completed = false;

  try {
    await newEmployee.save();
    await User.updateOne(
      { _id: userId },
      { $push: { employees: newEmployee.id } },
      { $push: { surveyIds: surveyId } }
    );
  } catch (err) {
    console.log(err);
    return errorHandler(res, err);
  }
  return res.status(200).json({ message: 'success' });
});

/* user fetch employee emails */
router.get('/email', auth, (req, res) => {
  const { userId } = req;
  return User.findById(userId)
    .populate('employees')
    .then((user) => {
      if (!user) return errorHandler(res, 'User does not exist.');
      const employees = user.employees
      //const emails = user.employees.map(employee => employee.email);
      return res.status(200).json({ success: true, data: employees });
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
