import { sign, verify } from 'jsonwebtoken';
import * as _ from 'lodash';
import { User, IUser } from '../models/user.model';
import { JWT_SECRET, SENDGRID_API_KEY } from '../utils/config';
import sgMail from '@sendgrid/mail';

class AuthError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

interface IEmailParams {
  from: string;
  to: string;
  subject: string;
  html: string;
}

sgMail.setApiKey(SENDGRID_API_KEY || '');

//abstracted sendMessage function that takes in sender email, outgoing email, subject, and body of the email
const sendMessage = ({ from, to, subject, html }: IEmailParams): void => {
  const msg = {
    to,
    from,
    subject,
    text: html,
    html,
  };

  sgMail.send(msg).then(
    () => {
      console.log('Message sent succesfully!');
    },
    (error) => {
      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

const generateAccessToken = (user: IUser): string =>
  sign(_.omit(user.toObject(), 'password'), JWT_SECRET, {
    expiresIn: '5 m', // for testing purposes
  });

const generateRefreshToken = (user: IUser): Promise<string> => {
  const refreshToken = sign({ type: 'refresh' }, JWT_SECRET, {
    expiresIn: '9999 years',
  });

  return User.findOneAndUpdate({ email: user.email }, { refreshToken })
    .then(() => refreshToken)
    .catch((err) => {
      throw err;
    });
};

const validateRefreshToken = (refreshToken: string): Promise<any> =>
  new Promise((res, rej) => {
    verify(refreshToken, JWT_SECRET, (err) => {
      if (err) {
        rej(new AuthError('refreshExpired', 'Refresh token expired'));
      } else {
        User.findOne({ refreshToken })
          .then((user) => {
            if (!user) {
              rej(new AuthError('invalidToken', 'Refresh token invalid'));
            }
            res(user);
          })
          .catch((e) => {
            rej(e);
          });
      }
    });
  });

export {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
  sendMessage,
};
