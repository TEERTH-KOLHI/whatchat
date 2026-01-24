"use client";
import React, { useState } from 'react';
import {
    Search, Filter, Paperclip, Send, Smile, MoreVertical, Phone, Video,
    Facebook, Check, MoreHorizontal, User, Mail
} from 'lucide-react';

const CONVERSATIONS = [
    { id: 2, name: "Bob Smith", msg: "Is this item available in red?", time: "15m", unread: 0, channel: "facebook", avatar: "BS", type: "text" },
    { id: 5, name: "Eva Green", msg: "When is the next sale?", time: "1d", unread: 0, channel: "facebook", avatar: "EG", type: "text" },
    { id: 6, name: "John Doe", msg: "I love your page!", time: "2d", unread: 1, channel: "facebook", avatar: "JD", type: "text" },
];

const MESSAGES = [
    { id: 1, sender: "user", text: "Hi, is this item available in red?", time: "10:30 AM" },
    { id: 2, sender: "agent", text: "Hello! Let me check that for you.", time: "10:32 AM" },
    { id: 3, sender: "agent", text: "Yes, we have 2 units left in red.", time: "10:34 AM" },
    { id: 4, sender: "user", text: "Great! How can I order?", time: "10:35 AM" },
];

export default function FacebookLiveChatPage() {
    const [activeChat, setActiveChat] = useState(CONVERSATIONS[0]);
    const [inputText, setInputText] = useState("");

    return (
        <div style={{ height: 'calc(100vh - 84px)', display: 'flex', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>

            {/* LEFT COLUMN: Conversation List */}
            <div style={{ width: '350px', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Facebook size={24} color="#1877f2" fill="#1877f2" />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Live Chat</h2>
                    </div>

                    <div className="search-box" style={{ width: '100%', marginBottom: '1rem' }}>
                        <Search size={18} />
                        <input type="text" placeholder="Search conversations..." />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', background: '#e0f2fe', color: '#0369a1', fontSize: '0.85rem', fontWeight: '500', border: 'none' }}>Facebook</button>
                        <button style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'white', border: '1px solid #e5e7eb', fontSize: '0.85rem', color: '#6b7280' }}>Unread</button>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {CONVERSATIONS.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat)}
                            style={{
                                padding: '1rem',
                                display: 'flex',
                                gap: '1rem',
                                borderBottom: '1px solid #f9fafb',
                                cursor: 'pointer',
                                background: activeChat.id === chat.id ? '#f0fdfa' : 'white',
                                borderLeft: activeChat.id === chat.id ? '4px solid #1877f2' : '4px solid transparent'
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%', background: '#e0f2fe', color: '#0369a1',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600'
                                }}>
                                    {chat.avatar}
                                </div>
                                <div style={{
                                    position: 'absolute', bottom: -2, right: -2,
                                    background: 'white', borderRadius: '50%', padding: '2px'
                                }}>
                                    <Facebook size={14} fill="#1877f2" color="#1877f2" />
                                </div>
                            </div>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: '600', fontSize: '0.95rem', color: '#111827' }}>{chat.name}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{chat.time}</span>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: chat.unread > 0 ? '#1f2937' : '#6b7280', fontWeight: chat.unread > 0 ? '600' : '400', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {chat.msg}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MIDDLE COLUMN: Chat Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
                {/* Header */}
                <div style={{
                    padding: '1rem 1.5rem',
                    background: 'white',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{activeChat.name}</div>
                        <span style={{
                            fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px',
                            background: '#dcfce7', color: '#166534', fontWeight: '600'
                        }}>
                            Open
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', color: '#6b7280' }}>
                        <Phone size={20} style={{ cursor: 'pointer' }} />
                        <Video size={20} style={{ cursor: 'pointer' }} />
                        <MoreVertical size={20} style={{ cursor: 'pointer' }} />
                        <button style={{
                            background: '#1877f2', color: 'white', border: 'none',
                            borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.85rem',
                            display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                        }}>
                            <Check size={16} /> Resolve
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {MESSAGES.map((msg) => (
                        <div key={msg.id} style={{
                            alignSelf: msg.sender === 'user' ? 'flex-start' : 'flex-end',
                            maxWidth: '70%',
                            display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-start' : 'flex-end'
                        }}>
                            <div style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '12px',
                                borderTopLeftRadius: msg.sender === 'user' ? '0' : '12px',
                                borderTopRightRadius: msg.sender === 'agent' ? '0' : '12px',
                                background: msg.sender === 'agent' ? '#1877f2' : 'white',
                                color: msg.sender === 'agent' ? 'white' : '#1f2937',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                lineHeight: '1.5'
                            }}>
                                {msg.text}
                            </div>
                            <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.25rem' }}>{msg.time}</span>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div style={{ padding: '1rem 1.5rem', background: 'white', borderTop: '1px solid #e5e7eb' }}>
                    <div style={{
                        border: '1px solid #d1d5db', borderRadius: '8px', padding: '0.5rem',
                        display: 'flex', flexDirection: 'column', gap: '0.5rem'
                    }}>
                        <textarea
                            placeholder="Type a message..."
                            style={{
                                resize: 'none', border: 'none', outline: 'none', width: '100%',
                                minHeight: '60px', fontFamily: 'inherit', fontSize: '0.95rem'
                            }}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '1rem', color: '#6b7280' }}>
                                <Smile size={20} style={{ cursor: 'pointer' }} />
                                <Paperclip size={20} style={{ cursor: 'pointer' }} />
                            </div>
                            <button style={{
                                background: '#1877f2', color: 'white', border: 'none', borderRadius: '6px',
                                width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer'
                            }}>
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Contact CRM */}
            <div style={{ width: '300px', borderLeft: '1px solid #e5e7eb', background: 'white', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '2rem 1rem', borderBottom: '1px solid #f3f4f6', textAlign: 'center' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%', background: '#e0f2fe', color: '#0369a1',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold',
                        margin: '0 auto 1rem auto'
                    }}>
                        {activeChat.avatar}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{activeChat.name}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>+1 (555) 987-6543</p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <button style={{
                            width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #e5e7eb',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280'
                        }}>
                            <Facebook size={18} />
                        </button>
                    </div>
                </div>

                <div style={{ padding: '1.5rem 1rem', flex: 1, overflowY: 'auto' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                            Tags
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', background: '#f3f4f6', borderRadius: '4px', color: '#374151' }}>Messenger User</span>
                            <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', border: '1px dashed #d1d5db', borderRadius: '4px', color: '#6b7280', cursor: 'pointer' }}>+ Add Tag</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
