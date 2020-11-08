import mongoose from 'mongoose';
import { ATLAS_URI } from './config';

const connectToDB = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(ATLAS_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    mongoose.connection.on('error', () => {
      reject('MongoDB connection error. Please make sure MongoDB is running.');
    });

    mongoose.connection.once('open', () => {
      console.log('MongoDB database connection established succesfully 🤖');
      resolve();
    });
  });
};

export default connectToDB;
