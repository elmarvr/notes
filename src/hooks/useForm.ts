import { useRef, useState, FormEvent } from "react";
import { Errors } from "../models";
import { FormProps } from "semantic-ui-react";

type InputEl = HTMLInputElement | null;

type SubmitCallback = (event: FormEvent<HTMLFormElement>) => void;

type ErrorMessage =
  | {
      required?: string;
      validate?: string;
      pattern?: string;
      match?: string;
    }
  | string;

interface Rules {
  required?: boolean;
  validate?: (...args: any[]) => boolean;
  pattern?: RegExp;
  match?: string;
  error?: ErrorMessage;
}

interface Field extends Rules {
  ref: InputEl;
}

type Register = {
  (ref: InputEl): void;
  (rules: Rules): ((ref: InputEl) => void) | null;
};

const useForm = () => {
  const fields = useRef<Field[]>([]);
  const [errors, setErrors] = useState<Errors>({});

  const hasUniqueName = (ref: InputEl) => {
    if (ref) {
      if (ref.name) {
        const names = fields.current.map((field) => field.ref?.name);
        if (names.includes(ref.name)) {
          return false;
        }
        return true;
      }

      return false;
    }
  };

  const registerWithRules = (ref: InputEl, rules: Rules) => {
    if (hasUniqueName(ref)) {
      fields.current.push({
        ref,
        ...rules,
      });
    }
  };

  const register: Register = (arg: InputEl | Rules) => {
    if ((arg as InputEl)?.localName) {
      arg = arg as InputEl;

      if (hasUniqueName(arg)) {
        fields.current.push({
          ref: arg,
        });
      }

      return null;
    } else {
      return (ref: InputEl) => registerWithRules(ref, arg as Rules);
    }
  };

  const setError = (name: string, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  const addFieldError = (
    field: Field,
    type: "required" | "pattern" | "validate" | "match"
  ) => {
    const { ref, error } = field;
    if (error) {
      let message: string;

      if (typeof error === "string") {
        message = error;
      } else if (error[type]) {
        message = error[type]!;
      }

      setErrors((prev) => ({
        ...prev,
        [ref!.name]: message,
      }));
    }
  };

  const removeError = (field: Field) => {
    setErrors((prev) => ({
      ...prev,
      [field.ref!.name]: false,
    }));
  };

  const validateRequired = (field: Field, value: string) => {
    if (field.required) {
      if (value !== "") {
        return true;
      }
      addFieldError(field, "required");
      return false;
    }
    return true;
  };

  const validateCallback = (field: Field, value: string) => {
    if (field.validate) {
      if (field.validate(value)) {
        return true;
      }
      addFieldError(field, "validate");
      return false;
    }
    return true;
  };

  const validatePattern = (field: Field, value: string) => {
    if (field.pattern) {
      if (field.pattern.test(value)) {
        return true;
      }
      addFieldError(field, "pattern");
      return false;
    }
    return true;
  };

  const validateMatch = (field: Field, value: string) => {
    if (field.match) {
      const matchingField = fields.current.find(
        (other) => other.ref?.name === field.match
      );

      const otherValue = matchingField?.ref?.value;

      if (value === otherValue) {
        return true;
      }

      addFieldError(field, "match");
      return false;
    }
    return true;
  };

  const validateField = (field: Field) => {
    removeError(field);

    if (field.ref) {
      let { value } = field.ref;
      value = value.trim().toLowerCase();

      if (!validateRequired(field, value)) {
        return false;
      }

      if (!validateCallback(field, value)) {
        return false;
      }

      if (!validatePattern(field, value)) {
        return false;
      }

      if (!validateMatch(field, value)) {
        return false;
      }

      return true;
    }
  };

  const validateFields = () =>
    !fields.current.map(validateField).includes(false);

  const handleSubmit = (callback: SubmitCallback) => {
    return (event: FormEvent<HTMLFormElement>) => {
      const isValid = validateFields();
      if (isValid) {
        callback(event);
      }
    };
  };

  return {
    register,
    handleSubmit,
    errors,
    setError,
  };
};

export default useForm;
