"use client"

import { useRouter } from "next/navigation"
import React from "react"
import ChartComponent from "../tv"
const Hero: React.FC = () => {
    const router = useRouter()

    return (
        <div className="flex flex-col justify-center items-center gap-6 w-full">
            <h1 className="text-3xl font-bold animate-pulse">Aerthos</h1>
            <p className="px-[20%]">
                <strong className="text-[20px]">Aerthos</strong> is a climate finance and technology startup dedicated to bridging the climate finance gap 
by providing innovative tools for carbon compliance, risk mitigation, and financial empowerment. 
            </p>
            <h1 className="text-2xl font-bold">Daily Price Chart</h1>
            <ChartComponent />
            <button
                className="btn btn-neutral hover:opacity-80 active:opacity-90"
                onClick={() => {
                    router.push("/")
                }}
            >
            Contact Us
            </button>
            
        </div>
    )
}

export default Hero
