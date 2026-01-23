"use client";
import { Package, Download } from 'lucide-react';

const ADDONS = [
    { id: 1, name: "WooCommerce Sync", desc: "Sync products and orders automatically.", price: "$19/mo" },
    { id: 2, name: "Google Sheets Export", desc: "Auto-export leads to Google Sheets.", price: "Free" },
    { id: 3, name: "Stripe Payments", desc: "Accept payments directly in WhatsApp.", price: "$29/mo" },
    { id: 4, name: "ChatGPT 4.0 Advanced", desc: "Upgrade your AI agents to GPT-4.", price: "$49/mo" },
];

export default function AddonManagerPage() {
    return (
        <div className="dashboard-page">
            <div className="page-title">Addon Manager</div>

            <div className="automation-grid">
                {ADDONS.map((addon) => (
                    <div key={addon.id} className="automation-card">
                        <div className="automation-header">
                            <div className="icon-box default-bg"><Package size={20} /></div>
                            <div className="status-badge inactive">{addon.price}</div>
                        </div>
                        <h3>{addon.name}</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem', height: '40px' }}>{addon.desc}</p>
                        <button className="action-btn" style={{ width: '100%', background: '#f3f4f6', border: 'none' }}>
                            Install Addon
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
