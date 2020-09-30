import { FirebaseError } from 'firebase';
import React, { FormEvent, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Message, Segment } from 'semantic-ui-react';

import AuthContext from '../context/AuthContext';
import { useForm } from '../hooks';
import { AuthError, AuthRoute, SignInElements } from '../models';
import { getFormElements } from '../utils/getFormElements';
import { Field, Widget } from './func';

const SignIn = () => {
  const { register, errors, handleSubmit, setError } = useForm();
  const { auth, signIn } = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = getFormElements<SignInElements>(event);
    try {
      await signIn(username.value, password.value);
    } catch (error) {
      console.log(error);
      setError("authorization", (error as FirebaseError).code);
    }
  };

  const tooManyRequests = errors.authorization === AuthError.TOO_MANY_REQUESTS;

  return (
    <>
      <Widget loading={auth.loading} onSubmit={handleSubmit(onSubmit)}>
        <Field
          ref={register({
            required: "field is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "email address is invalid",
            },
          })}
          name="username"
          label="Email:"
          icon="mail"
          errors={[
            errors.username,
            errors.authorization === AuthError.USER_NOT_FOUND &&
              "user not found",
          ]}
        />

        <Field
          type="password"
          ref={register({
            required: "field is required",
          })}
          name="password"
          label="Password:"
          icon="lock"
          errors={[
            errors.password,
            errors.authorization === AuthError.WRONG_PASSWORD &&
              "password is incorrect",
          ]}
        />
      </Widget>
      <Segment>
        <Link to={AuthRoute.PASSWORD_RESET}>Reset Password?</Link>
      </Segment>
      {tooManyRequests && (
        <Message error>too many login attemps, try again later...</Message>
      )}
    </>
  );
};

export default SignIn;
