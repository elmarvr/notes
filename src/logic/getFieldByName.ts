import { Field } from '../models';

export const getFieldByName = (fields: Field[], name: string) => {
  const field = fields.find(
    ({ input: { name: fieldName } }) => fieldName === name
  );
  return field ? field : false;
};
