import mongoose from 'mongoose';

const { Schema } = mongoose;

interface ISurvey extends mongoose.Document {
  _id: string;
  employerId: string;
  empListId: string;
}

const SurveySchema = new Schema({
  employerId: { type: String, required: true },
  empListId: { type: String, required: true },
});

const Survey = mongoose.model<ISurvey>('Survey', SurveySchema);

export { Survey, ISurvey };
