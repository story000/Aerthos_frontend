"use client";

import React, {useState}  from "react";
import SubscribeModal from "./subscribe";
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://biwrubftuzrcdhpqkojr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpd3J1YmZ0dXpyY2RocHFrb2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2Mzk5ODYsImV4cCI6MjA1NDIxNTk4Nn0.jBbqgoAbYydIy0YXVCmVYAqWCUGLVyDhfvQdR4TT0uQ');


const Footer: React.FC = () => {

    const [showModal, setShowModal] = useState(false);

    return (

        <div className="flex flex-col justify-center items-center w-full bg-black py-8">
            <div className="bg-white rounded-2xl shadow-lg flex items-center justify-between w-[90%] max-w-4xl p-6 mb-4">
                {/* Left logo and word */}
                <div className="flex items-center gap-4">
                    <img src="ele/logo.jpg" alt="IFTTT Pro" className="h-20" />
                    {/* <span className="bg-black text-white text-sm font-bold px-2 py-1 rounded-lg">Pro+</span> */}
                </div>

                {/* Middle title */}
                <h2 className="text-2xl font-bold text-gray-800">The leading climate finance platform</h2>

                {/* Right button */}
                <button className="bg-black text-white text-lg font-medium px-6 py-2 rounded-full hover:bg-gray-700 transition duration-300"
                    onClick={() => setShowModal(true)}
                    >
                    Subscribe
                </button>
                {showModal && <SubscribeModal setShowModal={setShowModal} supabase={supabase} />}
            </div>

            <footer className="w-full bg-black text-white py-8 px-4 md:px-16">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
                    {/* First column */}
                    <div>
                        <p className="text-sm">©Aerthos {new Date().getFullYear()}</p>
                    </div>

                    {/* Second column */}
                    <div className="space-y-2">
                        <p className="font-medium">Learn</p>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">Brand Kit</a></li>
                            <li><a href="#" className="hover:underline">Mailing List</a></li>
                        </ul>
                    </div>

                    {/* Third column */}
                    <div className="space-y-2">
                        <p className="font-medium">Contact</p>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">Twitter / X</a></li>
                            <li><a href="#" className="hover:underline">GitHub</a></li>
                        </ul>
                    </div>

                    {/* Fourth column */}
                    <div className="space-y-2">
                        <p className="font-medium">Privacy</p>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">Terms of Use</a></li>
                            <li><a href="#" className="hover:underline">End User Terms</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
