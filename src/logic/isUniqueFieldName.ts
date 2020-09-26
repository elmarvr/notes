import { Field } from "../models";

export const isUniqueFieldName = (fields: Field[], name: string) =>
  !fields.map(({ ref: { name } }) => name).includes(name);
