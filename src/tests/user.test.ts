import createServer from '../utils/createServer';
import connectToDB from '../utils/connectToDB';
import supertest from 'supertest';
import mongoose from 'mongoose';

// this tutorial is pretty nice
// https://losikov.medium.com/part-4-node-js-express-typescript-unit-tests-with-jest-5204414bf6f0

/* setting up database */
beforeAll(async (done) => {
  await connectToDB();
  done();
});

/* kill database string after all tests */
afterAll(async (done) => {
  await mongoose.connection.close();
  done();
});

const app = createServer();

// succesful login test
test('user login success test', async (done) => {
  const data = {
    email: 'dtian@gmail.com',
    password: '123456',
  };

  await supertest(app)
    .post('/api/users/login/')
    .send(data)
    .expect(200)
    .then(async (response) => {
      expect(response.body.success).toBe(true);
      expect(response.body.accessToken).toBeTruthy();
      expect(response.body.refreshToken).toBeTruthy();
      done();
    });
});

// failed login
test('user login failure test', async (done) => {
  const data = {
    email: 'dtian@gmail.com',
    password: '12345688',
  };

  await supertest(app)
    .post('/api/users/login/')
    .send(data)
    .expect(400)
    .then(async (response) => {
      expect(response.body.success).toBe(false);
      done();
    });
});
