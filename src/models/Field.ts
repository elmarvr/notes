export type Rule<T> =
  | {
      value: T;
      message: string;
    }
  | undefined;

export interface Rules {
  required?: Rule<boolean>;
  validate?: Rule<(value: string) => boolean>;
  pattern?: Rule<RegExp>;
  match?: Rule<string>;
}

export interface Field extends Rules {
  ref: HTMLInputElement;
}
