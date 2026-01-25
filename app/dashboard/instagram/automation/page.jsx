"use client";
import React, { useState, useEffect } from 'react';
import { Search, Filter, Settings, Instagram, X, Save } from 'lucide-react';

export default function InstagramAutomationPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [activePost, setActivePost] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/instagram/automation');
            const data = await res.json();
            setPosts(data.posts || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenConfigure = (post) => {
        setActivePost(post);
        setReplyText(post.autoReply?.replyText || '');
        setIsEnabled(post.autoReply?.enabled || false);
        setShowModal(true);
    };

    const handleSaveConfig = async () => {
        if (!activePost) return;
        setSaving(true);
        try {
            const res = await fetch('/api/instagram/automation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postId: activePost.id,
                    config: { enabled: isEnabled, replyText: replyText }
                })
            });
            if (res.ok) {
                setShowModal(false);
                fetchPosts();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="dashboard-page" style={{ position: 'relative' }}>
            {/* Configure Modal */}
            {showModal && activePost && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '500px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Configure Insta Auto-Reply</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
                        </div>

                        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#374151', fontStyle: 'italic' }}>"{activePost.description}"</p>
                        </div>

                        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                                <input
                                    type="checkbox"
                                    checked={isEnabled}
                                    onChange={(e) => setIsEnabled(e.target.checked)}
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                />
                                <span style={{
                                    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundColor: isEnabled ? '#E1306C' : '#ccc', borderRadius: '34px', transition: '.4s'
                                }}></span>
                                <span style={{
                                    position: 'absolute', content: "", height: '20px', width: '20px', left: isEnabled ? '26px' : '4px', bottom: '3px',
                                    backgroundColor: 'white', borderRadius: '50%', transition: '.4s'
                                }}></span>
                            </label>
                            <span style={{ fontSize: '0.95rem', fontWeight: '500', color: '#374151' }}>Enable Auto-Reply</span>
                        </div>

                        <div style={{ marginBottom: '1.5rem', opacity: isEnabled ? 1 : 0.5, pointerEvents: isEnabled ? 'auto' : 'none', transition: 'opacity 0.2s' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Reply Message</label>
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Thanks for the love! Check your DMs. ❤️"
                                rows={4}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px', resize: 'vertical' }}
                            />
                        </div>

                        <button
                            onClick={handleSaveConfig}
                            disabled={saving}
                            style={{ width: '100%', padding: '0.8rem', background: '#E1306C', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                            {saving ? 'Saving...' : <><Save size={18} /> Save Configuration</>}
                        </button>
                    </div>
                </div>
            )}

            <div className="page-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="page-title" style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Comment Automation</h1>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>Auto-reply to comments on your Instagram posts</p>
                </div>
            </div>

            <div className="card-container" style={{ padding: '0', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="search-box" style={{ width: '320px', position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            style={{
                                width: '100%',
                                padding: '0.6rem 1rem 0.6rem 2.75rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                outline: 'none',
                                color: '#374151',
                                backgroundColor: '#fff'
                            }}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f9fafb' }}>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '1rem', width: '80px', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Thumbnail</th>
                                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Post Description</th>
                                <th style={{ textAlign: 'center', padding: '1rem', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Likes</th>
                                <th style={{ textAlign: 'center', padding: '1rem', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Comments</th>
                                <th style={{ textAlign: 'center', padding: '1rem', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Auto-Reply</th>
                                <th style={{ textAlign: 'right', padding: '1rem', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Loading posts...</td></tr>
                            ) : posts.length === 0 ? (
                                <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No posts found.</td></tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ width: '50px', height: '50px', background: '#fce7f3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Instagram size={24} color="#E1306C" />
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', maxWidth: '300px' }}>
                                            <div style={{ fontWeight: '500', color: '#1f2937' }}>{post.description}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.25rem' }}>Posted on {post.createdAt}</div>
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
                                            {post.likes}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
                                            {post.comments}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '1rem' }}>
                                            <div style={{
                                                display: 'inline-flex', padding: '0.25rem 0.75rem', borderRadius: '999px',
                                                background: post.autoReply?.enabled ? '#dcfce7' : '#f3f4f6',
                                                color: post.autoReply?.enabled ? '#166534' : '#6b7280',
                                                fontSize: '0.8rem', fontWeight: '500'
                                            }}>
                                                {post.autoReply?.enabled ? 'Enabled' : 'Disabled'}
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right', padding: '1rem' }}>
                                            <button
                                                onClick={() => handleOpenConfigure(post)}
                                                style={{
                                                    background: 'white', border: '1px solid #d1d5db', padding: '0.4rem 0.8rem',
                                                    borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', color: '#374151',
                                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                                                }}>
                                                <Settings size={14} /> Configure
                                            </button>
                                        </td>
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
