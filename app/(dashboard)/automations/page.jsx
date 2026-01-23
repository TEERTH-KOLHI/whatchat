"use client";
import { Bot, Play, Pause, Edit, Trash2, Zap, MessageSquare } from 'lucide-react';

const MOCK_AUTOMATIONS = [
    { id: 1, name: "Welcome Bot", status: "active", triggers: 1250, type: "Flow Builder" },
    { id: 2, name: "Out of Office", status: "inactive", triggers: 45, type: "Keyword" },
    { id: 3, name: "Lead Qualify", status: "active", triggers: 890, type: "AI Agent" },
    { id: 4, name: "Support Ticket", status: "active", triggers: 320, type: "Sequence" },
];

export default function AutomationsPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row">
                <div className="page-title" style={{ marginBottom: 0 }}>Automations</div>
                <button className="primary-btn">+ New Automation</button>
            </div>

            <div className="automation-grid">
                {MOCK_AUTOMATIONS.map((bot) => (
                    <div key={bot.id} className="automation-card">
                        <div className="automation-header">
                            <div className={`icon-box ${bot.type === 'AI Agent' ? 'ai-bg' : 'default-bg'}`}>
                                {bot.type === 'AI Agent' ? <Zap size={20} /> : <Bot size={20} />}
                            </div>
                            <div className={`status-badge ${bot.status}`}>
                                {bot.status === 'active' ? 'Active' : 'Paused'}
                            </div>
                        </div>

                        <h3>{bot.name}</h3>
                        <p className="automation-type">{bot.type}</p>

                        <div className="automation-stats">
                            <div className="stat-item">
                                <MessageSquare size={14} />
                                <span>{bot.triggers} Triggers</span>
                            </div>
                        </div>

                        <div className="automation-actions">
                            <button className="action-btn" title="Toggle Status">
                                {bot.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                            </button>
                            <button className="action-btn" title="Edit">
                                <Edit size={16} />
                            </button>
                            <button className="action-btn delete" title="Delete">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
