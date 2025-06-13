import Quiz from "@/components/quiz/quiz";


type QuizParams = Promise<{
  id: string;
}>;

export default async function QuizPage({ params }: {params: QuizParams}) {
  const { id } = await params;

  return (
    <main className="relative min-h-screen p-8">
      <div className="absolute inset-0 bg-[url(/images/football-pitch-2.webp)] bg-cover object-center opacity-50"/>
      <Quiz id={id} />
    </main>
  );
}
