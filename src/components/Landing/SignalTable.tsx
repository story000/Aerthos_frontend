"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

// SignalTable Component
interface SignalTableProps {
    signals: { name: string; value: string; type: string }[];
    suggestions: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const SignalTable: React.FC<SignalTableProps> = ({ signals, suggestions, activeTab, setActiveTab }) => {
    return (
        <div className="w-full">
            <h2 className="text-xl font-bold text-center mb-4">Aerthos Opinion</h2>
            <div className="flex space-x-4 my-4 justify-center">
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

            {activeTab === "indicators" ? (
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
            ) : (
                <div className="mt-4 w-full px-4">
                    <h1 className="text-2xl font-bold text-center">Suggestions</h1>
                    <ReactMarkdown>{suggestions || "Loading suggestions..."}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default SignalTable;