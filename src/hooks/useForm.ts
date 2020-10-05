import { FormEvent, useEffect, useRef, useState } from 'react';

import { getFormErrors, getFormValues, isUniqueFieldName } from '../logic';
import { Field, FormError, FormErrors, FormValues, Rules } from '../models';
import { isEmpty } from '../utils/isEmpty';
import { isEqual } from '../utils/isEqual';

type InputEl = HTMLInputElement | null;

type SubmitCallback = (event: FormEvent<HTMLFormElement>) => void;

type Register = {
  (ref: InputEl): void;
  (rules: Rules): ((ref: InputEl) => void) | null;
};

const useForm = () => {
  const fieldsRef = useRef<Field[]>([]);
  const formValuesRef = useRef<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  const setError = (name: string, type: string, message?: string) => {
    const error = {
      type,
      message,
    };

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const addField = (node: InputEl, rules?: Rules) => {
    if (node && isUniqueFieldName(fieldsRef.current, node.name)) {
      fieldsRef.current.push({
        input: node,
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
    const fields = fieldsRef.current;
    const formValues = getFormValues(fields, event);
    const formErrors = getFormErrors(fields);

    if (!isEqual(formValuesRef.current, formValues)) {
      setErrors(formErrors);
      const isValid = isEmpty(formErrors);
      if (isValid) {
        callback(event);
      }
      formValuesRef.current = formValues;
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    setError,
  };
};

export default useForm;
