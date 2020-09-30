import { FormEvent } from "react";

export const getFormElements = <T extends HTMLFormControlsCollection>(
  event: FormEvent<HTMLFormElement>
) => {
  return (event.target as HTMLFormElement).elements as T;
};
