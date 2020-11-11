import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IUser extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken: string;
  surveyIDs: string[];
  institutionName: string;
  employees: mongoose.Types.ObjectId[];
  thresholdMet: boolean;
  numCompleted: number;
}

// TODO: need to change registration sheet to add institution name
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: false },
  surveyIDs: { type: [String], required: false, default: [] },
  institutionName: {
    type: String,
    required: false,
    default: 'Placeholder Company',
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: false,
      default: [],
    },
  ],
  thresholdMet: {type: Boolean, required: false, default: false},
  numCompleted: {type: Number, required: false, default: 0}
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };
