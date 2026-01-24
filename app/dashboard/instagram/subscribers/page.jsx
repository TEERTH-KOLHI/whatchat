"use client";
import React from 'react';
import SubscriberList from '../../../../components/dashboard/shared/SubscriberList';

export default function InstagramSubscribersPage() {
    // Mock data for Instagram Subscribers
    const subscribers = [
        { id: 1, name: "influencer_jane", insta_id: "@influencer_jane", labels: ["Influencer"], status: "Active", joined: "Jan 12, 2024" },
        { id: 2, name: "fashion_lover", insta_id: "@fashion_lover", labels: ["Customer"], status: "Active", joined: "Jan 10, 2024" },
        { id: 3, name: "tech_guru", insta_id: "@tech_guru", labels: ["Lead"], status: "Inactive", joined: "Jan 08, 2024" },
    ];

    return (
        <SubscriberList
            title="Instagram Subscribers"
            subscribers={subscribers}
            platform="instagram"
        />
    );
}
