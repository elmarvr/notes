import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Message } from 'semantic-ui-react';

import AuthContext from '../context/AuthContext';
import { useForm } from '../hooks';
import { PasswordUpdateElements } from '../models';
import { getFormElements } from '../utils/getFormElements';
import { Field, Widget } from './func';

const PasswordUpdate = () => {
  const location = useLocation();
  const [code, setCode] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState(false);

  const { auth, confirmPasswordReset, checkActionCode } = useContext(
    AuthContext
  );
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("oobCode");

    if (code) {
      checkActionCode(code).then((value) =>
        value ? setCode(code) : setCode("invalid")
      );
    } else {
      setCode("invalid");
    }
  }, []);

  const isValid = code !== "invalid";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password } = getFormElements<PasswordUpdateElements>(event);

    //Code already checked
    await confirmPasswordReset(code, password.value);
    setIsSubmit(true);
  };

  return (
    <>
      <Widget
        disabled={!isValid || isSubmit}
        loading={auth.loading}
        onSubmit={handleSubmit(onSubmit)}
      >
        {isValid ? (
          <>
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
              label="Reset Password:"
              icon="lock"
              error={errors.password}
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
              error={errors.passwordRepeat}
            />
          </>
        ) : (
          <Message color="red" content="something went wrong..." />
        )}
      </Widget>
      {isSubmit && <Message success>password succesfully updated!</Message>}
    </>
  );
};
export default PasswordUpdate;
