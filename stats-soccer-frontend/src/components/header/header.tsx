import React from "react"

type HeaderUI = {
    children: React.ReactNode
}
export default function Header({ children }: HeaderUI){
    return (
        <header className="flex flex-col justify-center items-center h-auto">

            {children}
            
        </header>
    )
}