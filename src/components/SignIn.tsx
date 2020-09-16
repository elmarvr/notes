import React, { FormEvent } from "react";
import { FirebaseError } from "firebase/app";

import { useForm, useAuth } from "../hooks";

import { Card, Form, Button } from "semantic-ui-react";
import { Anchor, Center, FormInput } from "./styled";

import { SignInElements } from "../models";

import * as ROUTES from "../constants/routes";

const SignIn = () => {
  const { register, errors, handleSubmit, setError } = useForm();
  const auth = useAuth();

  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEL = e.target as HTMLFormElement;
    const { email, password } = formEL.elements as SignInElements;

    try {
      const user = await auth.signIn(email.value, password.value);
    } catch (ex) {
      const error = ex as FirebaseError;

      switch (error.code) {
        case "auth/user-not-found":
          {
            setError("email", "username not found");
          }
          break;
        case "auth/wrong-password":
          {
            setError("password", "password incorrect");
          }
          break;
        case "auth/too-many-requests":
          {
            setError("email", "request limit reached");
          }
          break;
      }
    }
  };

  return (
    <Center>
      <Card fluid>
        <Card.Content header="Sign in" textAlign="center" />
        <Card.Content>
          <Form onSubmit={handleSubmit(signIn)}>
            <FormInput
              name="email"
              label="Email:"
              type="text"
              ref={register({
                required: true,
                pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                error: {
                  required: "this is required",
                  pattern: "invalid email address",
                },
              })}
              errors={errors}
            />

            <FormInput
              name="password"
              label="Password:"
              type="password"
              ref={register({ required: true, error: "this is required" })}
              errors={errors}
            />
            <Button size="large" primary fluid type="submit">
              Login
            </Button>
          </Form>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Anchor to={ROUTES.PASSWORD_RESET}>Forgot Password?</Anchor>
        </Card.Content>
      </Card>
      <p>
        Don't have a account? <Anchor to={ROUTES.SIGN_UP}>Sign Up</Anchor>
      </p>
    </Center>
  );
};

export default SignIn;
