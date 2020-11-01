import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IEmployee extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  surveyId: string;
  employer: mongoose.Types.ObjectId;
  completed: boolean;
}

const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  surveyId: { type: String, required: true },
  completed: { type: String, required: true },
});

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export { Employee, IEmployee };
