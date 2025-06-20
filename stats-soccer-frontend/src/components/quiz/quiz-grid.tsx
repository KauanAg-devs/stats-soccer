import { Quiz } from "@/@types/quiz"
import Image from "next/image"
import React from "react"
import { useRouter } from 'next/navigation'

type QuizGridProps = {
  title: string
  quizzes: Quiz[]
}

const QuizGrid: React.FC<QuizGridProps> = ({ title, quizzes }) => {
  const router = useRouter()

  const handleStartQuiz = (quiz: Quiz) => {
    router.push(`quiz/${quiz.category}/${quiz.id}`)
  }

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">{title}</h2>
        <div className="grid grid-cols-2 gap-4 md:gap-16 sm:grid-cols-3 lg:grid-cols-4">
          {quizzes.map((quiz, index) => (
            <button onClick={() => handleStartQuiz(quiz)} className="group" key={index}>
              <div className="w-full max-w-[160px] mx-auto aspect-[3/4] rounded-md overflow-hidden bg-gray-200 sm:max-w-none">
                <Image
                  src={quiz.img}
                  alt={quiz.name}
                  className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
                  width={2000}
                  height={2000}
                />
              </div>
              <h3 className="mt-2 text-center text-sm text-zinc-800 font-medium">{quiz.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuizGrid
