import React from "react"

type HeaderUI = {
    children: React.ReactNode
}
export default function Header({ children }: HeaderUI){
    return (
        <header className="flex justify-center items-center h-10 pl-5 pr-5 pt-5">
            {children}
        </header>
    )
}