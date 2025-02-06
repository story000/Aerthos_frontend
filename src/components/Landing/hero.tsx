"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ChartComponent from "../tv";
import ReactMarkdown from "react-markdown";
import Papa from "papaparse";
import ArticlesSection from "./ArticlesSection";
import SignalTable from "./SignalTable";

type Signal = {
    name: string;
    value: string;
    type: string;
};

type Article = {
    link: string;
    title: string;
    author: string;
    date: string;
};

const Hero: React.FC = () => {
    const router = useRouter();
    const [suggestions, setSuggestions] = useState("");
    const [signals, setSignals] = useState<Signal[]>([]);
    const [activeTab, setActiveTab] = useState("indicators");
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        // Fetch suggestions
        fetch("pics/suggestions.txt")
            .then((response) => {
                if (!response.ok) throw new Error("Failed to load suggestions");
                return response.text();
            })
            .then((data) => setSuggestions(data))
            .catch((error) => console.error("Error loading suggestions:", error));

        // Fetch signals from CSV file
        fetch("/pics/signals.csv")
            .then((response) => {
                if (!response.ok) throw new Error("Failed to load signals");
                return response.text();
            })
            .then((csvData) => {
                Papa.parse(csvData, {
                    header: true,
                    complete: (result) => {
                        const lastRow = result.data[result.data.length - 2] as { 
                            Composite_Signal?: string; 
                            "7_Day_ADI_Signal"?: string; 
                            "10_8_Day_Hilo_Channel_Signal"?: string; 
                            "20_Day_MA_vs_Price_Signal"?: string; 
                            "20-50_MA_Crossover_Signal"?: string; 
                            "Bollinger_Bands_Signal"?: string; 
                        };
                        const formattedSignals = [
                            { name: "Composite Signal", value: lastRow.Composite_Signal || "Hold", type: "composite" },
                            { name: "7-Day ADI Signal", value: lastRow["7_Day_ADI_Signal"] || "Hold", type: "short-term" },
                            { name: "10-8 Day Hilo Channel Signal", value: lastRow["10_8_Day_Hilo_Channel_Signal"] || "Hold", type: "short-term" },
                            { name: "20-Day MA vs Price Signal", value: lastRow["20_Day_MA_vs_Price_Signal"] || "Hold", type: "short-term" },
                            { name: "20-50 MA Crossover Signal", value: lastRow["20-50_MA_Crossover_Signal"] || "Hold", type: "short-term" },
                            { name: "Bollinger Bands Signal", value: lastRow["Bollinger_Bands_Signal"] || "Hold", type: "short-term" }
                        ];
                        setSignals(formattedSignals);
                    },
                    error: (error: any) => console.error("Error parsing CSV:", error)
                });
            })
            .catch((error: any) => console.error("Error loading signals:", error));

        // Fetch articles from opinions CSV file
        fetch("/pics/opinions.csv")
            .then((response) => {
                if (!response.ok) throw new Error("Failed to load articles");
                return response.text();
            })
            .then((csvData) => {
                Papa.parse(csvData, {
                    header: true,
                    complete: (result) => {
                        const formattedArticles = result.data
                            .filter((row: any) => row.link.includes("https://")) 
                            .map((row: any) => ({
                                link: row.link,
                                title: row.title,
                                author: row.author,
                                date: row.Date
                            }));
                        setArticles(formattedArticles);
                    },
                    error: (error: any) => console.error("Error parsing CSV:", error)
                });
            })
            .catch((error: any) => console.error("Error loading articles:", error));
    }, []);

    return (
        
        <div className="flex flex-col justify-center items-center gap-6 w-full">
            <h1 className="text-3xl font-bold animate-pulse">Aerthos</h1>
            <p className="px-[20%]">
                <strong className="text-[20px]">Aerthos</strong> is a climate finance and technology startup dedicated to bridging the climate finance gap 
                by providing innovative tools for carbon compliance, risk mitigation, and financial empowerment.
            </p>

            <h1 className="text-3xl font-bold font-mono">Carbon Price & Predictions</h1>

            <div className="flex justify-between w-full">
                <div className="w-1/2 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-center">Daily Price Chart</h1>
                    <ChartComponent />
                </div>
                <div className="w-1/2 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-center">Upcoming Forecast</h1>
                    <img src="pics/predictions_plot.png" alt="Trade Decision" className="h-[400px] object-cover" />
                </div>
            </div>

            <h1 className="text-3xl font-bold font-mono">Indicators & Suggestions</h1>

            <div className="flex justify-between w-full">
                <div className="w-1/2 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-center">Indicators Dashboard</h1>
                    <img src="pics/indicators_dashboard.png" alt="Indicators Dashboard" className="h-[400px] object-cover" />
                </div>
                <div className="w-1/2 flex flex-col items-center">
                    <SignalTable
                        signals={signals}
                        suggestions={suggestions}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>
            </div>
            
            <ArticlesSection articles={articles} />
            

            <button
                className="btn btn-neutral hover:opacity-80 active:opacity-90 mt-6"
                onClick={() => {
                    router.push("/");
                }}
            >
                Contact Us
            </button>
        </div>
    );
};

export default Hero;

