"use client";

import React, { useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

interface SubscribeProps {
    setShowModal: (show: boolean) => void;
    supabase: SupabaseClient;
}

const Subscribe: React.FC<SubscribeProps> = ({ setShowModal, supabase }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [subscribe, setSubscribe] = useState(false);

    const handleSubmit = async () => {
        try {
            console.log(name, email, subject, message, subscribe);
            const { data, error } = await supabase
                .from("User")
                .insert([{ "name": name, "email": email, "subject": subject, "message": message, "subscribe": subscribe }]);

            if (error) throw error;

            alert("Your information has been saved!");
            setShowModal(false);
        } catch (error) {
            console.error("Error saving to database:", error);
            alert("Failed to save your information.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Your Name</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded p-2 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email *</label>
                        <input
                            type="email"
                            className="border border-gray-300 rounded p-2 w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Subject</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded p-2 w-full"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Message *</label>
                        <textarea
                            className="border border-gray-300 rounded p-2 w-full"
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={subscribe}
                            onChange={() => setSubscribe(!subscribe)}
                        />
                        <label className="text-sm">Subscribe to our newsletter</label>
                    </div>
                </form>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;
