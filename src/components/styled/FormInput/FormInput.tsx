import React, { RefObject } from "react";

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  ref:
    | RefObject<HTMLInputElement>
    | ((instance: HTMLInputElement | null) => void)
    | null;
}

const FormInput: React.FC<FormFieldProps> = React.forwardRef<
  HTMLInputElement,
  FormFieldProps
>((props, ref) => {
  return (
    <div className="field">
      <label>{props.label}</label>

      <div className="ui input large">
        <input name={props.name} type={props.type} ref={ref} />
      </div>
    </div>
  );
});

export default FormInput;
