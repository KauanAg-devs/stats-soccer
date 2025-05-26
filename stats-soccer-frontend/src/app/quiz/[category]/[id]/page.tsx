import Quiz, { QuizProps } from "@/components/quiz/quiz";
import { notFound } from "next/navigation";

const database = {
  fifaworldcup: {
    "1970": {
      "title": "Fifa World Cup 1970 Quiz",
      "questions": [
        {"question": "who won the 1970 World Cup?", options: ['Argentina', 'Brazil', 'Italia', 'Germany']}
      ]
    },
  },
} as const;

type Database = typeof database;
type Category = keyof Database;
type Id<C extends Category> = keyof Database[C];

type QuizParam = {
  params: {
    category: string;
    id: string;
  }
};

export default async function QuizPage({ params }: QuizParam) {
  const { id, category } = await params;

  if (!(category in database)) return notFound();

  const categoryData = database[category as Category];

  if (!(id in categoryData)) return notFound();

  const quiz = categoryData[id as keyof typeof categoryData] as unknown as QuizProps['quiz'];

  return (
    <main className="p-8">
      <Quiz
        quiz={quiz}
      />
    </main>
  );
}
