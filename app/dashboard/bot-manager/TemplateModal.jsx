import React, { useState } from 'react';
import { X, Save, Smile, Settings, MessageSquare, ChevronDown, Keyboard, MousePointerClick, XCircle } from 'lucide-react';

export default function TemplateModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [templateCategory, setTemplateCategory] = useState('Marketing');
    const [headerType, setHeaderType] = useState('No Header');
    const [buttonType, setButtonType] = useState('Call To Action');

    return (
        <div style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
            <div style={{
                backgroundColor: 'white', borderRadius: '8px', width: '800px', maxWidth: '95vw',
                display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                maxHeight: '90vh'
            }}>
                {/* Header */}
                <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>Message Template</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', overflowY: 'auto' }}>

                    {/* Row 1 */}
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>TEMPLATE NAME *</label>
                            <input
                                type="text"
                                placeholder="marketing_m"
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #10b981', borderRadius: '4px', outline: 'none', color: '#374151' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>LOCALE *</label>
                            <select style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', outline: 'none', color: '#374151', background: 'white' }}>
                                <option>English (US)</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>TEMPLATE CATEGORY *</label>
                            <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                                <button
                                    onClick={() => setTemplateCategory('Utility')}
                                    style={{ flex: 1, padding: '0.6rem', border: 'none', background: templateCategory === 'Utility' ? '#6366f1' : 'white', color: templateCategory === 'Utility' ? 'white' : '#6b7280', cursor: 'pointer' }}
                                >
                                    Utility
                                </button>
                                <button
                                    onClick={() => setTemplateCategory('Marketing')}
                                    style={{ flex: 1, padding: '0.6rem', border: 'none', background: templateCategory === 'Marketing' ? '#6366f1' : 'white', color: templateCategory === 'Marketing' ? 'white' : '#6b7280', cursor: 'pointer' }}
                                >
                                    Marketing
                                </button>
                                <button
                                    onClick={() => setTemplateCategory('Auth/OTP')}
                                    style={{ flex: 1, padding: '0.6rem', border: 'none', background: templateCategory === 'Auth/OTP' ? '#6366f1' : 'white', color: templateCategory === 'Auth/OTP' ? 'white' : '#6b7280', cursor: 'pointer' }}
                                >
                                    Auth/OTP
                                </button>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>HEADER TYPE *</label>
                            <div style={{ padding: '0.6rem', background: '#f3f4f6', borderRadius: '4px', color: '#374151', border: '1px solid #e5e7eb' }}>
                                No Header
                            </div>
                        </div>
                    </div>

                    {/* Row 3 - Message Body */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>MESSAGE BODY (1024)*</label>
                        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderBottom: '1px dotted #e5e7eb', gap: '1rem', background: 'white' }}>
                                <button style={{ background: 'none', border: 'none', fontWeight: '600', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                    <Settings size={14} /> Custom Fields
                                </button>
                                <button style={{ background: 'none', border: 'none', fontWeight: '600', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                    <Keyboard size={14} /> Variables
                                </button>
                                <button style={{ background: 'none', border: 'none', fontWeight: '600', fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                    <span style={{ width: '14px', height: '14px', background: '#10b981', color: 'white', borderRadius: '50%', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>?</span> Name
                                </button>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <textarea
                                    style={{ width: '100%', minHeight: '100px', padding: '0.75rem', border: 'none', outline: 'none', resize: 'vertical' }}
                                    defaultValue="To check out click the button below"
                                ></textarea>
                                <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#9ca3af', cursor: 'pointer' }}>
                                    <Smile size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 4 - Footer */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>FOOTER TEXT</label>
                        <input
                            type="text"
                            placeholder="Provide text for footer (60)"
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px', outline: 'none', background: '#f9fafb' }}
                        />
                    </div>

                    {/* Button Section */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>BUTTON</label>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <button
                                onClick={() => setButtonType('None')}
                                style={{ padding: '0.6rem 1rem', border: buttonType === 'None' ? 'none' : '1px solid #e5e7eb', borderRadius: '4px', background: buttonType === 'None' ? '#6366f1' : 'white', color: buttonType === 'None' ? 'white' : '#6b7280', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}
                            >
                                <XCircle size={16} /> None
                            </button>
                            <button
                                onClick={() => setButtonType('Call To Action')}
                                style={{ padding: '0.6rem 1rem', border: buttonType === 'Call To Action' ? 'none' : '1px solid #e5e7eb', borderRadius: '4px', background: buttonType === 'Call To Action' ? '#6366f1' : 'white', color: buttonType === 'Call To Action' ? 'white' : '#6b7280', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}
                            >
                                <MousePointerClick size={16} /> Call To Action
                            </button>
                            <button
                                onClick={() => setButtonType('Quick Reply')}
                                style={{ padding: '0.6rem 1rem', border: buttonType === 'Quick Reply' ? 'none' : '1px solid #e5e7eb', borderRadius: '4px', background: buttonType === 'Quick Reply' ? '#6366f1' : 'white', color: buttonType === 'Quick Reply' ? 'white' : '#6b7280', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}
                            >
                                <MessageSquare size={16} /> Quick Reply
                            </button>
                        </div>

                        {/* Call To Action Fields */}
                        {buttonType === 'Call To Action' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* Button 1 */}
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ width: '150px' }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase' }}>BUTTON TYPE*</label>
                                        <select style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', outline: 'none', color: '#374151', background: 'white' }}>
                                            <option>URL</option>
                                            <option>Phone Number</option>
                                        </select>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase' }}>BUTTON TEXT*</label>
                                        <input
                                            type="text"
                                            placeholder="Button display text (25)"
                                            style={{ width: '100%', padding: '0.6rem', border: '1px solid #10b981', borderRadius: '4px', outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase' }}>ACTION VALUE*</label>
                                        <input
                                            type="text"
                                            placeholder="URL/phone number"
                                            style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', outline: 'none' }}
                                        />
                                        <div style={{ textAlign: 'right', marginTop: '4px' }}>
                                            <button style={{ background: 'none', border: 'none', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                                                <Keyboard size={12} /> Variables <ChevronDown size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Button 2 */}
                                <div style={{ display: 'flex', gap: '1rem', opacity: 0.6 }}>
                                    <div style={{ width: '150px' }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase' }}>BUTTON TYPE</label>
                                        <select style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', outline: 'none', color: '#374151', background: '#f9fafb' }} disabled>
                                            <option>Select</option>
                                            <option>URL</option>
                                            <option>Phone Number</option>
                                        </select>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase' }}>BUTTON TEXT</label>
                                        <input
                                            type="text"
                                            placeholder="Button display text (25)"
                                            disabled
                                            style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', outline: 'none', background: '#f9fafb' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase' }}>ACTION VALUE</label>
                                        <input
                                            type="text"
                                            placeholder="URL/phone number"
                                            disabled
                                            style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', outline: 'none', background: '#f9fafb' }}
                                        />
                                        <div style={{ textAlign: 'right', marginTop: '4px' }}>
                                            <button disabled style={{ background: 'none', border: 'none', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto', color: '#9ca3af' }}>
                                                <Keyboard size={12} /> Variables <ChevronDown size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Footer Actions */}
                <div style={{ padding: '1rem 1.5rem', background: '#f9fafb', borderTop: '1px solid #e5e7eb', borderRadius: '0 0 8px 8px' }}>
                    <button style={{
                        padding: '0.6rem 1.5rem',
                        background: '#047857',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <Save size={16} /> Save
                    </button>
                </div>
            </div>
        </div>
    );
}


