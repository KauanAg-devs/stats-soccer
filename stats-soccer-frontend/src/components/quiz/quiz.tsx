'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Target } from 'lucide-react';
import axios from 'axios';

type Option = {
  id: number;
  question_id: number;
  text: string;
  index: number;
  created_at: string;
  updated_at: string;
};

type QuestionUI = {
  id: number;
  quiz_id: number;
  question: string;
  correct_option: number;
  created_at: string;
  updated_at: string;
  options: Option[];
  explanation?: string;
};

export type QuizProps = {
  quiz: {
    questions: QuestionUI[];
    title: string;
  };
};

type QuizAppUI = {
  id: string;
};

export default function QuizApp({ id }: QuizAppUI) {
  const [quiz, setQuiz] = useState<QuizProps['quiz'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleGetQuiz = async () => {
    try {
      const response = await axios(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/quizzes/filter/id/${id}`
      );
      setQuiz(response.data);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setQuiz(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetQuiz();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Carregando quiz...</div>;
  }

  if (!quiz) {
    return <div className="text-center text-red-500 py-10">Quiz não encontrado.</div>;
  }

  const questions = quiz.questions;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_option) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return 'GOLAÇO! Você é um craque no futebol! ⚽';
    if (percentage >= 80) return 'SHOW DE BOLA! Você manja muito de futebol! 🏆';
    if (percentage >= 60) return 'BOA JOGADA! Continue acompanhando o futebol! 📺';
    return 'FALTA TREINO! Continue assistindo mais jogos! 💪';
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 p-4 sm:p-8">
            <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 rounded-xl text-center p-4 sm:p-6 mb-6">
              <Trophy className="w-12 h-12 text-yellow-300 mx-auto mb-2" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">APITO FINAL!</h2>
              <p className="text-green-100 text-sm sm:text-base">⚽ Veja seu placar final ⚽</p>
            </div>

            <div className="text-center mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border-2 border-green-200">
              <div className="text-5xl sm:text-7xl font-bold mb-2 text-green-600">
                {score}/{questions.length}
              </div>
              <div className="text-lg sm:text-2xl font-semibold text-slate-700 mb-1">
                {Math.round((score / questions.length) * 100)}% de APROVEITAMENTO
              </div>
              <p className="text-base sm:text-xl text-green-700 font-bold">{getScoreMessage()}</p>
            </div>

            <div className="space-y-4 mb-6">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correct_option;
                return (
                  <div
                    key={question.id}
                    className={`border-2 rounded-xl p-3 sm:p-4 ${
                      isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <XCircle className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">
                          {question.question}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 bg-white/70 rounded-lg p-2">
                          <span className="font-bold">⚽ Sua resposta:</span>{' '}
                          {userAnswer !== undefined
                            ? question.options[userAnswer]?.text || 'Não respondido'
                            : 'Não respondido'}
                        </p>
                        <p className="text-xs sm:text-sm text-green-700 bg-green-100 rounded-lg p-2 font-semibold">
                          🎯 Resposta correta: {question.options[question.correct_option].text}
                        </p>
                        {question.explanation && (
                          <p className="text-xs sm:text-sm text-slate-600 bg-blue-50 rounded-lg p-2 italic">
                            💡 {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white font-bold py-4 rounded-xl hover:from-green-700 hover:via-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-lg"
            >
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
              🔄 NOVO JOGO
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 p-4 sm:p-8">
          <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">{quiz.title}</h1>
                <p className="text-green-100 text-xs sm:text-sm">⚽ Teste seus conhecimentos</p>
              </div>
            </div>
            <div className="text-right bg-white/10 rounded-xl p-2 sm:p-3 text-white text-xs sm:text-sm">
              <div>PERGUNTA</div>
              <div className="text-base sm:text-2xl font-bold">
                {currentQuestion + 1}/{questions.length}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-200 to-emerald-200 h-2 sm:h-3 rounded-full mb-4 relative overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500 ease-out"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 mb-6 border-2 border-green-200">
            <h2 className="text-base sm:text-xl font-bold text-slate-800 leading-relaxed">
              ⚽ {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-6">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:border-green-400 hover:bg-green-50 hover:shadow-md ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-green-500 bg-green-100 text-green-800 shadow-lg'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-green-500 bg-green-500'
                        : 'border-slate-300'
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-xs sm:text-base font-semibold">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 bg-white border-2 border-slate-200 rounded-xl text-sm sm:text-base font-semibold text-slate-700 py-4 px-3 sm:px-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="flex-1 bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white font-bold py-4 rounded-xl text-sm sm:text-base hover:from-green-700 hover:via-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
