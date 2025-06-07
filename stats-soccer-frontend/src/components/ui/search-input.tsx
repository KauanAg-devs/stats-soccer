'use client';

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./input";

type SearchInputUI = {
  placeholder: string;
  onSearch: (value: string) => void;
  handleGetQuizzes: (search?: string) => Promise<void>
};

export default function SearchInput({ placeholder, onSearch, handleGetQuizzes }: SearchInputUI) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="relative w-96 md:w-[35rem] h-11 mt-5">

    <Input
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSearch(inputValue);
        }
      }}
      className="w-full pr-8 placeholder-zinc-500 border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />


    <button
      onClick={() => handleGetQuizzes(inputValue)}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400"
    >
      <Search className="h-6 w-6" />
    </button>


    </div>
  );
}
