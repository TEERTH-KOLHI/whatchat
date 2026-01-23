"use client";
import '@/styles/auth.css';
import { User, Lock, LogIn, UserPlus, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'example@gmail.com' && password === '12345') {
            router.push('/dashboard');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="logo-placeholder">
                        <div className="monkey-logo">
                            <MessageCircle size={64} color="#19877b" fill="#e6fffa" />
                        </div>
                    </div>
                    <h1>WhatChat - Login</h1>
                </div>

                <form className="auth-form" onSubmit={handleLogin}>
                    {error && <div style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
                    <div className="form-group">
                        <label htmlFor="email">EMAIL</label>
                        <div className="input-with-icon">
                            <User size={20} className="input-icon" />
                            <input
                                type="email"
                                id="email"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">PASSWORD</label>
                        <div className="input-with-icon">
                            <Lock size={20} className="input-icon" />
                            <input
                                type="password"
                                id="password"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-btn">
                        <LogIn size={18} style={{ marginRight: '8px' }} /> Login
                    </button>
                </form>

                <div className="auth-footer">
                    <Link href="#" className="footer-link">
                        <Lock size={14} className="link-icon" /> Reset Password
                    </Link>
                    <Link href="/register" className="footer-link">
                        <UserPlus size={14} className="link-icon" /> Register
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
