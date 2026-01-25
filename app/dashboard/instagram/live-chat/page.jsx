"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    Search, Paperclip, Send, Smile, MoreVertical, Phone, Video,
    Instagram, Check
} from 'lucide-react';

export default function InstagramLiveChatPage() {
    const [conversations, setConversations] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (activeChat) {
            fetchMessages(activeChat.id);
        }
    }, [activeChat]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchConversations = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/conversations?channel=instagram');
            const data = await res.json();
            setConversations(data.conversations || []);
            if (data.conversations?.length > 0 && !activeChat) {
                setActiveChat(data.conversations[0]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (id) => {
        try {
            const res = await fetch(`/api/conversations/${id}/messages`);
            const data = await res.json();
            setMessages(data.messages || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSendMessage = async () => {
        if (!inputText.trim() || !activeChat) return;

        const tempMsg = {
            id: 'temp-' + Date.now(),
            sender: 'agent',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, tempMsg]);
        setInputText("");

        try {
            await fetch(`/api/conversations/${activeChat.id}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: tempMsg.text })
            });
            fetchMessages(activeChat.id); // Refresh
            fetchConversations(); // Update snippet
        } catch (err) {
            console.error(err);
        }
    };

    const handleResolve = () => {
        alert("Chat resolved!");
    };

    return (
        <div style={{ height: 'calc(100vh - 84px)', display: 'flex', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>

            {/* LEFT COLUMN: Conversation List */}
            <div style={{ width: '350px', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Instagram size={24} color="#E1306C" />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Instagram Direct</h2>
                    </div>

                    <div className="search-box" style={{ width: '100%', marginBottom: '1rem' }}>
                        <Search size={18} />
                        <input type="text" placeholder="Search DMs..." />
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {loading ? (
                        <div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>Loading chats...</div>
                    ) : conversations.length === 0 ? (
                        <div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>No Instagram chats found.</div>
                    ) : (
                        conversations.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => setActiveChat(chat)}
                                style={{
                                    padding: '1rem',
                                    display: 'flex',
                                    gap: '1rem',
                                    borderBottom: '1px solid #f9fafb',
                                    cursor: 'pointer',
                                    background: activeChat?.id === chat.id ? '#fdf2f8' : 'white',
                                    borderLeft: activeChat?.id === chat.id ? '4px solid #E1306C' : '4px solid transparent'
                                }}
                            >
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '50%', background: '#fce7f3', color: '#be185d',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600'
                                    }}>
                                        {chat.avatar || chat.name.charAt(0)}
                                    </div>
                                    <div style={{
                                        position: 'absolute', bottom: -2, right: -2,
                                        background: 'white', borderRadius: '50%', padding: '2px'
                                    }}>
                                        <Instagram size={14} color="#E1306C" />
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
                        ))
                    )}
                </div>
            </div>

            {/* MIDDLE COLUMN: Chat Area */}
            {activeChat ? (
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
                                Active
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', color: '#6b7280' }}>
                            <Phone size={20} style={{ cursor: 'pointer' }} />
                            <Video size={20} style={{ cursor: 'pointer' }} />
                            <MoreVertical size={20} style={{ cursor: 'pointer' }} />
                            <button
                                onClick={handleResolve}
                                style={{
                                    background: '#c32aa3', color: 'white', border: 'none',
                                    borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.85rem',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                                }}>
                                <Check size={16} /> Resolve
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {messages.length === 0 ? (
                            <div style={{ textAlign: 'center', marginTop: '2rem', color: '#9ca3af' }}>No messages yet.</div>
                        ) : (
                            messages.map((msg) => (
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
                                        background: msg.sender === 'agent' ? '#E1306C' : 'white',
                                        backgroundImage: msg.sender === 'agent' ? 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' : 'none',
                                        color: msg.sender === 'agent' ? 'white' : '#1f2937',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                        lineHeight: '1.5'
                                    }}>
                                        {msg.text}
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.25rem' }}>{msg.time}</span>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div style={{ padding: '1rem 1.5rem', background: 'white', borderTop: '1px solid #e5e7eb' }}>
                        <div style={{
                            border: '1px solid #d1d5db', borderRadius: '8px', padding: '0.5rem',
                            display: 'flex', flexDirection: 'column', gap: '0.5rem'
                        }}>
                            <textarea
                                placeholder="Message..."
                                style={{
                                    resize: 'none', border: 'none', outline: 'none', width: '100%',
                                    minHeight: '60px', fontFamily: 'inherit', fontSize: '0.95rem'
                                }}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '1rem', color: '#6b7280' }}>
                                    <Smile size={20} style={{ cursor: 'pointer' }} />
                                    <Paperclip size={20} style={{ cursor: 'pointer' }} />
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    style={{
                                        background: '#c32aa3', color: 'white', border: 'none', borderRadius: '6px',
                                        width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}>
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', color: '#6b7280' }}>
                    Select a conversation to start chatting.
                </div>
            )}

            {/* RIGHT COLUMN: Contact CRM */}
            {activeChat && (
                <div style={{ width: '300px', borderLeft: '1px solid #e5e7eb', background: 'white', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '2rem 1rem', borderBottom: '1px solid #f3f4f6', textAlign: 'center' }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%', background: '#fce7f3', color: '#be185d',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold',
                            margin: '0 auto 1rem auto'
                        }}>
                            {activeChat.avatar || activeChat.name.charAt(0)}
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{activeChat.name}</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>@{activeChat.name.toLowerCase().replace(' ', '_')}</p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                            <button style={{
                                width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #e5e7eb',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280'
                            }}>
                                <Instagram size={18} color="#E1306C" />
                            </button>
                        </div>
                    </div>

                    <div style={{ padding: '1.5rem 1rem', flex: 1, overflowY: 'auto' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                                Tags
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', background: '#f3f4f6', borderRadius: '4px', color: '#374151' }}>Instagram User</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
