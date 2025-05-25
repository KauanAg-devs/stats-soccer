import React from "react"

export type QuizUI = {
  name: string
  img: string
  altImg?: string
  redirect: string
}

type QuizGridProps = {
  title: string
  quizzes: QuizUI[]
}

const QuizGrid: React.FC<QuizGridProps> = ({ title, quizzes }) => {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">{title}</h2>
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
  {quizzes.map((quiz) => (
    <a href={quiz.redirect} className="group" key={quiz.name}>
      <div className="w-full max-w-[160px] mx-auto aspect-[3/4] rounded-md overflow-hidden bg-gray-200 sm:max-w-none">
        <img
          src={quiz.img}
          alt={quiz.altImg || quiz.name}
          className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-2 text-center text-sm text-zinc-200 font-medium">{quiz.name}</h3>
    </a>
  ))}
</div>

      </div>
    </div>
  )
}

export default QuizGrid
