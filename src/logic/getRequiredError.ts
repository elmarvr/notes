import { FormError } from '../models';
import { isEmpty } from '../utils/isEmpty';

export const getRequiredError = (
  required: string | undefined,
  value: string
): FormError | false =>
  required
    ? isEmpty(value) && {
        type: "required",
        message: required,
      }
    : false;
