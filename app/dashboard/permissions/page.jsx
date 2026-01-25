"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Save } from 'lucide-react';

export default function UserPermissionsPage() {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/settings/permissions');
            const data = await res.json();
            setPermissions(data.permissions || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (index, role) => {
        const newPermissions = [...permissions];
        newPermissions[index][role] = !newPermissions[index][role];
        setPermissions(newPermissions);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/settings/permissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(permissions)
            });
            if (res.ok) {
                alert("Permissions saved successfully!");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="dashboard-page">
            <div className="page-title">Role Permissions</div>

            <div className="card-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Module Access</th>
                            <th style={{ textAlign: 'center' }}>Admin</th>
                            <th style={{ textAlign: 'center' }}>Agent</th>
                            <th style={{ textAlign: 'center' }}>Viewer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>Loading permissions...</td></tr>
                        ) : (
                            permissions.map((perm, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 500 }}>{perm.module}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <input
                                            type="checkbox"
                                            checked={perm.admin}
                                            onChange={() => handleToggle(i, 'admin')}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <input
                                            type="checkbox"
                                            checked={perm.agent}
                                            onChange={() => handleToggle(i, 'agent')}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <input
                                            type="checkbox"
                                            checked={perm.viewer}
                                            onChange={() => handleToggle(i, 'viewer')}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                    <button
                        className="primary-btn"
                        onClick={handleSave}
                        disabled={saving || loading}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Save size={18} /> {saving ? 'Saving...' : 'Save Permissions'}
                    </button>
                </div>
            </div>
        </div>
    );
}
