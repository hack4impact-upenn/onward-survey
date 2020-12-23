import * as React from 'react';
import styled from 'styled-components';
import { Formik, Field, Form, FieldAttributes } from 'formik';
import { signup } from '../../api/userApi';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

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
  font-weight: 700;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
`;
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
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

const Signup = () => {
  document.title = 'Onward | Create Account';
  const [signupMutate] = useMutation(signup);
  const history = useHistory();

  const handleSubmit = async (values: IUserSignup) => {
    try {
      await signupMutate(values);
      alert('Success');
      history.push('/');
    } catch (error) {
      console.error(`Error: ${error.response.data}`);
      alert('Oops... Something went wrong, try again later.');
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Text className="title is-1">Create account</Text>
        <Divider />
        <Text>
          Have an account already? <a href="/">Login.</a>
        </Text>
        <FormContainer>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <FieldWrapper icon="fa-signature">
                <Field
                  name="firstName"
                  className="input"
                  type="text"
                  placeholder="First Name"
                />
              </FieldWrapper>
              <FieldWrapper icon="fa-signature">
                <Field
                  name="lastName"
                  className="input"
                  type="text"
                  placeholder="Last Name"
                />
              </FieldWrapper>
              <FieldWrapper icon="fa-envelope">
                <Field
                  name="email"
                  className="input"
                  type="email"
                  placeholder="Email"
                />
              </FieldWrapper>
              <FieldWrapper icon="fa-home">
                <Field
                  name="company"
                  className="input"
                  type="text"
                  placeholder="Company Name"
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
                Create Account
              </Button>
            </Form>
          </Formik>
        </FormContainer>
      </FormWrapper>
    </Container>
  );
};

export default Signup;
