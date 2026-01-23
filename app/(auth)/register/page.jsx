"use client";
import '@/styles/auth.css';
import { User, Lock, UserPlus, Phone, MessageCircle, Globe, AtSign, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
    const [countryCode, setCountryCode] = useState('+1');

    return (
        <div className="auth-wrapper">
            <div className="auth-card register-card">
                <div className="auth-header">
                    <div className="logo-placeholder">
                        <div className="monkey-logo">
                            <MessageCircle size={64} color="#19877b" fill="#e6fffa" />
                        </div>
                    </div>
                    <h1>WhatChat - Sign Up</h1>
                </div>

                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="name">NAME</label>
                        <div className="input-with-icon">
                            <User size={20} className="input-icon" />
                            <input type="text" id="name" placeholder="" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">EMAIL</label>
                        <div className="input-with-icon">
                            <AtSign size={20} className="input-icon" />
                            <input type="email" id="email" placeholder="" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group" style={{ flex: '1' }}>
                            <label htmlFor="country">COUNTRY CODE</label>
                            <div className="input-with-icon">
                                <Globe size={20} className="input-icon" />
                                <select
                                    id="country"
                                    className="auth-select"
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                >
                                    <option value="+1">Select Country</option>
                                    <option value="+1">USA (+1)</option>
                                    <option value="+44">UK (+44)</option>
                                    <option value="+91">India (+91)</option>
                                    {/* Add more as needed */}
                                </select>
                            </div>
                        </div>
                        <div className="form-group" style={{ flex: '2' }}>
                            <label htmlFor="phone">WHATSAPP MOBILE NUMBER</label>
                            <div className="input-with-icon">
                                <Phone size={20} className="input-icon" />
                                <input type="tel" id="phone" placeholder="Number without country code" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">PASSWORD</label>
                        <div className="input-with-icon">
                            <Lock size={20} className="input-icon" />
                            <input type="password" id="password" placeholder="" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
                        <div className="input-with-icon">
                            <Lock size={20} className="input-icon" />
                            <input type="password" id="confirm-password" placeholder="" />
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms" className="checkbox-label">
                            I agree to the <Link href="#">Terms of Service</Link> & <Link href="#">Privacy Policy</Link>
                        </label>
                    </div>

                    <button type="submit" className="login-btn">
                        <UserPlus size={18} style={{ marginRight: '8px' }} /> Sign Up
                    </button>
                </form>

                <div className="auth-footer" style={{ justifyContent: 'center' }}>
                    <Link href="/login" className="footer-link">
                        <LogIn size={14} className="link-icon" /> Login
                    </Link>
                </div>
            </div>

            <div className="whatsapp-float">
                <div className="whatsapp-icon-img">
                    <img src="/whatsapp.png" alt="WhatsApp" width={50} height={50} />
                </div>
            </div>
        </div>
    );
}
