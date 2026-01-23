"use client";
import { Play } from 'lucide-react';

const VIDEOS = [
    { id: 1, title: "Platform Overview", duration: "5:30", thumb: "#1f2937" },
    { id: 2, title: "How to connect WhatsApp", duration: "3:15", thumb: "#374151" },
    { id: 3, title: "Building your first Bot", duration: "12:45", thumb: "#4b5563" },
    { id: 4, title: "Managing Contacts", duration: "4:20", thumb: "#6b7280" },
    { id: 5, title: "Using the Inbox", duration: "6:10", thumb: "#9ca3af" },
    { id: 6, title: "Setting up Broadcasts", duration: "8:50", thumb: "#d1d5db" },
];

export default function TutorialsPage() {
    return (
        <div className="dashboard-page">
            <div className="page-title">Tutorial Videos</div>

            <div className="automation-grid">
                {VIDEOS.map((video) => (
                    <div key={video.id} className="automation-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ height: '160px', background: video.thumb, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <Play size={24} fill="white" />
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                                {video.duration}
                            </div>
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <h4 style={{ margin: '0', fontSize: '1rem' }}>{video.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
