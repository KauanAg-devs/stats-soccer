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
  const [search, setSearch] = useState('');
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  
  const handleGetQuizzes = async (search: string)=> {
    const response = await axios(`http://localhost:8000/api/quizes/filter/${search}`); 
    setQuizzes(response.data)
  }

  useEffect(() => {
    const fetchData = async () => {
    try {
      await handleGetQuizzes('')
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
    };

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
        onSearch={setSearch}
        handleGetQuizzes={handleGetQuizzes}
      />
    </Header>

    <QuizGrid
      quizzes={quizzes!}
      title=""
    />
    </>
  );
}
