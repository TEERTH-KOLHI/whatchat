"use client";
import React from 'react';
import SubscriberList from '../../../components/dashboard/shared/SubscriberList';

export default function CustomersPage() {
    // Mock data matching the image style
    const subscribers = [
        { id: 1, name: "Alice Smith", phone: "+1 555-0101", labels: ["Lead", "Interested"], status: "Active", joined: "Jan 12, 2024" },
        { id: 2, name: "Bob Jones", phone: "+44 20 7123 4567", labels: ["Customer"], status: "Active", joined: "Jan 10, 2024" },
        { id: 3, name: "Charlie Brown", phone: "+91 98765 43210", labels: ["Pending"], status: "Inactive", joined: "Jan 08, 2024" },
        { id: 4, name: "David Wilson", phone: "+1 555-0102", labels: ["Lead"], status: "Active", joined: "Jan 05, 2024" },
    ];

    return (
        <SubscriberList
            title="Manage Subscribers"
            subscribers={subscribers}
            platform="whatsapp"
        />
    );
}
