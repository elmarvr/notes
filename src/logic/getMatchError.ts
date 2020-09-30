import { Rule, Field } from "../models";

import { getFieldByName } from "./getFieldByName";

const getMatchError = (match: Rule<string>, fields: Field[], value: string) => {
  if (match) {
    const matchField = getFieldByName(fields, match.value);
    return !!matchField && value !== matchField.ref.value && match.message;
  }
  return false;
};

export { getMatchError };
