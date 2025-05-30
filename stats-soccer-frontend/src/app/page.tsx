'use client';

import { useState } from "react";
import Header from "@/components/header/header";
import QuizGrid from "@/components/quiz/quiz-grid";
import RegisterMessage from "@/components/register/register-message";
import SearchInput from "@/components/ui/search-input";
import HeroBanner from "@/components/banner/hero-banner";
import Nav from "@/components/nav/nav";

export default function Home() {
  const [search, setSearch] = useState("");
  
  const MockedData = {cupsCovered: 4, topScore: '100%', totalQuestions: 4}
  const quizzes = [
    { name: '1966 World Cup Quiz', img: 'https://upload.wikimedia.org/wikipedia/en/e/e9/1966_FIFA_World_Cup.png', altImg: '1966 Cup', redirect: '/quiz/fifaworldcup/1966' },
    { name: '1970 World Cup Quiz', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/1970_FIFA_World_Cup.svg/250px-1970_FIFA_World_Cup.svg.png', altImg: '1970 Cup', redirect: '/quiz/fifaworldcup/1970' },
    { name: '2018 World Cup Quiz', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/2018_FIFA_World_Cup.svg/281px-2018_FIFA_World_Cup.svg.png?20150814170355', altImg: '2018 Cup', redirect: '/quiz/fifaworldcup/2018' },
    { name: '1958 World Cup Quiz', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/1958_FIFA_World_Cup.jpg/250px-1958_FIFA_World_Cup.jpg', altImg: '1958 Cup', redirect: '/quiz/fifaworldcup/1958' },
  ];

  const {cupsCovered, topScore, totalQuestions} = MockedData
  
  const filteredQuizzes = !search ? quizzes : quizzes.filter((quiz) =>
    quiz.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>    
    <RegisterMessage 
      registerMessage="Register to use all of our services – and be part of our community →" 
    />

    <Header>
      <Nav/>
      <HeroBanner
        cupsCovered={cupsCovered}
        topScore={topScore}
        totalQuestions={totalQuestions}
      />
      <SearchInput
        placeholder="What are you thinking about?"
        onSearch={setSearch}
      />
    </Header>

    <QuizGrid
      quizzes={filteredQuizzes}
      title=""
    />
    </>
  );
}
