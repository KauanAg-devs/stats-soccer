import Quiz from "@/components/quiz/quiz";


type QuizParams = Promise<{
  id: string;
}>;

export default async function QuizPage({ params }: {params: QuizParams}) {
  const { id } = await params;

  return (
    <main className="relative min-h-screen p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 bg-cover object-center"/>
      <Quiz id={id} />
    </main>
  );
}
