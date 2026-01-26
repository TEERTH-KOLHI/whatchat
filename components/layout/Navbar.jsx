"use client";
import { Bell, Menu, User, CreditCard, History, Star, Key, LogOut, X, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navbar({ toggleSidebar }) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const notifRef = useRef(null);

    useEffect(() => {
        fetchNotifications();

        // Close dropdown when clicking outside
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications');
            const data = await res.json();
            setNotifications(data.notifications || []);
        } catch (err) {
            console.error(err);
        }
    };

    const markRead = async (id) => {
        try {
            await fetch('/api/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'mark_read', id })
            });
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error(err);
        }
    };

    const markAllRead = async () => {
        try {
            await fetch('/api/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'mark_all_read' })
            });
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error(err);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

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
                {/* Notification Bell */}
                <div style={{ position: 'relative' }} ref={notifRef}>
                    <button
                        className="icon-btn"
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                    >
                        <Bell size={20} color="#fbbf24" />
                        {unreadCount > 0 && <span className="notification-dot">{unreadCount}</span>}
                    </button>

                    {isNotifOpen && (
                        <div className="dropdown-menu" style={{
                            position: 'absolute', top: '120%', right: '0',
                            width: '320px', backgroundColor: 'white',
                            borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            border: '1px solid #e5e7eb', zIndex: 1000, overflow: 'hidden'
                        }}>
                            <div style={{
                                padding: '1rem', borderBottom: '1px solid #f3f4f6',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#111827' }}>Notifications</h4>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllRead}
                                        style={{ fontSize: '0.75rem', color: '#10b981', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
                                        Mark all read
                                    </button>
                                )}
                            </div>

                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {notifications.length === 0 ? (
                                    <div style={{ padding: '1.5rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem' }}>
                                        No notifications
                                    </div>
                                ) : (
                                    notifications.map(notif => (
                                        <div
                                            key={notif.id}
                                            onClick={() => markRead(notif.id)}
                                            style={{
                                                padding: '0.75rem 1rem',
                                                borderBottom: '1px solid #f9fafb',
                                                cursor: 'pointer',
                                                backgroundColor: notif.read ? 'white' : '#f0fdfa',
                                                transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notif.read ? 'white' : '#f0fdfa'}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>{notif.title}</span>
                                                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{notif.time}</span>
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280', lineHeight: '1.4' }}>{notif.message}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

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
                            <Link href="/pricing" target="_blank" className="menu-item">
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
