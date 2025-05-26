'use client'

import { useState } from 'react'

type Question = {
  question: string
  options: string[]
}

export type QuizProps = {
  quiz: {
    title: string
    questions: Question[]
  }
}

export default function Quiz({ quiz }: QuizProps) {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(quiz.questions.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  function handleSelect(questionIndex: number, option: string) {
    if (submitted) return 
    const newAnswers = [...answers]
    newAnswers[questionIndex] = option
    setAnswers(newAnswers)
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>

      {quiz.questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="mb-2">{q.question}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((option) => (
              <button
                key={option}
                className={`p-2 border rounded ${
                  answers[i] === option ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
                onClick={() => handleSelect(i, option)}
                disabled={submitted}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={submitted || answers.includes(null)}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        Submit
      </button>

      {submitted && <p className="mt-4 text-lg">Thanks for submitting!</p>}
    </div>
  )
}
