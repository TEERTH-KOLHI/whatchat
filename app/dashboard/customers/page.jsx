"use client";
import React from 'react';
import SubscriberList from '../../../components/dashboard/shared/SubscriberList';

export default function CustomersPage() {
    return (
        <SubscriberList
            title="Manage Subscribers"
            platform="whatsapp"
        />
    );
}
