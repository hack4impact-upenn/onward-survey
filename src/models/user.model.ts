import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IUser extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken: string;
  surveyUrl: string;
  surveyIDs: string[];
  employees: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: false },
  surveyIDs: { type: [String], required: false, default: [] },
  surveyUrl: { type: String, required: false },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: false,
      default: [],
    },
  ],
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };
