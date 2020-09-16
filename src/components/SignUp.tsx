import React, { FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { useForm, useAuth } from "../hooks";

import { Card, Form, Button } from "semantic-ui-react";
import { Center, BackHeader, FormInput } from "./styled";

import { SignUpElements } from "../models";

import * as ROUTES from "../constants/routes";

const SignUp = () => {
  const history = useHistory();
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();

  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEL = e.target as HTMLFormElement;
    const { email, passwordOne } = formEL.elements as SignUpElements;

    const user = await auth.signUp(email.value, passwordOne.value);
  };

  return (
    <Center>
      <Card fluid>
        <BackHeader to={ROUTES.SIGN_IN} title="Sign Up" />
        <Card.Content>
          <Form onSubmit={handleSubmit(signUp)}>
            <FormInput
              ref={register({
                required: true,
                pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                error: {
                  required: "this is required",
                  pattern: "invalid email address",
                },
              })}
              name="email"
              label="Email:"
              type="text"
              errors={errors}
            />
            <FormInput
              ref={register({
                required: true,
                validate: (value) => value.length >= 6,
                error: {
                  required: "this is required",
                  validate: "password needs to be at least 6 characters long",
                },
              })}
              name="passwordOne"
              label="Password:"
              type="password"
              errors={errors}
            />
            <FormInput
              ref={register({
                required: true,
                match: "passwordOne",
                error: {
                  required: "this is required",
                  match: "passwords don't match",
                },
              })}
              name="passwordTwo"
              label="Confirm Password:"
              type="password"
              errors={errors}
            />

            <Button size="large" primary fluid type="submit">
              Login
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Center>
  );
};

export default SignUp;
