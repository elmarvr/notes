import { isEmpty } from '../utils/isEmpty';

export const getRequiredError = (required: string | undefined, value: string) =>
  required ? isEmpty(value) && required : false;
