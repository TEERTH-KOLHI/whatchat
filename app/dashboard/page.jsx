import { RotateCw, Bot, AppWindow, Droplets, Layers } from 'lucide-react';

export default function DashboardHome() {
    return (
        <div className="dashboard-page">
            <div className="page-title">
                Dashboard <RotateCw size={18} color="#19877b" style={{ cursor: 'pointer' }} />
            </div>

            <div className="summary-card">
                <div className="card-header">
                    Facebook Summary <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>(all time)</span>
                </div>

                <div className="card-grid">
                    <div className="stat-box">
                        <div className="stat-icon-box" style={{ backgroundColor: '#0f172a' }}>
                            <Bot size={24} />
                        </div>
                        <div className="stat-details">
                            <h3>0</h3>
                            <p>Bot</p>
                        </div>
                    </div>

                    <div className="stat-box">
                        <div className="stat-icon-box" style={{ backgroundColor: '#0f172a' }}>
                            <AppWindow size={24} />
                        </div>
                        <div className="stat-details">
                            <h3>0</h3>
                            <p>Widget</p>
                        </div>
                    </div>

                    <div className="stat-box">
                        <div className="stat-icon-box" style={{ backgroundColor: '#0f172a' }}>
                            <Droplets size={24} />
                        </div>
                        <div className="stat-details">
                            <h3>0</h3>
                            <p>Sequence</p>
                        </div>
                    </div>

                    <div className="stat-box">
                        <div className="stat-icon-box" style={{ backgroundColor: '#0f172a' }}>
                            <Layers size={24} />
                        </div>
                        <div className="stat-details">
                            <h3>0</h3>
                            <p>Input Flow</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="charts-row">
                <div className="chart-card">
                    <div className="card-header">
                        Subscriber Growth <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>(last 30 days)</span>
                    </div>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', border: '1px dashed #e5e7eb', borderRadius: '4px' }}>
                        Chart Placeholder
                    </div>
                </div>

                <div className="chart-card">
                    <div className="card-header">
                        Subscriber Weekly Comparison
                    </div>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', border: '1px dashed #e5e7eb', borderRadius: '4px' }}>
                        Chart Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
}
