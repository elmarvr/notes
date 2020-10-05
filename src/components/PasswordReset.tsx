import { FirebaseError } from 'firebase';
import React, { FormEvent, useContext, useState } from 'react';
import { Message } from 'semantic-ui-react';

import AuthContext from '../context/AuthContext';
import { useForm } from '../hooks';
import { AuthError, PasswordResetElements } from '../models';
import { getFormElements } from '../utils/getFormElements';
import { Field, WidgetForm } from './func';

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

  return (
    <WidgetForm onSubmit={handleSubmit(onSubmit)}>
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
        errors={[
          errors.email?.message,
          errors.authorization?.type === AuthError.USER_NOT_FOUND &&
            "user not found",
        ]}
      />
    </WidgetForm>
  );
};

export default PasswordReset;
