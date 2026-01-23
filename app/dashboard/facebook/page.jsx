"use client";
import { Facebook, Link, ExternalLink } from 'lucide-react';

export default function FacebookPage() {
    return (
        <div className="dashboard-page">
            <div className="page-title">Facebook Integration</div>
            <div className="card-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem' }}>
                <div style={{ width: '80px', height: '80px', background: '#1877f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'white' }}>
                    <Facebook size={40} />
                </div>
                <h2>Connect your Facebook Page</h2>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                    Connect your business page to manage comments, posts, and messenger conversations directly from WhatChat.
                </p>
                <button className="primary-btn" style={{ background: '#1877f2', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    Connect with Facebook
                </button>
            </div>
        </div>
    );
}
