import { Field } from '../models';

export const isUniqueFieldName = (fields: Field[], name: string) =>
  !fields.map(({ input: { name } }) => name).includes(name);
