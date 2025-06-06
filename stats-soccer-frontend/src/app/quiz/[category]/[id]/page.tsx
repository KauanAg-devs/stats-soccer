import Quiz, { QuizProps } from "@/components/quiz/quiz";
import { notFound } from "next/navigation";

const database = {
  fifaworldcup: {
    "1970": {
      title: "Fifa World Cup 1970 Quiz",
      questions: [
        {
          question: "who won the 1970 World Cup?",
          options: ["Argentina", "Brazil", "Italia", "Germany"],
          correct: 1
        },
          {
          question: "who won the 1970 World Cup?",
          options: ["Argentina", "Brazil", "Italia", "Germany"],
          correct: 1
        },
      ],
    },
  },
} as const;

type QuizParams = Promise<{
  category: string;
  id: string;
}>;

export default async function QuizPage({ params }: {params: QuizParams}) {
  const { category, id } = await params;

  if (!(category in database)) return notFound();

  const categoryData = database[category as keyof typeof database];

  if (!(id in categoryData)) return notFound();

  const quiz = categoryData[id as keyof typeof categoryData] as unknown as QuizProps["quiz"];

  return (
    <main className="relative min-h-screen p-8">
      <div className="absolute inset-0 bg-[url(/images/football-pitch-2.webp)] bg-cover object-center opacity-50"/>
      <Quiz quiz={quiz} />
    </main>
  );
}
