type HeroBannerUI = {
  cupsCovered: number, 
  totalQuestions: number,
  topScore: string
}

export default function HeroBanner({ cupsCovered, totalQuestions, topScore}: HeroBannerUI) {
  return (
    <div className="relative isolate overflow-hidden bg-[#0d1b0d] py-24 sm:py-32 min-w-full">
     <img 
       src="/images/football-pitch-2.webp"
       width="1200"
       height="797"
       fetchPriority="high"
       decoding="async"
       alt=""
       className="absolute inset-0 -z-10 w-full h-full object-cover object-center opacity-60" 
     />


      <div className="absolute inset-0 -z-10 bg-black/10" />

      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[274.25px] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-gray-100 sm:text-7xl">
            The World Cup Awaits
          </h2>
          <p className="mt-8 text-lg font-medium text-zinc-300 sm:text-[1.125rem] leading-[2rem]">
            Test your knowledge of football history and the greatest tournament on Earth.
            From Pelé to Mbappé, see if you can beat the quiz.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold text-lime-400 sm:grid-cols-2 md:flex lg:gap-x-10">
            <a href="#" className="inline-flex items-center hover:text-lime-300 transition">
              Take a Quiz <span aria-hidden="true" className="ml-1">&rarr;</span>
            </a>
            <a href="#" className="inline-flex items-center hover:text-lime-300 transition">
              View Leaderboard <span aria-hidden="true" className="ml-1">&rarr;</span>
            </a>
            <a href="#" className="inline-flex items-center hover:text-lime-300 transition">
              About the Project <span aria-hidden="true" className="ml-1">&rarr;</span>
            </a>
            <a href="#" className="inline-flex items-center hover:text-lime-300 transition">
              Join Our Community <span aria-hidden="true" className="ml-1">&rarr;</span>
            </a>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 text-zinc-200">
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-base">Cups Covered</dt>
              <dd className="text-4xl font-semibold tracking-tight text-gray-100">{cupsCovered}</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-base">Total Questions</dt>
              <dd className="text-4xl font-semibold tracking-tight text-gray-100">{totalQuestions}</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-base">Top Score</dt>
              <dd className="text-4xl font-semibold tracking-tight text-gray-100">{topScore}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1b0d] to-transparent -z-0" />
    </div>
  )
}
