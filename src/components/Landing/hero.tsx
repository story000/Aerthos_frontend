"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ChartComponent from "./tv";
import Papa from "papaparse";
import ArticlesSection from "./ArticlesSection";
import SignalTable from "./SignalTable";
import { createClient } from '@supabase/supabase-js';
import SubscribeModal from "./subscribe";
const supabase = createClient('https://biwrubftuzrcdhpqkojr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpd3J1YmZ0dXpyY2RocHFrb2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2Mzk5ODYsImV4cCI6MjA1NDIxNTk4Nn0.jBbqgoAbYydIy0YXVCmVYAqWCUGLVyDhfvQdR4TT0uQ');

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
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("indicators");
    const [articles, setArticles] = useState<Article[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 2000);
        fetchSuggestions();
        fetchSignals();
        fetchArticles();

        return () => clearTimeout(timeout);

        
    }, []);

    const fetchSuggestions = async () => {
        try {
            const response = await fetch("pics/suggestions.txt");
            if (!response.ok) throw new Error("Failed to load suggestions");
            const data = await response.text();
            setSuggestions(data);
        } catch (error) {
            console.error("Error loading suggestions:", error);
        }
    };

    const fetchSignals = async () => {
        try {
            const response = await fetch("/pics/signals.csv");
            if (!response.ok) throw new Error("Failed to load signals");
            const csvData = await response.text();
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
        } catch (error) {
            console.error("Error loading signals:", error);
        }
    };

    const fetchArticles = async () => {
        try {
            const response = await fetch("/pics/opinions.csv");
            if (!response.ok) throw new Error("Failed to load articles");
            const csvData = await response.text();
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
        } catch (error) {
            console.error("Error loading articles:", error);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black">
                <h1 className="text-5xl font-bold text-white animate-pulse">Aerthos</h1>
            </div>
        );
    }


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
                    <img src="pics/predictions_plot.png" alt="Trade Decision" className="w-full h-auto object-cover" />
                </div>
            </div>

            <h1 className="text-3xl font-bold font-mono">Indicators & Suggestions</h1>

            <div className="flex justify-between w-full">
                <div className="w-1/2 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-center">Indicators Dashboard</h1>
                    <img src="pics/indicators_dashboard.png" alt="Indicators Dashboard" className="w-full h-auto object-cover" />
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
                onClick={() => setShowModal(true)}
            >
                Subscribe to our newsletter
            </button>
            {showModal && <SubscribeModal setShowModal={setShowModal} supabase={supabase} />}
            
        </div>
    );
};

export default Hero;

