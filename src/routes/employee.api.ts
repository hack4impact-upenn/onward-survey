import express from 'express';
import { Employee } from '../models/employee.model';

const router = express.Router();

// get whether the employee has completed the survey
// should be simple
router.get('/completed', (req, res) => {
  return res.status(200).json({ success: true });
});

// submit survey response
// change employee completed survey to true
router.post('/survey', (req, res) => {
  return res.status(200).json({ success: true });
});

export default router;
