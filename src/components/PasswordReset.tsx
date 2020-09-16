import React from "react";

import { Card, Form, Button } from "semantic-ui-react";
import { Center, BackHeader } from "./styled/index";

import * as ROUTES from "../constants/routes";

const PasswordReset = () => (
  <Center>
    <Card fluid>
      <BackHeader to={ROUTES.SIGN_IN} title="Reset Password" />
      <Card.Content>
        <Form>
          <Form.Input size="large" label="Email:" type="text" />
          <Button size="large" primary fluid type="submit">
            Send
          </Button>
        </Form>
      </Card.Content>
    </Card>
  </Center>
);

export default PasswordReset;
