"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import '@/styles/dashboard.css';

export default function DashboardLayout({ children }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar collapsed={isSidebarCollapsed} />
            <div className="main-content">
                <Navbar toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
                <main className="dashboard-page-container">{children}</main>
            </div>
        </div>
    );
}
