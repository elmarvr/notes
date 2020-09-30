import { FormEvent, useEffect, useRef, useState } from 'react';

import { getFieldErrors, isUniqueFieldName } from '../logic';
import { Field, FieldError, Rules } from '../models';
import { isEmpty } from '../utils/isEmpty';

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

  const handleSubmit = (callback: SubmitCallback) => (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formErrors = getFieldErrors(fieldArrayRef.current);

    setErrors(formErrors);

    const isValid = isEmpty(formErrors);

    if (isValid) {
      callback(event);
    }
  };

  const setError = (name: string, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  return {
    register,
    handleSubmit,
    errors,
    setError,
  };
};

export default useForm;
