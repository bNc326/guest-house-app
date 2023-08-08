export interface InputValidator {
  pattern?: RegExp;
  value: string;
  valid: boolean;
  firstTouch?: boolean;
  error?: string;
  required: boolean;
}

export interface CheckboxValidator {
  checked: boolean;
  firstTouch?: boolean;
  error?: string;
  required: boolean;
}
