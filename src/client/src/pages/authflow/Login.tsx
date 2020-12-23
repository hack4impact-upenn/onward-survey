import { Field, FieldAttributes, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../../utils/auth';

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  width: 60vw;
  max-width: 700px;
  padding: 100px 10px;
  background-color: #ecf0f1;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  width: 70%;
  text-align: center;
  margin: 0px 0px 30px 0px;
`;

const Divider = styled.div`
  height: 3px;
  width: 10%;
  margin: 0px 0px 20px 0px;
  border-top: 3px solid #bbb;
`;

const FormContainer = styled.div`
  width: 60%;
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
  document.title = 'Onward | Financial Wellness Survey';

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
    <Container>
      <FormWrapper>
        <Text className="title is-2">Financial Wellness Survey</Text>
        <Divider />
        <Text>
          Don't have an account yet? <a href="/signup">Create account.</a>
        </Text>

        <FormContainer>
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
      </FormWrapper>
    </Container>
  );
};

export default Login;
