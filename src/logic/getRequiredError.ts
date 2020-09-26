import { Rule, TypeError } from "../models";

import { isEmpty } from "../utils/isEmpty";

export const getRequiredError = (required: Rule<Boolean>, value: string) =>
  !!required?.value &&
  isEmpty(value) &&
  ({ required: required.message } as TypeError);
