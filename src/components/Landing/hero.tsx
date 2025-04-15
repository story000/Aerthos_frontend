"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ChartComponent from "./tv";
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

        <div className="flex flex-col justify-center  gap-6 w-full">
            <div className="relative w-full h-[500px]">
                <img src="pics/forest.jpg" alt="forest" className="w-full h-full object-cover" />
                <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold drop-shadow-lg">
                    To the future where sustainability drives global prosperity
                </h1>
            </div>

            <div className="my-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-500 text-center leading-snug">
                <p className="px-[20%]">
                    Aerthos <strong className="text-[20px]">is a climate finance and technology startup dedicated to bridging the climate finance gap
                        by providing innovative tools for carbon compliance, risk mitigation, and financial empowerment.</strong>
                </p>
            </h2>

            <div className="my-6"></div>
            <div className="my-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-500 text-left leading-snug px-4 md:px-16">Our services</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-16 py-12 md:px-16">
                {/* Card 1 */}
                <div className="relative rounded-lg overflow-hidden shadow-lg group">
                    <img src="ele/wallstreet.jpg" alt="Carbon Trading" className="w-full h-60 object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-300"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h2 className="text-2xl font-bold">Carbon Trading</h2>
                        <p className="mt-2 text-sm">
                            We support you to comply with EU, CH, or UK ETS schemes as well as to achieve carbon neutrality and the UN sustainable development goals.
                        </p>
                        <a href="#" className="mt-4 font-semibold underline">Read More</a>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="relative rounded-lg overflow-hidden shadow-lg group">
                    <img src="ele/energy.jpg" alt="Renewable Energy" className="w-full h-60 object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-300"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h2 className="text-2xl font-bold">Investment Adviser</h2>
                        <p className="mt-2 text-sm">
                            Empower businesses and investors with tools that simplify carbon compliance, mitigate
                            financial risks, and unlock the potential of the carbon economy.
                        </p>
                        <a href="#" className="mt-4 font-semibold underline">Read More</a>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="relative rounded-lg overflow-hidden shadow-lg group">
                    <img src="ele/smoke.jpg" alt="Climate Solutions" className="w-full h-60 object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-300"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h2 className="text-2xl font-bold">All-in-One Platform</h2>
                        <p className="mt-2 text-sm">
                            Bridge the global climate finance gap by creating transformative platforms for industries,
                            governments, and individuals.
                        </p>
                        <a href="#" className="mt-4 font-semibold underline">Read More</a>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="relative rounded-lg overflow-hidden shadow-lg group">
                    <img src="ele/cooperation.jpg" alt="Projects" className="w-full h-60 object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-300"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h2 className="text-2xl font-bold">Climate Solutions</h2>
                        <p className="mt-2 text-sm">
                            Together, we fight climate change by mitigating risks and setting sustainability goals for a net-zero future.
                        </p>
                        <a href="#" className="mt-4 font-semibold underline">Read More</a>
                    </div>
                </div>
            </div>

            <div className="my-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-500 text-left leading-snug px-4 md:px-16">Free Version</h2>
            <div className="my-6"></div>

            <h1 className="text-3xl font-bold font-mono  px-4 md:px-16">Carbon Price & Predictions </h1>

            <div className="flex justify-between w-full px-4 md:px-16" >
                <div className="w-1/2 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-center">Daily Price Chart</h1>
                    <ChartComponent />
                </div>
                <div className="w-1/2 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-center">Upcoming Forecast</h1>
                    <img src="http://18.117.159.59:8000/static/predictions_plot.png" alt="Trade Decision" className="w-full h-auto object-cover" />
                </div>
            </div>

            <div className="my-6"></div>
            <h1 className="text-3xl font-bold font-mono  px-4 md:px-16">Indicators & Suggestions</h1>

            <div className="flex justify-between w-full px-4 md:px-16">
                <div className="w-1/2 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-center">Indicators Dashboard</h1>
                    <img src="http://18.117.159.59:8000/static/indicators_dashboard.png" alt="Indicators Dashboard" className="w-full h-auto object-cover" />
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
            <div className="my-6"></div>

            <div className="my-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-500 text-left leading-snug px-4 md:px-16">For Subscribers</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 px-16 py-12 bg-white">

                {/* Firt part */}
                <div className="h-[300px] lg:h-[400px] overflow-hidden rounded-lg">
                    <img src="ele/path.jpg" alt="Dynamic Forecast Updates" className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center bg-green-500 text-white p-8 rounded-lg">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Dynamic Forecast Updates</h3>
                        <p>
                            Access the most up-to-date and comprehensive market data, including real-time stock prices, financial news, and in-depth analysis to help you make informed investment decisions.
                        </p>
                    </div>
                </div>

                {/* Second part */}
                <div className="flex items-center bg-green-500 text-white p-8 rounded-lg">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Personalized Buy/Sell Signals</h3>
                        <p>
                            Customize buy/sell signals based your risk appetite and investment timeframe.
                        </p>
                    </div>
                </div>

                <div className="h-[300px] lg:h-[400px] overflow-hidden rounded-lg">
                    <img src="ele/building.jpg" alt="Personalized Buy/Sell Signals" className="w-full h-full object-cover" />
                </div>

                {/* Third part */}
                <div className="h-[300px] lg:h-[400px] overflow-hidden rounded-lg">
                    <img src="ele/email.jpg" alt="Push Notifications" className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center bg-green-500 text-white p-8 rounded-lg">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Push Notifications</h3>
                        <p>
                            Provide instant alerts to your phone for key buy/sell price levels and weekly email updates.
                        </p>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default Hero;

