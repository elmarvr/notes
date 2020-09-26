import { Rule, Field, TypeError } from "../models";

import { getFieldByName } from "./getFieldByName";

const getMatchError = (match: Rule<string>, fields: Field[], value: string) => {
  if (match) {
    const matchField = getFieldByName(fields, match.value);
    return (
      !!matchField &&
      value === matchField.ref.name &&
      ({
        match: match.message,
      } as TypeError)
    );
  }
  return false;
};

export { getMatchError };
