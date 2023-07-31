import { InputValidator, CheckboxValidator } from "./Input";
export interface Ratings {
  _id: string;
  rating: number;
}

export interface RatingsDetails {
  _id: string;
  name: string;
  email: string;
  message: string;
  positives: string;
  negatives: string;
  rating: number;
  anonymus: boolean;
  hotel: string;
  createdAt: string;
}

export interface InputValidate extends Record<string, any> {
  name: InputValidator;
  email: InputValidator;
  message: InputValidator;
  positives?: InputValidator;
  negatives?: InputValidator;
  rating: InputValidator;
  anonymus?: CheckboxValidator;
  privacy: CheckboxValidator;
}
