import { FormEvent } from 'react';

import { Field, FormValues } from '../models';
import { getFormElements } from '../utils/getFormElements';

const getFieldValue = (event: FormEvent<HTMLFormElement>, name: string) => {
  const elements = getFormElements<any>(event);
  return elements[name].value;
};

export const getFormValues = (
  fields: Field[],
  event: FormEvent<HTMLFormElement>
): string[] => fields.map((field) => getFieldValue(event, field.input.name));
