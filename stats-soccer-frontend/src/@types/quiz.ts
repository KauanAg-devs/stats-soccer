import { Question } from "./question";

export interface Quiz {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  img: string;
  category: string;
  year: string;
  questions: Question[];
}


