export type Rule<T> =
  | {
      value: T;
      message: string;
    }
  | undefined;

export interface Rules {
  required?: string;
  validate?: Rule<(value: string) => boolean>;
  pattern?: Rule<RegExp>;
  match?: Rule<string>;
}

export interface Field extends Rules {
  input: HTMLInputElement;
}
