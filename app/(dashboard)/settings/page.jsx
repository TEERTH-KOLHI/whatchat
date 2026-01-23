"use client";
import { useState } from 'react';
import { User, Lock, Save, Globe, Facebook, Instagram } from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="dashboard-page">
            <div className="page-title">Settings & Integration</div>

            <div className="settings-container">
                <div className="settings-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <User size={18} /> Profile
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'integrations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('integrations')}
                    >
                        <Globe size={18} /> Integrations
                    </button>
                </div>

                <div className="settings-content">
                    {activeTab === 'profile' && (
                        <div className="form-section">
                            <h3>Profile Information</h3>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" defaultValue="Admin User" className="settings-input" />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" defaultValue="admin@whatchat.com" className="settings-input" />
                            </div>

                            <h3 style={{ marginTop: '2rem' }}>Change Password</h3>
                            <div className="form-group">
                                <label>Current Password</label>
                                <input type="password" className="settings-input" />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" className="settings-input" />
                            </div>

                            <button className="primary-btn" style={{ marginTop: '1.5rem' }}>
                                <Save size={18} style={{ marginRight: '8px' }} /> Save Changes
                            </button>
                        </div>
                    )}

                    {activeTab === 'integrations' && (
                        <div className="integrations-list">
                            <div className="integration-card">
                                <div className="integration-icon fb">
                                    <Facebook size={24} />
                                </div>
                                <div className="integration-info">
                                    <h4>Facebook</h4>
                                    <p>Connect your commercial pages</p>
                                </div>
                                <button className="connect-btn connected">Connected</button>
                            </div>

                            <div className="integration-card">
                                <div className="integration-icon insta">
                                    <Instagram size={24} />
                                </div>
                                <div className="integration-info">
                                    <h4>Instagram</h4>
                                    <p>Connect your professional account</p>
                                </div>
                                <button className="connect-btn">Connect</button>
                            </div>

                            <div className="integration-card">
                                <div className="integration-icon wa">
                                    <Globe size={24} />
                                </div>
                                <div className="integration-info">
                                    <h4>WhatsApp Cloud API</h4>
                                    <p>Manage phone numbers & templates</p>
                                </div>
                                <button className="connect-btn">Connect</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
