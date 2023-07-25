export interface InputValidator {
  pattern: RegExp;
  valid: boolean;
  firstTouch: boolean;
  error: string;
}
