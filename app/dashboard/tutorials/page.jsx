"use client";
import { Play, Search, Clock, BookOpen } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = ["All", "Getting Started", "Chatbots", "Marketing", "Contacts", "Advanced"];

const VIDEOS = [
    { id: 1, title: "Platform Overview & Basics", category: "Getting Started", duration: "5:30", thumb: "linear-gradient(135deg, #1e293b, #0f172a)" },
    { id: 2, title: "How to Connect WhatsApp", category: "Getting Started", duration: "3:15", thumb: "linear-gradient(135deg, #14532d, #166534)" },
    { id: 3, title: "Building Your First Chatbot", category: "Chatbots", duration: "12:45", thumb: "linear-gradient(135deg, #075985, #0369a1)" },
    { id: 4, title: "Importing & Managing Contacts", category: "Contacts", duration: "4:20", thumb: "linear-gradient(135deg, #4c1d95, #5b21b6)" },
    { id: 5, title: "Using the Broadcast Feature", category: "Marketing", duration: "8:50", thumb: "linear-gradient(135deg, #9f1239, #be123c)" },
    { id: 6, title: "Setting up Webhooks", category: "Advanced", duration: "6:10", thumb: "linear-gradient(135deg, #0f766e, #115e59)" },
    { id: 9, title: "AI Agent Configuration", category: "Chatbots", duration: "10:20", thumb: "linear-gradient(135deg, #374151, #1f2937)" },
    { id: 7, title: "Sequence Campaigns Guide", category: "Marketing", duration: "7:30", thumb: "linear-gradient(135deg, #b91c1c, #991b1b)" },
    { id: 8, title: "Team Roles & Permissions", category: "Advanced", duration: "5:00", thumb: "linear-gradient(135deg, #1e40af, #1e3a8a)" },
];

export default function TutorialsPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredVideos = VIDEOS.filter(video => {
        const matchesCategory = activeTab === "All" || video.category === activeTab;
        const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="dashboard-page">
            <div className="page-header" style={{ marginBottom: '2rem' }}>
                <h1 className="page-title-l" style={{ margin: 0 }}>Learning Center</h1>
                <p style={{ color: '#6b7280', margin: '0.25rem 0 0' }}>Master WhatChat with our step-by-step video guides</p>
            </div>

            {/* Toolbar */}
            <div className="tutorials-toolbar">
                <div className="category-pills">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            className={`pill-btn ${activeTab === cat ? 'active' : ''}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="search-box small">
                    <Search size={16} color="#9ca3af" />
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="tutorials-grid">
                {filteredVideos.map((video) => (
                    <div key={video.id} className="video-card">
                        <div className="thumbnail-wrapper" style={{ background: video.thumb }}>
                            <div className="play-overlay">
                                <div className="play-icon-circle">
                                    <Play size={24} fill="white" className="play-svg" />
                                </div>
                            </div>
                            <div className="duration-badge">
                                <Clock size={12} style={{ marginRight: '4px' }} /> {video.duration}
                            </div>
                        </div>
                        <div className="video-info">
                            <span className="category-tag">{video.category}</span>
                            <h3 className="video-title">{video.title}</h3>
                            <div className="video-meta">
                                <button className="watch-btn">Watch Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredVideos.length === 0 && (
                <div className="empty-state">
                    <BookOpen size={48} color="#d1d5db" />
                    <p style={{ marginTop: '1rem' }}>No tutorials found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
