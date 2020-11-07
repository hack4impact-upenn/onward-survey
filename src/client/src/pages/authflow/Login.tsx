import { Field, FieldAttributes, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../../api/core/auth';

const FormContainer = styled.div`
  text-align: center;
  margin: 10vh auto;
  width: 40vw;
`;

const Button = styled.button`
  width: 100%;
`;

const initialValues = {
  email: '',
  password: '',
};

const FieldWrapper = ({
  children,
  icon,
}: {
  children: FieldAttributes<any>;
  icon?: string;
}) => {
  if (!icon) return children;

  return (
    <div className="field">
      <p className="control has-icons-left has-icons-right">
        {children}
        <span className="icon is-small is-left">
          <i className={`fas ${icon}`}></i>
        </span>
      </p>
    </div>
  );
};

const Login = () => {
  const history = useHistory();

  const handleSubmit = (values: IUserLogin) => {
    auth.login(values);
  };

  const loginComplete = ({ errorMessage }: { errorMessage?: string }) => {
    if (!errorMessage) {
      history.push('/dashboard');
    } else {
      alert(`Error: ${JSON.stringify(errorMessage)}`);
    }
  };

  auth.addLoginSubscribers(loginComplete);

  return (
    <FormContainer>
      <h1 className="title is-1">Welcome Back</h1>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <FieldWrapper icon="fa-envelope">
            <Field
              name="email"
              className="input"
              type="email"
              placeholder="Email"
            />
          </FieldWrapper>
          <FieldWrapper icon="fa-lock">
            <Field
              name="password"
              className="input"
              type="password"
              placeholder="Password"
            />
          </FieldWrapper>
          <Button className="button is-primary" type="submit">
            Sign in
          </Button>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export default Login;
