'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Target, Home, ChevronLeft, ChevronRight, Clock, Award } from 'lucide-react';
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
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleGetQuiz = async () => {
    try {
      const response = await axios(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/quizzes/filter/id/${id}`
      );
      setQuiz(response.data);
      setStartTime(new Date());
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setQuiz(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetQuiz();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-slate-700 animate-pulse">
            ⚽ Preparando seu quiz...
          </p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 border-2 border-red-200">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Ops! Quiz não encontrado</h2>
          <p className="text-slate-600">Verifique o link e tente novamente.</p>
        </div>
      </div>
    );
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
      setEndTime(new Date());
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
    setStartTime(new Date());
    setEndTime(null);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { message: 'GOLAÇO! Você é um craque no futebol!', emoji: '⚽', color: 'from-yellow-400 to-orange-500' };
    if (percentage >= 80) return { message: 'SHOW DE BOLA! Você manja muito de futebol!', emoji: '🏆', color: 'from-green-400 to-emerald-500' };
    if (percentage >= 60) return { message: 'BOA JOGADA! Continue acompanhando o futebol!', emoji: '📺', color: 'from-blue-400 to-cyan-500' };
    return { message: 'FALTA TREINO! Continue assistindo mais jogos!', emoji: '💪', color: 'from-red-400 to-pink-500' };
  };

  const getTimeTaken = () => {
    if (!startTime || !endTime) return '';
    const diffMs = endTime.getTime() - startTime.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const scoreInfo = getScoreMessage();
    const timeTaken = getTimeTaken();
    
    return (
      <>
        {/* Campo de futebol pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 50%, transparent 50%),
              linear-gradient(rgba(255,255,255,0.05) 50%, transparent 50%)
            `,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        {/* Animated stadium lights */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-green-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 right-1/3 w-36 h-36 bg-yellow-300/15 rounded-full blur-2xl animate-pulse delay-1500"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-300/40 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-yellow-200/20 rounded-full animate-bounce delay-1200"></div>
        </div>
        
        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-green-900/50 to-green-900/80 pointer-events-none"></div>

        <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
          <div className="max-w-4xl w-full">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8">
              {/* Header with trophy animation */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <Trophy className="w-20 h-20 text-yellow-500 animate-bounce" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-ping">
                    <span className="text-xs font-bold text-white">🎉</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
                  APITO FINAL!
                </h1>
                <p className="text-slate-600 text-lg">⚽ Confira seu desempenho no quiz ⚽</p>
              </div>

              {/* Score display */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-green-200/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-transparent"></div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl md:text-8xl font-black text-green-600 mb-4 animate-pulse">
                    {score}/{questions.length}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                    <div className="bg-white/80 rounded-xl px-4 py-2 border border-green-200">
                      <div className="text-2xl md:text-3xl font-bold text-slate-700">
                        {Math.round((score / questions.length) * 100)}%
                      </div>
                      <div className="text-sm text-slate-500">Aproveitamento</div>
                    </div>
                    {timeTaken && (
                      <div className="bg-white/80 rounded-xl px-4 py-2 border border-green-200 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-slate-500" />
                        <div>
                          <div className="text-xl font-bold text-slate-700">{timeTaken}</div>
                          <div className="text-sm text-slate-500">Tempo</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`inline-block bg-gradient-to-r ${scoreInfo.color} text-white px-6 py-3 rounded-full text-lg md:text-xl font-bold shadow-lg`}>
                    {scoreInfo.emoji} {scoreInfo.message}
                  </div>
                </div>
              </div>

              {/* Results breakdown */}
              <div className="space-y-4 mb-8 max-h-96 overflow-y-auto custom-scrollbar">
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correct_option;
                  return (
                    <div
                      key={question.id}
                      className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                        isCorrect 
                          ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50' 
                          : 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50'
                      }`}
                    >
                      <div className="p-4 md:p-6">
                        <div className="flex items-start gap-4">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                            isCorrect ? 'bg-green-500' : 'bg-red-500'
                          } shadow-lg`}>
                            {isCorrect ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <XCircle className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 mb-3 text-base md:text-lg leading-relaxed">
                              {index + 1}. {question.question}
                            </h4>
                            <div className="space-y-2">
                              <div className="bg-white/70 rounded-lg p-3 border border-slate-200">
                                <span className="font-semibold text-slate-600">⚽ Sua resposta:</span>{' '}
                                <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                                  {userAnswer !== undefined
                                    ? question.options[userAnswer]?.text || 'Não respondido'
                                    : 'Não respondido'}
                                </span>
                              </div>
                              {!isCorrect && (
                                <div className="bg-green-100 rounded-lg p-3 border border-green-200">
                                  <span className="font-semibold text-green-700">🎯 Resposta correta:</span>{' '}
                                  <span className="text-green-800">
                                    {question.options[question.correct_option].text}
                                  </span>
                                </div>
                              )}
                              {question.explanation && (
                                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                  <span className="font-semibold text-blue-700">💡 Explicação:</span>{' '}
                                  <span className="text-blue-800 italic">{question.explanation}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={resetQuiz}
                  className="flex-1 bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-green-700 hover:via-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <RotateCcw className="w-6 h-6" />
                  🔄 JOGAR NOVAMENTE
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="flex-1 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-slate-700 hover:via-slate-600 hover:to-slate-700 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Home className="w-6 h-6" />
                  🏠 INÍCIO
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #10b981;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #059669;
          }
        `}</style>
      </>
    );
  }


  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      {/* Campo de futebol pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 50%, transparent 50%),
            linear-gradient(rgba(255,255,255,0.05) 50%, transparent 50%)
          `,
          backgroundSize: '80px 80px'
        }}></div>
      </div>
      
      {/* Animated stadium lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-white/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-300/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-yellow-200/15 rounded-full animate-bounce delay-1200"></div>
      </div>
      
      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-green-900/30 to-green-900/60 pointer-events-none"></div>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="max-w-4xl w-full">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-emerald-600/90"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl font-black text-white">{quiz.title}</h1>
                  <p className="text-green-100 text-sm md:text-base">⚽ Teste seus conhecimentos sobre futebol</p>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-white relative z-10">
                <div className="text-center">
                  <div className="text-sm font-semibold text-green-100">PERGUNTA</div>
                  <div className="text-2xl md:text-4xl font-black">
                    {currentQuestion + 1}<span className="text-green-200">/{questions.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative mb-8">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 h-4 rounded-full overflow-hidden border-2 border-green-200/50">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-700 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-sm font-semibold text-slate-600">
                  {Math.round(progress)}% concluído
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-green-200/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400"></div>
              <h2 className="text-lg md:text-2xl font-bold text-slate-800 leading-relaxed">
                ⚽ {questions[currentQuestion].question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-green-500 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 shadow-lg scale-[1.02]'
                      : 'border-slate-200 bg-white hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-3 flex items-center justify-center transition-all duration-300 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-green-500 bg-green-500 scale-110'
                          : 'border-slate-300 group-hover:border-green-400'
                      }`}
                    >
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <span className="text-sm md:text-lg font-semibold flex-1">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1 bg-white border-2 border-slate-200 rounded-2xl text-base md:text-lg font-bold text-slate-700 py-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Anterior
              </button>
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="flex-1 bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-2xl text-base md:text-lg hover:from-green-700 hover:via-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {currentQuestion === questions.length - 1 ? (
                  <>
                    <Award className="w-5 h-5" />
                    Finalizar Quiz
                  </>
                ) : (
                  <>
                    Próxima
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}