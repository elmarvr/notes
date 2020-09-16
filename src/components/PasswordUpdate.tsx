import React from "react";

import { Card, Form, Button } from "semantic-ui-react";
import { Center } from "./styled/index";

const PasswordUpdate = () => (
  <Center>
    <Card fluid>
      <Card.Content header="Change Password" textAlign="center" />
      <Card.Content>
        <Form>
          <Form.Input size="large" label="New Password:" type="password" />
          <Form.Input
            size="large"
            label="Confirm New Password:"
            type="password"
          />
          <Button size="large" primary fluid type="submit">
            Update
          </Button>
        </Form>
      </Card.Content>
    </Card>
  </Center>
);

export default PasswordUpdate;
