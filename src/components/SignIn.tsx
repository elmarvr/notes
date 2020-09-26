import React, { FormEvent } from "react";
import { FirebaseError } from "firebase/app";

import { useForm, useAuth } from "../hooks";

import { Card, Form, Button, Input } from "semantic-ui-react";
import { Anchor, Center, FormInput } from "./styled";

import { SignInElements } from "../models";

import * as ROUTES from "../constants/routes";

const SignIn = () => {
  const { register, errors, handleSubmit } = useForm();
  const auth = useAuth();

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("test");
  };

  return (
    <Center>
      <Card fluid>
        <Card.Content header="Sign in" textAlign="center" />
        <Card.Content>
          <Form onSubmit={handleSubmit(signIn)}>
            <Form.Field>
              <label>Email:</label>
              <Input />
            </Form.Field>

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
