import React, { RefObject } from "react";

import { Errors } from "../../../models";

interface ErrorMessageProps {
  error: string | false;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) =>
  error ? <div className="ui pointing below prompt label">{error}</div> : null;

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  errors?: Errors;
  ref:
    | RefObject<HTMLInputElement>
    | ((instance: HTMLInputElement | null) => void)
    | null;
}

const FormInput: React.FC<FormFieldProps> = React.forwardRef<
  HTMLInputElement,
  FormFieldProps
>((props, ref) => {
  const error = props.errors ? props.errors[props.name] : false;

  return (
    <div className={`field ${error ? "error" : ""}`}>
      <label>{props.label}</label>
      <ErrorMessage error={error} />
      <div className="ui input large">
        <input name={props.name} type={props.type} ref={ref} />
      </div>
    </div>
  );
});

export default FormInput;
