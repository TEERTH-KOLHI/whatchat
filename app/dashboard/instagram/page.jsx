"use client";
import { Instagram } from 'lucide-react';

export default function InstagramPage() {
    return (
        <div className="dashboard-page">
            <div className="page-title">Instagram Integration</div>
            <div className="card-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem' }}>
                <div style={{ width: '80px', height: '80px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'white' }}>
                    <Instagram size={40} />
                </div>
                <h2>Connect your Instagram Account</h2>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                    Link your professional Instagram account to reply to DMs and comments automatically.
                </p>
                <button className="primary-btn" style={{ background: '#c32aa3', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    Connect with Instagram
                </button>
            </div>
        </div>
    );
}
