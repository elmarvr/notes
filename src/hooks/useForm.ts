import { useRef, useState, FormEvent } from "react";
import { Rules, Field, FieldError } from "../models";

import { getFieldErrors, isUniqueFieldName } from "../logic";
import { isEmpty } from "../utils/isEmpty";

type InputEl = HTMLInputElement | null;

type SubmitCallback = (event: FormEvent<HTMLFormElement>) => void;

type Register = {
  (ref: InputEl): void;
  (rules: Rules): ((ref: InputEl) => void) | null;
};

const useForm = () => {
  const fieldArrayRef = useRef<Field[]>([]);
  const [errors, setErrors] = useState<FieldError>({});

  const addField = (ref: InputEl, rules?: Rules) => {
    if (ref && isUniqueFieldName(fieldArrayRef.current, ref.name)) {
      fieldArrayRef.current.push({
        ref,
        ...rules,
      });
    }
  };

  const register: Register = (arg: InputEl | Rules) => {
    if ((arg as InputEl)?.localName) {
      addField(arg as InputEl);
      return null;
    }
    return (ref: InputEl) => addField(ref, arg as Rules);
  };

  const handleSubmit = (callback: SubmitCallback) => {
    return (event: FormEvent<HTMLFormElement>) => {
      const formErrors = getFieldErrors(fieldArrayRef.current);

      setErrors(formErrors);

      const isValid = isEmpty(formErrors);

      if (isValid) {
        callback(event);
      }
    };
  };

  return {
    register,
    handleSubmit,
    errors,
  };
};

export default useForm;
