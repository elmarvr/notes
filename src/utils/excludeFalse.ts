export const excludeFalse = <T>(value: T | boolean): value is T => !!value;
