"use client";
import React, { useState, useEffect } from 'react';
import {
    Package, Calendar, Bell, Shield, User, Mail, Smartphone,
    Lock, MapPin, Globe, Languages, Edit, Upload, CreditCard, CheckCircle, MessageSquare, X, ArrowRight
} from 'lucide-react';

export default function AccountPage() {
    const [profile, setProfile] = useState({
        name: '', email: '', phone: '', address: '', timezone: 'kolkata', language: 'english', translationLanguage: 'abkhazian', twoFactorEnabled: false
    });
    const [usage, setUsage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toggling2fa, setToggling2fa] = useState(false);

    // 2FA Modal State
    const [show2faModal, setShow2faModal] = useState(false);
    const [stepTwoFactor, setStepTwoFactor] = useState(1); // 1: Select, 2: Verify
    const [selectedMethod, setSelectedMethod] = useState(null); // 'app', 'sms', 'email'
    const [verificationCode, setVerificationCode] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/settings/profile');
            const data = await res.json();
            if (data.profile) setProfile(data.profile);
            if (data.usage) setUsage(data.usage);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/settings/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            if (res.ok) {
                alert("Profile updated successfully!");
                fetchData();
            }
        } catch (err) {
            console.error(err);
            alert("Failed to update.");
        } finally {
            setSaving(false);
        }
    };

    // Triggered by "Enable 2FA" button
    const start2faProcess = () => {
        setStepTwoFactor(1);
        setSelectedMethod(null);
        setVerificationCode('');
        setShow2faModal(true);
    };

    // Triggered by "Disable 2FA" button
    const disable2fa = async () => {
        if (!confirm('Are you sure you want to DISABLE Two-Factor Authentication? Your account will be less secure.')) return;

        setToggling2fa(true);
        try {
            const res = await fetch('/api/settings/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...profile, twoFactorEnabled: false })
            });
            if (res.ok) {
                const data = await res.json();
                setProfile(data.profile);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setToggling2fa(false);
        }
    };

    const confirm2faSetup = async () => {
        if (verificationCode.length < 6) {
            alert("Please enter a valid 6-digit code.");
            return;
        }

        setToggling2fa(true);
        try {
            const res = await fetch('/api/settings/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...profile, twoFactorEnabled: true })
            });
            if (res.ok) {
                const data = await res.json();
                setProfile(data.profile);
                setShow2faModal(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setToggling2fa(false);
        }
    };

    const handleChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="dashboard-page" style={{ position: 'relative' }}>
            {/* 2FA Modal */}
            {show2faModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '500px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
                                {stepTwoFactor === 1 ? 'Select 2FA Method' : 'Verify & Enable'}
                            </h3>
                            <button onClick={() => setShow2faModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
                        </div>

                        {stepTwoFactor === 1 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div
                                    onClick={() => setSelectedMethod('app')}
                                    style={{
                                        padding: '1rem', border: `2px solid ${selectedMethod === 'app' ? '#1877f2' : '#e5e7eb'}`,
                                        borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem',
                                        backgroundColor: selectedMethod === 'app' ? '#eff6ff' : 'white'
                                    }}>
                                    <div style={{ background: '#e0f2fe', padding: '0.5rem', borderRadius: '50%', color: '#0369a1' }}><Smartphone size={24} /></div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600' }}>Authenticator App (Recommended)</div>
                                        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Use Google Authenticator, Authy, etc.</div>
                                    </div>
                                    {selectedMethod === 'app' && <CheckCircle size={20} color="#1877f2" />}
                                </div>

                                <div
                                    onClick={() => setSelectedMethod('sms')}
                                    style={{
                                        padding: '1rem', border: `2px solid ${selectedMethod === 'sms' ? '#1877f2' : '#e5e7eb'}`,
                                        borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem',
                                        backgroundColor: selectedMethod === 'sms' ? '#eff6ff' : 'white'
                                    }}>
                                    <div style={{ background: '#fce7f3', padding: '0.5rem', borderRadius: '50%', color: '#be185d' }}><MessageSquare size={24} /></div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600' }}>SMS Message</div>
                                        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Receive a code via text message</div>
                                    </div>
                                    {selectedMethod === 'sms' && <CheckCircle size={20} color="#1877f2" />}
                                </div>

                                <div
                                    onClick={() => setSelectedMethod('email')}
                                    style={{
                                        padding: '1rem', border: `2px solid ${selectedMethod === 'email' ? '#1877f2' : '#e5e7eb'}`,
                                        borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem',
                                        backgroundColor: selectedMethod === 'email' ? '#eff6ff' : 'white'
                                    }}>
                                    <div style={{ background: '#f3f4f6', padding: '0.5rem', borderRadius: '50%', color: '#4b5563' }}><Mail size={24} /></div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600' }}>Email Address</div>
                                        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Receive a code via email</div>
                                    </div>
                                    {selectedMethod === 'email' && <CheckCircle size={20} color="#1877f2" />}
                                </div>

                                <button
                                    onClick={() => setStepTwoFactor(2)}
                                    disabled={!selectedMethod}
                                    className="primary-btn"
                                    style={{ width: '100%', marginTop: '1rem', justifyContent: 'center', opacity: !selectedMethod ? 0.6 : 1, cursor: !selectedMethod ? 'not-allowed' : 'pointer' }}>
                                    Next Step <ArrowRight size={16} />
                                </button>
                            </div>
                        )}

                        {stepTwoFactor === 2 && (
                            <div>
                                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔐</div>
                                    <p style={{ color: '#374151', margin: 0 }}>
                                        Enter the 6-digit code we sent to your
                                        {selectedMethod === 'app' ? ' authenticator app' : selectedMethod === 'sms' ? ' phone' : ' email'}.
                                    </p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="000000"
                                        maxLength={6}
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                                        style={{
                                            fontSize: '1.5rem', letterSpacing: '0.5rem', padding: '0.5rem', width: '200px',
                                            textAlign: 'center', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none'
                                        }}
                                    />
                                </div>

                                <button
                                    onClick={confirm2faSetup}
                                    disabled={toggling2fa}
                                    className="primary-btn"
                                    style={{ width: '100%', justifyContent: 'center' }}>
                                    {toggling2fa ? 'Verifying...' : 'Verify & Enable'}
                                </button>
                                <button
                                    onClick={() => setStepTwoFactor(1)}
                                    style={{ width: '100%', marginTop: '0.5rem', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', textDecoration: 'underline' }}>
                                    Back to Methods
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}


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
            {profile.twoFactorEnabled ? (
                <div className="alert-box-container" style={{ backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' }}>
                    <div className="shield-icon" style={{ backgroundColor: '#d1fae5' }}>
                        <CheckCircle size={32} fill="#10b981" color="#047857" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#047857', margin: '0 0 0.25rem' }}>2FA Enabled</h4>
                        <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#065f46' }}>Your account is secured with Two-Factor Authentication.</p>
                        <button
                            className="enable-2fa-btn"
                            style={{ backgroundColor: '#fff', color: '#ef4444', border: '1px solid #ef4444' }}
                            onClick={disable2fa}
                            disabled={toggling2fa}
                        >
                            {toggling2fa ? 'Processing...' : 'Disable 2FA'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="alert-box-container">
                    <div className="shield-icon">
                        <Shield size={32} fill="#f59e0b" color="#b45309" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#d97706', margin: '0 0 0.25rem' }}>2FA Disabled</h4>
                        <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#b45309' }}>Two-Factor Authentication is not enabled on your account.</p>
                        <button
                            className="enable-2fa-btn"
                            onClick={start2faProcess}
                            disabled={toggling2fa}
                        >
                            Enable 2FA
                        </button>
                    </div>
                    <button className="close-alert">×</button>
                </div>
            )}

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
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>EMAIL</label>
                            <div className="input-icon-wrapper">
                                <Mail size={16} className="field-icon" />
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group half">
                            <label>WHATSAPP MOBILE NUMBER</label>
                            <div className="input-icon-wrapper">
                                <Smartphone size={16} className="field-icon" />
                                <input
                                    type="text"
                                    placeholder="Number with country code"
                                    value={profile.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                />
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
                            <textarea
                                rows="3"
                                value={profile.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>TIMEZONE</label>
                            <select
                                value={profile.timezone}
                                onChange={(e) => handleChange('timezone', e.target.value)}
                            >
                                <option value="kolkata">(GMT+05:30) Asia/Kolkata</option>
                                <option value="utc">UTC</option>
                                <option value="est">EST</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>APPLICATION LANGUAGE</label>
                            <select
                                value={profile.language}
                                onChange={(e) => handleChange('language', e.target.value)}
                            >
                                <option value="english">English (System)</option>
                            </select>
                        </div>
                        <div className="form-group half">
                            <label>LIVECHAT TRANSLATION LANGUAGE</label>
                            <select
                                value={profile.translationLanguage}
                                onChange={(e) => handleChange('translationLanguage', e.target.value)}
                            >
                                <option value="abkhazian">Abkhazian</option>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                            </select>
                        </div>
                    </div>

                    <button
                        className="primary-btn update-btn"
                        onClick={handleUpdate}
                        disabled={saving}
                    >
                        <Edit size={16} style={{ marginRight: '5px' }} />
                        {saving ? 'Saving...' : 'Update'}
                    </button>
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
                            {usage.length === 0 ? (
                                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>Loading...</td></tr>
                            ) : (
                                usage.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.module}</td>
                                        <td style={{ textAlign: 'right', color: row.limit.includes('No Limit') ? '#9ca3af' : '#1f2937' }}>{row.limit}</td>
                                        <td style={{ textAlign: 'right' }}>{row.used}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
