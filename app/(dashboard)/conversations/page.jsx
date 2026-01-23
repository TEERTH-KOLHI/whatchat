"use client";
import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Check, CheckCheck } from 'lucide-react';

const MOCK_CONVERSATIONS = [
    { id: 1, name: "Alice Smith", lastMessage: "Hey, are you available?", time: "10:30 AM", unread: 2, avatar: "AS", online: true },
    { id: 2, name: "Bob Jones", lastMessage: "Thanks for the help!", time: "Yesterday", unread: 0, avatar: "BJ", online: false },
    { id: 3, name: "Charlie Brown", lastMessage: "When is the meeting?", time: "Mon", unread: 0, avatar: "CB", online: true },
];

const MOCK_MESSAGES = [
    { id: 1, text: "Hi Alice, how can I help you today?", sender: "me", time: "10:28 AM", status: "read" },
    { id: 2, text: "Hey, are you available?", sender: "them", time: "10:30 AM" },
];

export default function ConversationsPage() {
    const [selectedChat, setSelectedChat] = useState(MOCK_CONVERSATIONS[0]);
    const [messageInput, setMessageInput] = useState("");

    return (
        <div className="chat-layout">
            {/* Chat Sidebar */}
            <div className="chat-sidebar">
                <div className="chat-sidebar-header">
                    <h2>Inbox</h2>
                    <div className="chat-search">
                        <Search size={18} color="#9ca3af" />
                        <input type="text" placeholder="Search conversations..." />
                    </div>
                </div>
                <div className="conversation-list">
                    {MOCK_CONVERSATIONS.map((chat) => (
                        <div
                            key={chat.id}
                            className={`conversation-item ${selectedChat.id === chat.id ? 'active' : ''}`}
                            onClick={() => setSelectedChat(chat)}
                        >
                            <div className="avatar">
                                {chat.avatar}
                                {chat.online && <div className="online-indicator"></div>}
                            </div>
                            <div className="conversation-info">
                                <div className="conversation-top">
                                    <span className="user-name">{chat.name}</span>
                                    <span className="msg-time">{chat.time}</span>
                                </div>
                                <div className="conversation-bottom">
                                    <span className="last-message">{chat.lastMessage}</span>
                                    {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="chat-window">
                <div className="chat-header">
                    <div className="chat-user-info">
                        <div className="avatar small">{selectedChat.avatar}</div>
                        <div>
                            <h3>{selectedChat.name}</h3>
                            <span className="user-status">{selectedChat.online ? 'Online' : 'Offline'}</span>
                        </div>
                    </div>
                    <div className="chat-actions">
                        <button className="icon-btn"><Phone size={20} /></button>
                        <button className="icon-btn"><Video size={20} /></button>
                        <button className="icon-btn"><MoreVertical size={20} /></button>
                    </div>
                </div>

                <div className="messages-area">
                    {MOCK_MESSAGES.map((msg) => (
                        <div key={msg.id} className={`message-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                            <div className="message-content">
                                {msg.text}
                                <div className="message-meta">
                                    <span>{msg.time}</span>
                                    {msg.sender === 'me' && (
                                        msg.status === 'read' ? <CheckCheck size={14} color="#3b82f6" /> : <Check size={14} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="chat-input-area">
                    <button className="icon-btn"><Paperclip size={20} /></button>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button className="send-btn">
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
