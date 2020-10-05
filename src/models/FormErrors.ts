export interface FormErrors {
  [field: string]: FormError | undefined;
}

export interface FormError {
  type: string;
  message?: string;
}
