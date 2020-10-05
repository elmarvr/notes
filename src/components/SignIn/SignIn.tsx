import { FirebaseError } from 'firebase';
import React, { FormEvent, useContext } from 'react';

import AuthContext from '../../context/AuthContext';
import { useForm } from '../../hooks';
import { AuthError } from '../../models';
import { getFormElements } from '../../utils/getFormElements';
import { Field, WidgetForm } from '../func';

const SignIn: React.FC = () => {
  const { signIn } = useContext(AuthContext);
  const { register, errors, setError, handleSubmit } = useForm();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = getFormElements<any>(event);

    try {
      await signIn(username.value, password.value);
    } catch (error) {
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
          errors.authorization?.type === AuthError.USER_NOT_FOUND &&
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
          errors.password?.message,
          errors.authorization?.type === AuthError.WRONG_PASSWORD &&
            "password is incorrect",
        ]}
      />
    </WidgetForm>
  );
};

export default SignIn;
