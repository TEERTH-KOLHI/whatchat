"use client";
import React from 'react';
import { Facebook } from 'lucide-react';

export default function FacebookConnectPage() {
    return (
        <div className="dashboard-page" style={{ paddingBottom: '3rem' }}>
            <h1 className="page-title" style={{ marginBottom: '2rem' }}>Facebook Integration</h1>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    maxWidth: '600px',
                    width: '100%',
                    border: '1px solid #e5e7eb'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: '#1877f2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem auto'
                    }}>
                        <Facebook size={40} color="white" fill="white" />
                    </div>

                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                        Connect your Facebook Page
                    </h2>

                    <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.5', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                        Connect your business page to manage comments, posts, and messenger conversations directly from WhatChat.
                    </p>

                    <button style={{
                        backgroundColor: '#1877f2',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#166fe5'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#1877f2'}
                    >
                        Connect with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
}
