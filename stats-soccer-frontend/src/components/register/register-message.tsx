type RegisterMessageUI = {
    registerMessage: string
}

export default function RegisterMessage({registerMessage}: RegisterMessageUI){
    return (
      <div className="relative isolate flex items-center justify-between gap-x-6 overflow-hidden bg-zinc-100 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-sm/6 text-gray-900">
                <strong className="font-semibold">StatsSoccer 2025</strong>
                <svg viewBox="0 0 2 2" className="mx-2 inline size-0.5 fill-current" aria-hidden="true">
                    <circle cx="1" cy="1" r="1" />
                </svg>
                {registerMessage}	
                </p>
        </div>

        <div className="flex flex-[190]"></div>


        <div className="flex flex-1 justify-end">
            <button type="button" className="-m-3 p-3 focus-visible:-outline-offset-4">
            <span className="sr-only">Dismiss</span>
            <svg className="size-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
            </button>
        </div>
      </div>
    )
}