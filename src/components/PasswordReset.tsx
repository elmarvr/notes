import { FirebaseError } from 'firebase';
import React, { FormEvent, useContext, useState } from 'react';
import { Message } from 'semantic-ui-react';

import AuthContext from '../context/AuthContext';
import { useForm } from '../hooks';
import { AuthError, PasswordResetElements } from '../models';
import { getFormElements } from '../utils/getFormElements';
import { Field, Widget } from './func';

const PasswordReset = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { errors, handleSubmit, register, setError } = useForm();
  const { auth, sendPasswordResetEmail } = useContext(AuthContext);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email } = getFormElements<PasswordResetElements>(event);
    try {
      await sendPasswordResetEmail(email.value);
      setIsSubmit(true);
    } catch (error) {
      setError("authorization", (error as FirebaseError).code);
    }
  };

  const tooManyRequests = errors.authorization === AuthError.TOO_MANY_REQUESTS;

  return (
    <>
      <Widget
        disabled={tooManyRequests || isSubmit}
        loading={auth.loading}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          label="Email:"
          name="email"
          icon="mail"
          ref={register({
            required: "field is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "email address is invalid",
            },
          })}
        >
          {errors.email}
          {errors.authorization === AuthError.USER_NOT_FOUND &&
            "user not found"}
        </Field>
      </Widget>

      {isSubmit && (
        <Message info>
          email is send, you will recieve a reset link shortly
        </Message>
      )}

      {tooManyRequests && (
        <Message error>too many emails send, try again later...</Message>
      )}
    </>
  );
};

export default PasswordReset;
