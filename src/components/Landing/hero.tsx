"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ChartComponent from "../tv";
import ReactMarkdown from "react-markdown";
import Papa from "papaparse";

const Hero: React.FC = () => {
    const router = useRouter();
    const [suggestions, setSuggestions] = useState("");
    const [signals, setSignals] = useState([]);
    const [activeTab, setActiveTab] = useState("indicators");
    const [articles, setArticles] = useState([]);

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
                        const lastRow = result.data[result.data.length - 2];
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
                    error: (error) => console.error("Error parsing CSV:", error)
                });
            })
            .catch((error) => console.error("Error loading signals:", error));

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
                    <h2 className="text-xl font-bold text-center mb-4">Aerthos Opinion</h2>
                    {/* Switch Button */}
                    <div className="flex space-x-4 my-4">
                        <button
                            onClick={() => setActiveTab("indicators")}
                            className={`px-4 py-2 rounded-full ${activeTab === "indicators" ? "bg-blue-500 text-white" : "border border-gray-400"}`}
                        >
                            Indicators
                        </button>
                        <button
                            onClick={() => setActiveTab("suggestions")}
                            className={`px-4 py-2 rounded-full ${activeTab === "suggestions" ? "bg-blue-500 text-white" : "border border-gray-400"}`}
                        >
                            Suggestions
                        </button>
                    </div>

                    {/* Content Display Area */}
                    {activeTab === "indicators" ? (
                        <div className="w-1/2">
                            
                            <table className="table-auto border-collapse border border-gray-400 text-left w-full">
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-1 font-bold" colSpan={2}>Composite Indicator</td>
                                    </tr>
                                    {signals.filter(signal => signal.type === "composite").map((signal, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-1">{signal.name}</td>
                                            <td className={`px-4 py-1 ${signal.value === "Buy" ? "text-green-500" : signal.value === "Sell" ? "text-red-500" : ""}`}>{signal.value}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-1 font-bold" colSpan={2}>Short Term Indicators</td>
                                    </tr>
                                    {signals.filter(signal => signal.type === "short-term").map((signal, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-1">{signal.name}</td>
                                            <td className={`px-4 py-1 ${signal.value === "Buy" ? "text-green-500" : signal.value === "Sell" ? "text-red-500" : ""}`}>{signal.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="mt-4 w-full px-4">
                            <h1 className="text-2xl font-bold text-center">Suggestions</h1>
                            <ReactMarkdown>{suggestions || "Loading suggestions..."}</ReactMarkdown>
                        </div>
                    )}
                        </div>
                    </div>
            
            <div className="mt-8 w-full px-8">
                <h2 className="text-xl font-bold text-center mb-4">News Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                                <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">By {article.author} - {article.date}</p>
                        </div>
                    ))}
                </div>
            </div>
            

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

