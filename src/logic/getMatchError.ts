import { Field, FormError, Rule } from '../models';
import { getFieldByName } from './getFieldByName';

const getMatchError = (
  match: Rule<string>,
  fields: Field[],
  value: string
): FormError | false => {
  if (match) {
    const matchField = getFieldByName(fields, match.value);
    return (
      !!matchField &&
      value !== matchField.input.value && {
        type: "match",
        message: match.message,
      }
    );
  }
  return false;
};

export { getMatchError };
