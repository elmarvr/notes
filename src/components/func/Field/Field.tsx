import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

import Error from './Error/Error';
import Input from './Input/Input';

type FieldProps = React.HTMLProps<HTMLInputElement> & {
  label?: string;
  icon?: string;
  errors?: (string | boolean | undefined)[];
  name: string;
};

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ type, label, icon, name, errors, onChange }, ref) => {
    const message = errors?.find((error) => !!error);
    const [error, setError] = useState(false);

    const handleComplete = () => {
      setError(!error);
    };

    return (
      <Form.Field error={!!message}>
        {label && (
          <label className="form-transition" style={{ textAlign: "left" }}>
            {label}
          </label>
        )}

        <Input
          onChange={onChange}
          name={name}
          type={type}
          icon={icon}
          ref={ref}
        />

        <Error message={message} onComplete={handleComplete} />
      </Form.Field>
    );
  }
);

export default Field;
