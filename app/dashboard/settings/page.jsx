"use client";
import {
    Package, Calendar, Bell, Shield, User, Mail, Smartphone,
    Lock, MapPin, Globe, Languages, Edit, Upload, CreditCard
} from 'lucide-react';

export default function AccountPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header">
                <h1 className="page-title-l" style={{ margin: 0 }}>Account</h1>
                <p style={{ color: '#6b7280', margin: '0.25rem 0 1.5rem' }}>Account Information</p>
            </div>

            {/* Info Bar */}
            <div className="info-bar-container">
                <div className="info-card">
                    <div className="info-icon-box dark-blue"><Package size={24} /></div>
                    <div>
                        <div className="info-label">Package: Trial</div>
                        <button className="info-badge-btn">Renew / Upgrade</button>
                    </div>
                </div>
                <div className="info-card">
                    <div className="info-icon-box dark-blue"><CreditCard size={24} /></div>
                    <div>
                        <div className="info-label">Trial / 7 Days</div>
                        <div className="info-sub">Price & Validity</div>
                    </div>
                </div>
                <div className="info-card">
                    <div className="info-icon-box dark-blue"><Calendar size={24} /></div>
                    <div>
                        <div className="info-label">30th Jan 2026</div>
                        <div className="info-sub">Account Expiry</div>
                    </div>
                </div>
            </div>

            {/* 2FA Alert */}
            <div className="alert-box-container">
                <div className="shield-icon">
                    <Shield size={32} fill="#f59e0b" color="#b45309" />
                </div>
                <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#d97706', margin: '0 0 0.25rem' }}>2FA Disabled</h4>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#b45309' }}>Two-Factor Authentication is not enabled on your account.</p>
                    <button className="enable-2fa-btn">Enable 2FA</button>
                </div>
                <button className="close-alert">×</button>
            </div>

            {/* Main Grid */}
            <div className="account-grid">
                {/* Left Column: Form */}
                <div className="card-container">
                    <h3 className="section-title">Update Account</h3>

                    <div className="profile-upload-row">
                        <div className="avatar-placeholder">
                            <User size={40} color="#6b7280" />
                        </div>
                        <div>
                            <button className="choose-file-btn">Choose File</button>
                            <span style={{ fontSize: '0.85rem', color: '#6b7280', marginLeft: '0.5rem' }}>No file chosen</span>
                            <div style={{ fontSize: '0.75rem', color: '#19877b', marginTop: '0.25rem' }}>200KB, png/jpg/webp, Square image</div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full">
                            <label>NAME</label>
                            <div className="input-icon-wrapper">
                                <User size={16} className="field-icon" />
                                <input type="text" defaultValue="Gelo doy" />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>EMAIL</label>
                            <div className="input-icon-wrapper">
                                <Mail size={16} className="field-icon" />
                                <input type="email" defaultValue="gelodoy360@drenar.com" />
                            </div>
                        </div>
                        <div className="form-group half">
                            <label>WHATSAPP MOBILE NUMBER</label>
                            <div className="input-icon-wrapper">
                                <Smartphone size={16} className="field-icon" />
                                <input type="text" placeholder="Number with country code" />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>PASSWORD</label>
                            <div className="input-icon-wrapper">
                                <Lock size={16} className="field-icon" />
                                <input type="password" placeholder="******" />
                            </div>
                        </div>
                        <div className="form-group half">
                            <label>CONFIRM PASSWORD</label>
                            <div className="input-icon-wrapper">
                                <Lock size={16} className="field-icon" />
                                <input type="password" placeholder="******" />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full">
                            <label>ADDRESS</label>
                            <textarea rows="3"></textarea>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>TIMEZONE</label>
                            <select defaultValue="kolkata">
                                <option value="kolkata">(GMT+05:30) Asia/Kolkata</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>APPLICATION LANGUAGE</label>
                            <select defaultValue="english">
                                <option value="english">English (System)</option>
                            </select>
                        </div>
                        <div className="form-group half">
                            <label>LIVECHAT TRANSLATION LANGUAGE</label>
                            <select defaultValue="abkhazian">
                                <option value="abkhazian">Abkhazian</option>
                            </select>
                        </div>
                    </div>

                    <button className="primary-btn update-btn"><Edit size={16} style={{ marginRight: '5px' }} /> Update</button>
                </div>

                {/* Right Column: Usage Log */}
                <div className="card-container">
                    <h3 className="section-title">Usage Log</h3>

                    <table className="usage-table">
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>#</th>
                                <th>Module</th>
                                <th style={{ textAlign: 'right' }}>Limit</th>
                                <th style={{ textAlign: 'right' }}>Used</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: 1, module: "Connect Account", limit: "3", used: "0" },
                                { id: 2, module: "Message Credit", limit: "200", used: "0" },
                                { id: 3, module: "Bot Typing On Display", limit: "No Limit Applicable", used: "-" },
                                { id: 4, module: "Subscribers", limit: "200", used: "0" },
                                { id: 5, module: "Bot Message Insight", limit: "No Limit Applicable", used: "-" },
                                { id: 6, module: "Bot Conditional Reply", limit: "No Limit Applicable", used: "-" },
                                { id: 7, module: "Bot AI Token", limit: "1000", used: "0" },
                                { id: 8, module: "Input Flow Campaign", limit: "No Limit Applicable", used: "-" },
                            ].map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.module}</td>
                                    <td style={{ textAlign: 'right', color: row.limit.includes('No Limit') ? '#9ca3af' : '#1f2937' }}>{row.limit}</td>
                                    <td style={{ textAlign: 'right' }}>{row.used}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
