"use client";

import React from "react";

// ArticlesSection Component
interface ArticlesSectionProps {
    articles: { link: string; title: string; author: string; date: string }[];
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
    return (
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
    );
};

export default ArticlesSection;