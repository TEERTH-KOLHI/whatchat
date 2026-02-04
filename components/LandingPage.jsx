"use client";
import React from 'react';
import Link from 'next/link';
import { Globe, MessageCircle, CheckCircle, CreditCard } from 'lucide-react';
import '@/styles/landing.css';



export default function LandingPage() {
    return (
        <div className="landing-container">
            {/* Navbar */}
            <nav className="landing-nav">
                <div className="nav-brand">
                    <div className="brand-icon">
                        <MessageCircle size={32} color="#19877b" fill="#e6fffa" />
                    </div>
                    <span>WhatChat</span>
                </div>

                <div className="nav-links">
                    <Link href="#" className="nav-link">Product</Link>
                    <Link href="#" className="nav-link">Pricing</Link>
                    <div className="nav-link">Resources <span style={{ fontSize: '0.8em' }}>▼</span></div>
                    <Link href="#" className="nav-link">Contact Us</Link>
                </div>

                <div className="nav-actions">
                    <div className="lang-selector">
                        <Globe size={18} /> EN <span style={{ fontSize: '0.8em' }}>▼</span>
                    </div>
                    <Link href="/login" className="btn-login">Login</Link>
                    <Link href="/register" className="btn-signup">Sign Up</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-badge">
                    <span>🚀</span> Upgrade Your Messaging Experience
                </div>

                <h1 className="hero-title">
                    Revolutionise Your Whatsapp <br />
                    Messaging Today
                </h1>

                <p className="hero-subtitle">
                    Send multiple whatsapp campaigns, immerse in seamless chats &
                    collaborate with your team effortlessly.
                </p>

                <button className="cta-button">
                    Try for free
                </button>

                <div className="trust-badges">
                    <div className="trust-item">
                        <CheckCircle size={16} color="#00C853" /> Free 20-day Demo
                    </div>
                    <div className="trust-item">
                        <CreditCard size={16} color="#00C853" /> No credit card needed
                    </div>
                </div>

                {/* Decorative Elements */}

                <div className="dashboard-preview">
                    <img src="/assets/dashboard-sample.png" alt="Dashboard Preview" />
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-header">
                    <div className="features-badge">Features</div>
                    <h2 className="features-title">Whatsapp Messaging <br /> Done Differently</h2>
                    <p className="features-subtitle">
                        Elevate your communication game and unlock a host of powerful features <br />
                        tailored to enhance your business's WhatsApp experience:
                    </p>
                </div>

                <div className="features-content">
                    {/* Laptop Mockup */}
                    <div className="laptop-container">
                        <div className="laptop-screen">
                            <img src="/assets/dashboard-sample.png" alt="Dashboard" />
                        </div>
                        <div className="laptop-base"></div>
                    </div>

                    {/* Feature List (Accordion style) */}
                    <div className="features-list">
                        <div className="feature-item active">
                            <div className="feature-head">
                                <div className="feature-icon icon-refresh">🔄</div>
                                <h3>Instant Connectivity</h3>
                                <div className="feature-arrow">▼</div>
                            </div>
                            <div className="feature-body">
                                Engage with your audience in real-time through the WhatsApp
                                Cloud API, ensuring swift and effective communication..
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-head">
                                <div className="feature-icon icon-code">⚙️</div>
                                <h3>Effortless Integration</h3>
                                <div className="feature-arrow">▶</div>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-head">
                                <div className="feature-icon icon-media">🎬</div>
                                <h3>Multi-Media Support</h3>
                                <div className="feature-arrow">▶</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Cards Section */}
            <section className="feature-cards-section">
                <div className="feature-card">
                    <div className="card-icon">
                        <div className="icon-box">📥</div>
                    </div>
                    <h3>Seamless Bulk and Direct Messaging</h3>
                    <p>
                        Streamline your communication strategy with our platform's dual
                        capabilities. Engage in effortless one-on-one conversations with your
                        contacts while also harnessing the power to execute targeted bulk
                        messaging campaigns
                    </p>
                </div>

                <div className="feature-card">
                    <div className="card-icon">
                        <div className="icon-box">🤖</div>
                    </div>
                    <h3>Craft Automated Responses</h3>
                    <p>
                        Take control of your operational efficiency and streamline your workflow
                        effortlessly with our customizable automated response system. Craft
                        responses tailored to your unique needs, guaranteeing swift message
                        delivery to your audience.
                    </p>
                </div>
            </section>

            {/* Modern How It Works Section */}
            <section className="how-it-works-modern">
                <div className="section-header">
                    <div className="section-badge">How it works</div>
                    <h2 className="section-title">Start in 3 Simple Steps</h2>
                    <p className="section-subtitle">
                        Get up and running with WhatChat in minutes. No complex setup required.
                    </p>
                </div>

                <div className="modern-steps-grid">
                    {/* Step 1 */}
                    <div className="modern-step-card">
                        <div className="step-bg-number">01</div>
                        <div className="step-content">
                            <div className="modern-icon-box">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <line x1="20" y1="8" x2="20" y2="14" />
                                    <line x1="23" y1="11" x2="17" y2="11" />
                                </svg>
                            </div>
                            <h3>Create Account</h3>
                            <p>
                                Sign up in seconds. We just need a few details to get your personalized dashboard ready.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="modern-step-card middle-card">
                        <div className="step-bg-number">02</div>
                        <div className="step-content">
                            <div className="modern-icon-box">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                            </div>
                            <h3>Connect WhatsApp</h3>
                            <p>
                                Scan the QR code or link your API comfortably. Our system handles the technical handshake for you.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="modern-step-card">
                        <div className="step-bg-number">03</div>
                        <div className="step-content">
                            <div className="modern-icon-box">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                            </div>
                            <h3>Start Campaigns</h3>
                            <p>
                                Launch your first broadcast. Reach thousands of customers instantly with rich media support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="reviews-section">
                <div className="section-header">
                    <div className="section-badge">Reviews</div>
                    <h2 className="section-title">Explore Genuine <br /> Client Feedback</h2>
                    <p className="section-subtitle">
                        Discover how businesses like yours transformed with our software. <br />
                        Real stories of growth, innovation, and success.
                    </p>
                </div>

                <div className="reviews-grid">
                    {/* Review Card 1 */}
                    <div className="review-card">
                        <div className="review-stars">☆☆☆☆☆</div>
                        <p className="review-text">
                            Super easy to send bulk WhatsApp messages—<br />
                            saved me hours!
                        </p>
                        <div className="review-author">
                            <h4>John Smith</h4>
                            <span>CTO</span>
                        </div>
                        <div className="quote-mark">❝</div>
                    </div>

                    {/* Review Card 2 */}
                    <div className="review-card">
                        <div className="review-stars">☆☆☆☆☆</div>
                        <p className="review-text">
                            Helped us reach thousands instantly. Great tool!
                        </p>
                        <div className="review-author">
                            <h4>Erica Schmidt</h4>
                            <span>Marketing Manager</span>
                        </div>
                        <div className="quote-mark">❝</div>
                    </div>

                    {/* Review Card 3 */}
                    <div className="review-card">
                        <div className="review-stars">☆☆☆☆☆</div>
                        <p className="review-text">
                            User-friendly and efficient for WhatsApp <br />
                            marketing.
                        </p>
                        <div className="review-author">
                            <h4>Louis Hamilton</h4>
                            <span>CMO</span>
                        </div>
                        <div className="quote-mark">❝</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Get Started?</h2>
                    <p className="cta-subtitle">
                        Join thousands of businesses already using our platform to streamline their <br />
                        communication and grow their customer base.
                    </p>
                    <Link href="/register" className="cta-btn">Start Free Trial</Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-main">
                        {/* Brand Column */}
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <MessageCircle size={32} color="#19877b" fill="#e6fffa" />
                                <span>WhatChat</span>
                            </div>
                            <p className="footer-location">New York</p>
                            <div className="footer-social">
                                <a href="#" className="social-icon" aria-label="Facebook">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon" aria-label="Twitter">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon" aria-label="LinkedIn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon" aria-label="Instagram">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Product Column */}
                        <div className="footer-column">
                            <h3>PRODUCT</h3>
                            <ul>
                                <li><Link href="#">Features</Link></li>
                                <li><Link href="#">Pricing</Link></li>
                                <li><Link href="#">FAQs</Link></li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div className="footer-column">
                            <h3>COMPANY</h3>
                            <ul>
                                <li><Link href="#">Contact Us</Link></li>
                                <li><Link href="/register">Sign Up</Link></li>
                                <li><Link href="/login">Login</Link></li>
                            </ul>
                        </div>

                        {/* Pages Column */}
                        <div className="footer-column">
                            <h3>PAGES</h3>
                            <ul>
                                <li><Link href="#">Privacy Policy</Link></li>
                                <li><Link href="#">Terms of Service</Link></li>
                            </ul>
                        </div>

                        {/* Contact Column */}
                        <div className="footer-column">
                            <h3>CONTACT</h3>
                            <ul>
                                <li><a href="mailto:support@exist96.com">support@exist96.com</a></li>
                                <li><a href="tel:+18988134536">+1 (898) 813-4536</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <p>Copyright © 2026 WhatChat. All rights reserved.</p>
                        <Link href="#">Cookie Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
