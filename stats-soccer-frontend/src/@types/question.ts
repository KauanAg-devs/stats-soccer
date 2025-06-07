import { Option } from "./option";

export interface Question {
  id: number;
  quiz_id: number;
  question: string;
  correct_option: number;
  created_at: string;
  updated_at: string;
  options: Option[];
}

