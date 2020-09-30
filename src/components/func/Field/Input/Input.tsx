import React from 'react';

type InputProps = React.HTMLProps<HTMLInputElement> & { icon?: string };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, type = "text", icon, onChange }, ref) => (
    <div
      className={`form-transition ui fluid input ${icon ? "left icon" : ""}`}
    >
      <input
        className="form-transition"
        name={name}
        type={type}
        ref={ref}
        onChange={onChange}
      />
      {icon && <i className={`icon ${icon}`}></i>}
    </div>
  )
);

export default Input;
