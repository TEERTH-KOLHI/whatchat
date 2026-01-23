"use client";
import { Key, Link as LinkIcon } from 'lucide-react';

export default function DeveloperPage() {
    return (
        <div className="dashboard-page centered-layout">
            <div className="dev-header">
                <h1>WhatChat - Developer</h1>
                <p>Get Your API key and become a WhatChat developer</p>
            </div>

            <div className="api-key-card">
                <div className="card-body">
                    <div className="key-icon-large">
                        <Key size={64} fill="#fcd34d" color="#f59e0b" />
                    </div>
                    <div className="key-info">
                        <h3>Your API key</h3>
                        <p>You do not have any api key generated</p>
                    </div>
                </div>

                <div className="card-footer-action">
                    <button className="primary-btn generate-key-btn">
                        <Key size={18} style={{ marginRight: '0.5rem' }} /> Generate API key
                    </button>
                </div>

                {/* Background Decoration */}
                <div className="bg-decoration">
                    <LinkIcon size={180} strokeWidth={1} color="#f3f4f6" />
                </div>
            </div>
        </div>
    );
}
