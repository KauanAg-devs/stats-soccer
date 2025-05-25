import { notFound } from "next/navigation"

const database = {
  "fifaworldcup": {
    "1970": {
      "title": "1970 oi"
    }
  }
}

type QuizParam = {
  params: {
    category: keyof typeof database;
    id: keyof typeof database;
  }
}

export default async function QuizPage({params}: QuizParam){
  const {id, category} = await params
  
  if(!(category in database) || !(id in database[category])){
    return notFound()
  }
    
  return (
    <>
      <h1>{database[category][id].title}</h1>
    </>
    )
  }
