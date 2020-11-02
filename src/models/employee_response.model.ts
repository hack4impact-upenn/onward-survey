import mongoose, { MongooseDocument } from 'mongoose';

const { Schema } = mongoose;

interface IEmployeeResponse extends mongoose.Document {
    surveyId: string;
    responses: [Object];
}

const EmployeeResponseSchema = new Schema({
    surveyId: { type: String, required: true },
    responses: { type: [Object], required: true}
});

const EmployeeResponse = mongoose.model<IEmployeeResponse>('Employee Response', EmployeeResponseSchema);

export { EmployeeResponse, IEmployeeResponse };