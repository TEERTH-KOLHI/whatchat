"use client";
import React from 'react';
import SubscriberList from '../../../../components/dashboard/shared/SubscriberList';

export default function FacebookSubscribersPage() {
    // Mock data for Facebook Subscribers
    const subscribers = [
        { id: 1, name: "John Doe", fb_id: "10029384", labels: ["Lead"], status: "Active", joined: "Jan 12, 2024" },
        { id: 2, name: "Sarah Connor", fb_id: "84736272", labels: ["Customer"], status: "Active", joined: "Jan 10, 2024" },
        { id: 3, name: "Kyle Reese", fb_id: "99384721", labels: ["Pending"], status: "Inactive", joined: "Jan 08, 2024" },
    ];

    return (
        <SubscriberList
            title="Facebook Subscribers"
            subscribers={subscribers}
            platform="facebook"
        />
    );
}
