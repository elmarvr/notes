export interface TypeError {
  required?: string;
  validate?: string;
  pattern?: string;
  match?: string;
}

export interface FieldError {
  [field: string]: Error;
}
