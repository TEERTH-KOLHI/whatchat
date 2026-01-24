import { RotateCw, Bot, AppWindow, Droplets, Layers } from 'lucide-react';
import SubscriberGrowthChart from '../../components/dashboard/home/SubscriberGrowthChart';
import SubscriberWeeklyComparison from '../../components/dashboard/home/SubscriberWeeklyComparison';
import SubscriberSummary from '../../components/dashboard/home/SubscriberSummary';
import BroadcastSummary from '../../components/dashboard/home/BroadcastSummary';
import UpcomingBroadcast from '../../components/dashboard/home/UpcomingBroadcast';

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

            <div className="charts-row" style={{ marginBottom: '1.5rem' }}>
                <div className="chart-card" style={{ flex: 2 }}>
                    <SubscriberGrowthChart />
                </div>

                <div className="chart-card" style={{ flex: 1 }}>
                    <SubscriberWeeklyComparison />
                </div>
            </div>

            <div className="charts-row">
                <div className="chart-card" style={{ flex: 1.2 }}>
                    <SubscriberSummary />
                </div>
                <div className="chart-card" style={{ flex: 1 }}>
                    <BroadcastSummary />
                </div>
                <div className="chart-card" style={{ flex: 1 }}>
                    <UpcomingBroadcast />
                </div>
            </div>
        </div>
    );
}
