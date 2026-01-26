"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle, Shield, Lock, Award, Zap, Users, MessageSquare, Bot, Globe, Smartphone, BarChart3, Clock, Layout, Share2, CreditCard, ShoppingBag, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import './pricing.css';

export default function PricingPage() {
    // True = Annual, False = Monthly
    const [isAnnual, setIsAnnual] = useState(true);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [countryCode, setCountryCode] = useState('PK');

    useEffect(() => {
        fetch('https://ipwho.is/')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.country_code) {
                    setCountryCode(data.country_code);
                }
            })
            .catch(err => {
                console.log("Country fetch failed, using default", err);
                // Fail silently and keep default "PK"
            });
    }, []);

    const expiryDate = new Date("2026-02-01T23:59:59").getTime();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = expiryDate - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const togglePricing = (type) => {
        setIsAnnual(type === 'annual');
    };

    return (
        <div className="pricing-container">
            {/* Header / Logo Area */}
            <div className="pricing-header">
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                    {/* WhatChat Logo (Matches Sidebar) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '15px' }}>
                        <MessageCircle size={36} color="#19877b" fill="#e6fffa" />
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>WhatChat</span>
                    </div>

                    <span style={{ fontSize: '1.5rem', color: '#9ca3af', margin: '0 1px 0 0', fontWeight: '300' }}>✕</span>

                    {/* Meta Logo (Image) */}
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1px' }}>
                        <img src="/meta-logo.png" alt="Meta" className="meta-logo-img" />
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="pricing-hero">
                <h1 className="pricing-title">Fair, Transparent Pricing - Zero Markup Fees</h1>
                <p className="pricing-subtitle">
                    While others charge 20-35% commission on every WhatsApp conversation, we connect you directly to Meta with zero markup fees.
                </p>
            </div>

            {/* Offer Section */}
            <div className="offer-section">
                <div className="offer-text">
                    <span>👉 Click here to get Special 50% OFF for {countryCode}</span>
                </div>
                <div className="offer-expiry">
                    <span>⚠️ Offer expires by Sunday, February 1, 2026</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '1rem' }}>
                    This is the last chance to lock 50% OFF for lifetime<br />
                    (no hikes in price for you until you cancel)
                </div>

                <div className="timer-container">
                    <div className="timer-box">
                        <span className="timer-value">{timeLeft.days}</span>
                        <span className="timer-label">Days</span>
                    </div>
                    <div className="timer-box">
                        <span className="timer-value">{timeLeft.hours}</span>
                        <span className="timer-label">Hrs</span>
                    </div>
                    <div className="timer-box">
                        <span className="timer-value">{timeLeft.minutes}</span>
                        <span className="timer-label">Min</span>
                    </div>
                    <div className="timer-box">
                        <span className="timer-value">{timeLeft.seconds}</span>
                        <span className="timer-label">Sec</span>
                    </div>
                </div>

                {/* Toggle */}
                <div className="pricing-toggle">
                    <div className="toggle-container">
                        <button
                            className={`toggle-btn ${isAnnual ? 'active' : ''}`}
                            onClick={() => togglePricing('annual')}
                        >
                            Annually
                        </button>
                        <button
                            className={`toggle-btn ${!isAnnual ? 'active' : ''}`}
                            onClick={() => togglePricing('monthly')}
                        >
                            Monthly
                        </button>
                    </div>
                </div>
                {isAnnual && (
                    <div className="annual-discount-tag">🔥 Get 40% off with annual subscription</div>
                )}
            </div>

            {/* Pricing Cards */}
            <div className="pricing-cards-container">
                {/* Basic Plan */}
                <div className="pricing-card basic">
                    <div className="card-header">
                        <div className="plan-name basic">
                            Basic <span>💪</span>
                        </div>
                        <p className="plan-desc">Ideal for a small business or solopreneur to get started with WhatsApp Broadcasting & Automation</p>
                    </div>
                    <div className="card-price">
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <span className="price-amount">${isAnnual ? '24' : '40'}</span>
                            <span className="price-period">/month</span>
                        </div>
                        <div className="price-converted">≈ PKR {isAnnual ? '6,676' : '11,127'}</div>
                    </div>

                    <button className="cta-button secondary">Get Started</button>

                    <ul className="features-list">
                        <FeatureItem text="0% Markup Fees" />
                        <FeatureItem text="2 Team Members" />
                        <FeatureItem text="5,000 Subscribers" />
                        <FeatureItem text="Number Coexistence" />
                        <FeatureItem text="WhatsApp AI Agent" />
                        <FeatureItem text="100,000 AI Message Tokens" />
                        <FeatureItem text="Unlimited Message Credits" />
                        <FeatureItem text="Unlimited Free Incoming Conversation" />
                        <FeatureItem text="Unlimited Chatbot Sessions" />
                        <FeatureItem text="Bulk WhatsApp Messaging" />
                        <FeatureItem text="Multi Agent Shared Inbox" />
                        <FeatureItem text="Drag & Drop Chatbot Builder" />
                        <FeatureItem text="Campaign Reporting" />
                        <FeatureItem text="Automated Follow Up Bot" />
                        <FeatureItem text="Interactive User Input Collection Bot" />
                        <FeatureItem text="Messaging Template Management" />
                        <FeatureItem text="WhatsApp Chat Widget" />
                        <FeatureItem text="SMS Broadcasting" />
                        <FeatureItem text="Google Sheets Integration" />
                        <FeatureItem text="API Integration (Developer)" />
                        <FeatureItem text="Outgoing Webhooks" />
                        <FeatureItem text="Zapier Integration" />
                        <FeatureItem text="Pabbly Integration" />
                        <FeatureItem text="Make Integration" />
                        <FeatureItem text="N8N Integration" />
                        <FeatureItem text="WooCommerce Integration" />
                        <FeatureItem text="Shopify Integration" />
                    </ul>
                </div>

                {/* Pro Plan */}
                <div className="pricing-card pro">
                    <div className="card-header">
                        <div className="plan-name pro">
                            Pro <span>🚀</span>
                        </div>
                        <p className="plan-desc">Advanced features and higher limits, ideal for growing businesses needing more capabilities</p>
                    </div>
                    <div className="card-price">
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <span className="price-amount">${isAnnual ? '60' : '100'}</span>
                            <span className="price-period">/month</span>
                        </div>
                        <div className="price-converted">≈ PKR {isAnnual ? '16,690' : '27,816'}</div>
                    </div>

                    <button className="cta-button primary">Get Started</button>

                    <ul className="features-list">
                        <FeatureItem text="Includes all Basic features" />
                        <FeatureItem text="5 Team Members" />
                        <FeatureItem text="Omnichannel Inbox: WhatsApp, Instagram & Facebook" />
                        <FeatureItem text="Appointment Booking System" />
                        <FeatureItem text="15,000 Subscribers" />
                        <FeatureItem text="High Speed Broadcasting" />
                        <FeatureItem text="Unlimited AI Message Tokens" />
                        <FeatureItem text="AI Intent Detection" />
                        <FeatureItem text="Roles and Permissions" />
                        <FeatureItem text="Phone Number Masking" />
                        <FeatureItem text="Manager Monitoring" />
                        <FeatureItem text="Incoming Chat Translation" />
                        <FeatureItem text="Click to WhatsApp Ad Integration" />
                        <FeatureItem text="HTTP API Calls in Chatbot" />
                        <FeatureItem text="Smart Automatic Agent Routing" />
                        <FeatureItem text="Native WhatsApp Form Builder" />
                        <FeatureItem text="Custom Webhook Listener" />
                        <FeatureItem text="WhatsApp Product Catalog" />
                        <FeatureItem text='Remove "Powered by WhatChat"' />
                        <FeatureItem text="On-Call Support" />
                    </ul>
                </div>

                {/* Enterprise Plan */}
                <div className="pricing-card enterprise">
                    <div className="card-header">
                        <div className="plan-name enterprise">
                            Enterprise <span>💎</span>
                        </div>
                        <p className="plan-desc">Plans for fast-growing businesses that need multiple WhatsApp numbers, larger teams, and more subscribers</p>
                    </div>
                    <div className="card-price">
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <span className="price-amount">For Scale</span>
                        </div>
                    </div>

                    <button className="cta-button secondary">View Enterprise Plans</button>

                    <ul className="features-list">
                        <FeatureItem text="Includes all Pro features" />
                        <FeatureItem text="Unlimited Team Members" />
                        <FeatureItem text="More WhatsApp Numbers" />
                        <FeatureItem text="High Volume Subscribers" />
                        <FeatureItem text="Dedicated Account Manager" />
                        <FeatureItem text="Priority Support" />
                    </ul>
                </div>
            </div>

            {/* Footer / Payment Logos */}
            <div className="pricing-footer">
                <div className="payment-logos">
                    {/* PayPal */}
                    <img src="/payments/paypal.png" alt="PayPal" className="payment-logo" style={{ height: '32px' }} />

                    {/* Visa */}
                    <img src="/payments/visa.png" alt="Visa" className="payment-logo" style={{ height: '32px' }} />

                    {/* Mastercard */}
                    <img src="/payments/mastercard.png" alt="Mastercard" className="payment-logo" style={{ height: '32px' }} />

                    {/* Amex */}
                    <img src="/payments/amex.png" alt="Amex" className="payment-logo" style={{ height: '32px' }} />

                    {/* Apple Pay */}
                    <img src="/payments/applepay.png" alt="Apple Pay" className="payment-logo" style={{ height: '32px' }} />

                    {/* Google Pay */}
                    <img src="/payments/gpay.png" alt="Google Pay" className="payment-logo" style={{ height: '32px' }} />
                </div>
                <div className="trust-badges">
                    <div className="trust-item"><Shield size={20} /> Secure Checkout</div>
                    <div className="trust-item"><Award size={20} /> Satisfaction Guarantee</div>
                    <div className="trust-item"><Lock size={20} /> Privacy Protected</div>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ text }) {
    return (
        <li className="feature-item">
            <CheckCircle className="feature-icon" size={16} />
            <span>{text}</span>
        </li>
    );
}
