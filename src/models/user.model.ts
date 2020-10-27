import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IUser extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken: string;
  surveyUrl : string
  surveyIDs: string[];
}

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: false },
  surveyIDs: { type: String, required: true, default: [] },
  surveyUrl: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };
