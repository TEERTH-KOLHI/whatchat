"use client";
import { History, Calendar, ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function TransactionsPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <h1 className="page-title-l" style={{ margin: 0 }}>Transactions</h1>
                        <button className="secondary-btn-pill">
                            <History size={16} /> Manual Transactions
                        </button>
                    </div>
                    <p style={{ color: '#6b7280', margin: '0.5rem 0 1.5rem', fontSize: '0.9rem' }}>List of transactions</p>
                </div>
            </div>

            <div className="card-container">
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem' }}>Transaction Log</h3>
                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>Recent Transactions</span>
                </div>

                {/* Controls */}
                <div className="tx-controls">
                    <div className="search-box">
                        <input type="text" placeholder="Search & Enter..." style={{ paddingLeft: '0.5rem' }} />
                    </div>
                    <button className="date-filter-btn">
                        <Calendar size={16} /> Date
                    </button>
                </div>

                {/* Table */}
                <table className="tx-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email <ArrowUpDown size={12} className="sort-icon" /></th>
                            <th>First Name <ArrowUpDown size={12} className="sort-icon" /></th>
                            <th>Last Name <ArrowUpDown size={12} className="sort-icon" /></th>
                            <th>Method <ArrowUpDown size={12} className="sort-icon" /></th>
                            <th>Amount <ArrowUpDown size={12} className="sort-icon" /></th>
                            <th>Product <ArrowUpDown size={12} className="sort-icon" /></th>
                            <th>Type</th>
                            <th>Billing Cycle</th>
                            <th>Paid at <ArrowUpDown size={12} className="sort-icon" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="10" className="empty-state">
                                No data available in table
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="tx-footer">
                    <div className="rows-selector">
                        <div className="select-box">
                            10 <ChevronDown size={14} />
                        </div>
                    </div>
                    <div className="pagination-controls">
                        <span className="page-info">0 - 0 of 0</span>
                        <div className="page-btns">
                            <button className="page-btn disabled">Previous</button>
                            <button className="page-btn disabled">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
