import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BookOpen, LayoutDashboard, Video, Smartphone, Bot, Users, Radio,
    Inbox, Megaphone, Workflow, ShoppingBag, Calendar, Facebook,
    Instagram, Settings, Shield, UserCog, Package, MessageCircle,
    ChevronDown, ChevronRight, Share2, MessageSquare, Repeat, Flag
} from 'lucide-react';
import '@/styles/dashboard.css';

const MENU_ITEMS = [
    { label: 'Onboarding Guide', icon: BookOpen, href: '/dashboard/onboarding' },
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', active: true },
    { label: 'Tutorial Videos', icon: Video, href: '/dashboard/tutorials' },
    { label: 'Connect WhatsApp', icon: MessageCircle, href: '/dashboard/connect', color: '#25d366' },
    { label: 'Bot Manager', icon: Bot, href: '/dashboard/bot-manager' },
    { label: 'Manage Subscribers', icon: Users, href: '/dashboard/customers' },
    { label: 'Broadcasting', icon: Radio, href: '/dashboard/broadcasting' },
    { label: 'Omnichannel Inbox', icon: Inbox, href: '/dashboard/conversations', badge: 'New' },
    { label: 'WhatsApp Ads', icon: Megaphone, href: '/dashboard/ads', color: '#25d366' },
    { label: 'Webhook Workflow', icon: Workflow, href: '/dashboard/webhooks' },
    { label: 'eCommerce Catalog', icon: ShoppingBag, href: '/dashboard/ecommerce' },
    { label: 'Appointment', icon: Calendar, href: '/dashboard/appointments' },
    {
        label: 'Facebook',
        icon: Facebook,
        href: '#',
        color: '#1877f2', // Facebook Blue
        subItems: [
            { label: 'Connect Account', href: '/dashboard/facebook/connect', icon: Facebook, iconColor: '#1877f2', fillColor: '#1877f2', textColor: '#19877b' }, // Teal text for "Connect" to match others? Or Blue? User said "related to it design". Let's stick to Blue for icons.
            { label: 'Bot Manager', href: '/dashboard/facebook/bot-manager', icon: Bot, iconColor: '#1877f2' },
            { label: 'Subscriber Manager', href: '/dashboard/facebook/subscribers', icon: Users, iconColor: '#1877f2' },
            { label: 'Broadcasting', href: '/dashboard/facebook/broadcasting', icon: Radio, iconColor: '#1877f2' },
            { label: 'Live Chat', href: '/dashboard/facebook/live-chat', icon: MessageCircle, iconColor: '#1877f2' },
            { label: 'Comment Automation', href: '/dashboard/facebook/automation', icon: Flag, iconColor: '#1877f2' },
        ]
    },
    {
        label: 'Instagram',
        icon: Instagram,
        href: '#',
        color: '#E1306C',
        subItems: [
            { label: 'Connect Account', href: '/dashboard/instagram/connect', icon: Instagram, iconColor: '#E1306C', fillColor: '#fce7f3' },
            { label: 'Bot Manager', href: '/dashboard/instagram/bot-manager', icon: Bot, iconColor: '#E1306C', fillColor: '#fce7f3' },
            { label: 'Subscriber Manager', href: '/dashboard/instagram/subscribers', icon: Users, iconColor: '#E1306C', fillColor: '#fce7f3' },
            { label: 'Live Chat', href: '/dashboard/instagram/live-chat', icon: MessageCircle, iconColor: '#E1306C', fillColor: '#fce7f3' },
            { label: 'Comment Automation', href: '/dashboard/instagram/automation', icon: Flag, iconColor: '#E1306C', fillColor: '#fce7f3' },
        ]
    },
    { label: 'Settings & Integration', icon: Settings, href: '/dashboard/settings' },
    { label: 'User Permission', icon: Shield, href: '/dashboard/permissions' },
    { label: 'User Manager', icon: UserCog, href: '/dashboard/users' },
    { label: 'Addon Manager', icon: Package, href: '/dashboard/addons' },
];

export default function Sidebar({ collapsed }) {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState('');

    const toggleMenu = (label) => {
        if (openMenu === label) {
            setOpenMenu('');
        } else {
            setOpenMenu(label);
        }
    };

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <MessageCircle size={32} color="#19877b" fill="#e6fffa" />
                {!collapsed && <span className="brand-name">WhatChat</span>}
            </div>
            <nav className="sidebar-nav" style={{ paddingBottom: '2rem' }}>
                {MENU_ITEMS.map((item, index) => {
                    const isOpen = openMenu === item.label;
                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    // Active if path matches item href OR if path matches any sub-item
                    const isActive = pathname === item.href || (hasSubItems && item.subItems.some(sub => pathname === sub.href));

                    return (
                        <div key={index}>
                            <Link
                                href={hasSubItems ? '#' : item.href}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                title={collapsed ? item.label : ''}
                                onClick={hasSubItems ? (e) => { e.preventDefault(); toggleMenu(item.label); } : undefined}
                                style={{ justifyContent: 'space-between' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                                    <item.icon
                                        size={20}
                                        className="nav-icon"
                                        style={item.color ? { color: item.color, minWidth: '20px' } : { minWidth: '20px' }}
                                    />
                                    {!collapsed && <span className="nav-label">{item.label}</span>}
                                </div>
                                {!collapsed && item.badge && <span className="nav-badge">{item.badge}</span>}
                                {!collapsed && hasSubItems && (
                                    <div style={{
                                        color: '#9ca3af',
                                        transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)', // Down (0) when open, Right (-90) when closed. User said "direction or arrow should be down" (implied default context commonly is right, open is down).
                                        // Wait, user said "direction or arrow should be down".
                                        // Standard accordion: Closed -> Right/Up. Open -> Down.
                                        // Let's assume user wants the standard "Down when open". 
                                        // Actually if I use ChevronDown, 0deg is Down.
                                        transition: 'transform 0.3s ease'
                                    }}>
                                        <ChevronDown size={14} />
                                    </div>
                                )}
                            </Link>

                            {/* Submenu */}
                            {!collapsed && hasSubItems && (
                                <div
                                    style={{
                                        maxHeight: isOpen ? '500px' : '0',
                                        opacity: isOpen ? 1 : 0,
                                        overflow: 'hidden',
                                        transition: 'all 0.6s ease-in-out', // Slower animation
                                        paddingLeft: '2.5rem',
                                        background: 'transparent',
                                        paddingBottom: isOpen ? '0.1rem' : '0'
                                    }}
                                >
                                    {item.subItems.map((sub, subIndex) => {
                                        const isActive = pathname === sub.href;
                                        const activeColor = sub.iconColor || '#1877f2';

                                        return (
                                            <Link
                                                key={subIndex}
                                                href={sub.href}
                                                className={`nav-item small ${isActive ? 'active-sub' : ''}`}
                                                style={{
                                                    padding: '0 0.5rem',
                                                    fontSize: '0.85rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginBottom: '1px',
                                                    height: '24px',
                                                    color: isActive ? activeColor : (sub.textColor || '#374151'),
                                                    background: 'transparent',
                                                    fontWeight: (sub.label === 'Connect Account' || isActive) ? '600' : '400',
                                                    pointerEvents: isOpen ? 'auto' : 'none'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <sub.icon
                                                        size={16}
                                                        fill={sub.fillColor || "none"}
                                                        color={sub.iconColor || "#6b7280"}
                                                        style={{ minWidth: '16px' }}
                                                    />
                                                    <span>{sub.label}</span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
