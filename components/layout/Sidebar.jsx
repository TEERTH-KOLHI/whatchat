import Link from 'next/link';
import {
    BookOpen, LayoutDashboard, Video, Smartphone, Bot, Users, Radio,
    Inbox, Megaphone, Workflow, ShoppingBag, Calendar, Facebook,
    Instagram, Settings, Shield, UserCog, Package, MessageCircle
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
    { label: 'Facebook', icon: Facebook, href: '/dashboard/facebook', color: '#1877f2' },
    { label: 'Instagram', icon: Instagram, href: '/dashboard/instagram', color: '#c32aa3' },
    { label: 'Settings & Integration', icon: Settings, href: '/dashboard/settings' },
    { label: 'User Permission', icon: Shield, href: '/dashboard/permissions' },
    { label: 'User Manager', icon: UserCog, href: '/dashboard/users' },
    { label: 'Addon Manager', icon: Package, href: '/dashboard/addons' },
];

export default function Sidebar({ collapsed }) {
    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <MessageCircle size={32} color="#19877b" fill="#e6fffa" />
                {!collapsed && <span className="brand-name">WhatChat</span>}
            </div>
            <nav className="sidebar-nav">
                {MENU_ITEMS.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`nav-item ${item.active ? 'active' : ''}`}
                        title={collapsed ? item.label : ''}
                    >
                        <item.icon
                            size={20}
                            className="nav-icon"
                            style={item.color ? { color: item.color } : {}}
                        />
                        {!collapsed && <span className="nav-label">{item.label}</span>}
                        {!collapsed && item.badge && <span className="nav-badge">{item.badge}</span>}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
