"use client";
import { Link, Plus, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

const WEBHOOKS = [
    { id: 1, url: "https://api.mysite.com/webhook", event: "Message Received", status: "Active", lastTrigger: "2 mins ago" },
    { id: 2, url: "https://zapier.com/hooks/catch/123", event: "New Lead", status: "Inactive", lastTrigger: "Yesterday" },
];

export default function WebhookWorkflowPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row">
                <div className="page-title" style={{ marginBottom: 0 }}>Webhook Workflow</div>
                <button className="primary-btn">+ Add Webhook</button>
            </div>

            <div className="card-container">
                <div className="summary-card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', marginBottom: '1.5rem', boxShadow: 'none' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ padding: '0.75rem', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                            <Activity size={24} color="#19877b" />
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 0.5rem 0' }}>Webhook Health</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>All systems operational. 99.9% success rate in last 24h.</p>
                        </div>
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Webhook URL</th>
                            <th>Event</th>
                            <th>Status</th>
                            <th>Last Trigger</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {WEBHOOKS.map((hook) => (
                            <tr key={hook.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace', background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <Link size={14} /> {hook.url}
                                    </div>
                                </td>
                                <td>{hook.event}</td>
                                <td>
                                    <span className={`status-badge ${hook.status.toLowerCase()}`}>{hook.status}</span>
                                </td>
                                <td>{hook.lastTrigger}</td>
                                <td>
                                    <button className="action-btn delete">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
