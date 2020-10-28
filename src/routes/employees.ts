import express from "express";
import {Employee} from "../models/employee.model"
import shortid from "shortid";
const router = express.Router();


router.post("/", async (req , res) => {
    const {firstName, lastName, email, employerId} = req.body
    const newEmployee = new Employee;
    newEmployee.firstName = firstName;
    newEmployee.lastName = lastName;
    newEmployee.email = email;
    newEmployee.employer = employerId;
    const surveyId = shortid.generate();
    newEmployee.surveyId = surveyId
    const result = await newEmployee.save();
    res.send();
} )