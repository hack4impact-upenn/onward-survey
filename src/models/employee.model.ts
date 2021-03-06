import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IEmployee extends mongoose.Document {
  _id: string;
  email: string;
  surveyId: string;
  employer: mongoose.Types.ObjectId;
  employerName: string;
  completed: boolean;
}

const EmployeeSchema = new Schema({
  email: { type: String, required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, required: true },
  employerName: { type: String, required: true },
  surveyId: { type: String, required: true },
  completed: { type: Boolean, required: false, default: false },
});

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export { Employee, IEmployee };
