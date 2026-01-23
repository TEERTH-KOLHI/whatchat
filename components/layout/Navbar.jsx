"use client";
import { Bell, Menu, User, CreditCard, History, Star, Key, LogOut } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ toggleSidebar }) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button className="menu-btn" onClick={toggleSidebar}>
                    <Menu size={24} color="white" />
                </button>
            </div>

            <div className="navbar-center">
                <div className="stat-pill">
                    <div className="circle-progress" style={{ '--p': 0 }}>0%</div>
                    <div className="stat-info">
                        <span className="stat-label">Subscriber</span>
                        <span className="stat-val">0/200</span>
                    </div>
                </div>

                <div className="stat-pill">
                    <div className="circle-progress" style={{ '--p': 0 }}>0%</div>
                    <div className="stat-info">
                        <span className="stat-label">Message</span>
                        <span className="stat-val">0/200</span>
                    </div>
                </div>

                <div className="stat-pill">
                    <div className="circle-progress" style={{ '--p': 0 }}>0%</div>
                    <div className="stat-info">
                        <span className="stat-label">AI Token</span>
                        <span className="stat-val">0/1.0K</span>
                    </div>
                </div>
            </div>

            <div className="navbar-right">
                <button className="icon-btn">
                    <Bell size={20} color="#fbbf24" /> {/* Amber color for bell */}
                    <span className="notification-dot">3</span>
                </button>

                <div className="user-menu-container">
                    <div
                        className="user-avatar"
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                        <User size={20} color="#19877b" />
                    </div>

                    {isUserMenuOpen && (
                        <div className="user-menu-dropdown">
                            <Link href="/dashboard/settings" className="menu-item">
                                <User size={18} /> Account
                            </Link>
                            <Link href="#" className="menu-item">
                                <CreditCard size={18} /> Renew / Upgrade
                            </Link>
                            <Link href="/dashboard/transactions" className="menu-item">
                                <History size={18} /> Transactions
                            </Link>
                            <Link href="/dashboard/feedback" className="menu-item">
                                <Star size={18} /> Rate Us
                            </Link>
                            <Link href="/dashboard/developer" className="menu-item">
                                <Key size={18} /> API Developer
                            </Link>
                            <div className="menu-divider"></div>
                            <Link href="/login" className="menu-item logout">
                                <LogOut size={18} /> Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
