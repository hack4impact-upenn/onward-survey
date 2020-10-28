import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IUser extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken: string;
  surveyUrl : string;
  surveyIDs: string[];
  employees: []
}

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: false },
  surveyUrl: { type: String, required: true },
  surveyIDs: { type: String, required: true, default: [] },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
     default: []
  }]
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };
