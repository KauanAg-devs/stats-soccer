'use client';

import { useEffect, useState } from "react";
import Header from "@/components/header/header";
import QuizGrid from "@/components/quiz/quiz-grid";
import RegisterMessage from "@/components/register/register-message";
import SearchInput from "@/components/ui/search-input";
import HeroBanner from "@/components/banner/hero-banner";
import axios from "axios";
import { Quiz } from "@/@types/quiz";

export default function Home() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleGetQuizzes = async (search: string = '')=> {
    try {
      const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/quizzes/filter/${search}`); 
      setQuizzes(response.data)
    } catch(err) {
      console.log('Erro ao buscar dados:', err);  
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log(isLoading);
      
      await handleGetQuizzes('');
      setIsLoading(false)
      console.log(isLoading);
      
    }
      fetchData();
  }, []);
  
  const MockedData = {cupsCovered: 4, topScore: '100%', totalQuestions: 4}
  const {cupsCovered, topScore, totalQuestions} = MockedData
 
  return (
    <>    
    <RegisterMessage 
      registerMessage="Register to use all of our services – and be part of our community →" 
    />

    <Header>
      {/*<Nav/>*/}
      <HeroBanner
        cupsCovered={cupsCovered}
        topScore={topScore}
        totalQuestions={totalQuestions}
      />
      <SearchInput
        placeholder="What are you thinking about?"
        handleGetQuizzes={handleGetQuizzes}
      />
    </Header>

{isLoading ? (
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className="grid grid-cols-2 gap-4 md:gap-16 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="group">
          <div className="w-full max-w-[160px] mx-auto aspect-[3/4] rounded-md overflow-hidden bg-gray-200 animate-pulse sm:max-w-none dark:bg-gray-700" />
          <div className="mt-2 h-4 w-3/4 mx-auto bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
        </div>
      ))}
    </div>
  </div>
) : (
  <QuizGrid quizzes={quizzes} title="" />
)}



    </>
  );
}
