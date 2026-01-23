"use client";
import { Plus, Calendar as CalendarIcon, Clock, User } from 'lucide-react';

const APPOINTMENTS = [
    { id: 1, client: "John Doe", time: "10:00 AM - 10:30 AM", date: "Today", status: "Confirmed", type: "Demo Call" },
    { id: 2, client: "Sarah Connor", time: "2:00 PM - 2:45 PM", date: "Tomorrow", status: "Pending", type: "Consultation" },
];

export default function AppointmentPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row">
                <div className="page-title" style={{ marginBottom: 0 }}>Appointments</div>
                <button className="primary-btn"><Plus size={18} style={{ marginRight: '0.5rem' }} /> New Booking</button>
            </div>

            <div className="card-container">
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {[...Array(7)].map((_, i) => (
                        <div key={i} style={{ minWidth: '80px', height: '90px', border: i === 0 ? '2px solid #19877b' : '1px solid #e5e7eb', borderRadius: '8px', padding: '0.75rem', textAlign: 'center', cursor: 'pointer', background: i === 0 ? '#f0fdf9' : 'white' }}>
                            <div style={{ fontSize: '0.85rem', color: i === 0 ? '#19877b' : '#6b7280', marginBottom: '0.5rem' }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: i === 0 ? '#19877b' : '#1f2937' }}>{12 + i}</div>
                        </div>
                    ))}
                </div>

                <div className="campaign-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {APPOINTMENTS.map((apt) => (
                        <div key={apt.id} className="campaign-item" style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #f3f4f6', borderRadius: '8px', gap: '1rem' }}>
                            <div style={{ textAlign: 'center', minWidth: '60px' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{apt.time.split('-')[0]}</div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>30 min</div>
                            </div>
                            <div style={{ width: '4px', height: '40px', background: apt.status === 'Confirmed' ? '#3b82f6' : '#f59e0b', borderRadius: '2px' }}></div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 0.25rem 0' }}>{apt.type} with {apt.client}</h4>
                                <div style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', gap: '1rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={12} /> {apt.client}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CalendarIcon size={12} /> {apt.date}</span>
                                </div>
                            </div>
                            <div>
                                <span className={`status-badge`} style={{ background: apt.status === 'Confirmed' ? '#dbeafe' : '#fef3c7', color: apt.status === 'Confirmed' ? '#1e40af' : '#92400e' }}>{apt.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
