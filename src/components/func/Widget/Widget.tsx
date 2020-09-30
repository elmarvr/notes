import React, { FormEvent } from 'react';
import { PoseGroup } from 'react-pose';
import { Button, Divider, Form, Segment } from 'semantic-ui-react';

import Navigation from './Navigation/Navigation';
import Title from './Title/Title';

interface WidgetProps {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  disabled?: boolean;
}

const Widget: React.FC<WidgetProps> = ({
  children,
  onSubmit,
  loading,
  disabled,
}) => (
  <>
    <Title />
    <Segment>
      <Navigation />

      <Divider hidden />

      <Form error size="large" onSubmit={onSubmit}>
        {children}

        <Divider hidden />

        <Button
          disabled={disabled}
          loading={loading}
          color="blue"
          size="large"
          fluid
        >
          Submit
        </Button>
      </Form>
    </Segment>
  </>
);

export default Widget;
