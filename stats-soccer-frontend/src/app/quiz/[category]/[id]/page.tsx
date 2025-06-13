import Quiz, { QuizProps } from "@/components/quiz/quiz";
import { notFound } from "next/navigation";


type QuizParams = Promise<{
  category: string;
  id: string;
}>;

export default async function QuizPage({ params }: {params: QuizParams}) {
  const { category, id } = await params;

  return (
    <main className="relative min-h-screen p-8">
      <div className="absolute inset-0 bg-[url(/images/football-pitch-2.webp)] bg-cover object-center opacity-50"/>
      <Quiz category={category} id={id} />
    </main>
  );
}
