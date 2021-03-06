import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IEmployeeResponse extends mongoose.Document {
  surveyId: string;
  responses: any[];
}

const EmployeeResponseSchema = new Schema({
  surveyId: { type: String, required: true },
  responses: { type: [Object], default: [] },
});

const EmployeeResponse = mongoose.model<IEmployeeResponse>(
  'Employee Response',
  EmployeeResponseSchema
);

export { EmployeeResponse, IEmployeeResponse };
