import { FirebaseError } from 'firebase';
import React, { FormEvent, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import { useForm } from '../../hooks';
import { AuthError, AuthRoute, SignUpElements } from '../../models';
import { getFormElements } from '../../utils/getFormElements';
import { Field, WidgetForm } from '../func';

const SignUp: React.FC = () => {
  const { signUp } = useContext(AuthContext);
  const { register, handleSubmit, setError, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = getFormElements<SignUpElements>(event);

    try {
      await signUp(username.value, password.value);
      history.push(AuthRoute.LANDING);
    } catch (error) {
      console.log(error);
      setError("authorization", (error as FirebaseError).code);
    }
  };

  return (
    <WidgetForm onSubmit={handleSubmit(onSubmit)}>
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
          errors.username?.message,
          errors.authorization?.type === AuthError.EMAIL_EXISTS &&
            "account with email address already exists",
        ]}
      />

      <Field
        type="password"
        ref={register({
          required: "field is required",
          validate: {
            value: (value) => value.length > 0,
            message: "password needs to be at least 6 characters long",
          },
        })}
        name="password"
        label="Password:"
        icon="lock"
        errors={[errors.password?.message]}
      />

      <Field
        type="password"
        ref={register({
          required: "field is required",
          match: { value: "password", message: "passwords don't match" },
        })}
        name="passwordRepeat"
        label="Confirm Password:"
        icon="copy"
        errors={[errors.passwordRepeat?.message]}
      />
    </WidgetForm>
  );
};

export default SignUp;
