"use client";
import { Plus, ShoppingBag, Image as ImageIcon, MoreVertical } from 'lucide-react';

const PRODUCTS = [
    { id: 1, name: "Premium T-Shirt", price: "$29.99", stock: 150, image: "👕" },
    { id: 2, name: "Canvas Totebag", price: "$14.50", stock: 85, image: "👜" },
    { id: 3, name: "Gift Card $50", price: "$50.00", stock: 999, image: "💳" },
];

export default function EcommerceCatalogPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row">
                <div className="page-title" style={{ marginBottom: 0 }}>eCommerce Catalog</div>
                <button className="primary-btn"><Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Product</button>
            </div>

            <div className="automation-grid">
                {PRODUCTS.map((product) => (
                    <div key={product.id} className="automation-card">
                        <div style={{ height: '140px', background: '#f9fafb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: '1rem' }}>
                            {product.image}
                        </div>
                        <div className="automation-header" style={{ marginBottom: '0.5rem' }}>
                            <h3 style={{ fontSize: '1rem' }}>{product.name}</h3>
                            <button className="icon-btn"><MoreVertical size={16} /></button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontWeight: 700, color: '#19877b' }}>{product.price}</span>
                            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{product.stock} in stock</span>
                        </div>
                        <button className="action-btn" style={{ width: '100%' }}>Edit Product</button>
                    </div>
                ))}

                {/* Add New Placeholder */}
                <div className="automation-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', cursor: 'pointer', minHeight: '300px' }}>
                    <div style={{ padding: '1rem', background: '#f0fdf9', borderRadius: '50%', color: '#19877b', marginBottom: '1rem' }}>
                        <Plus size={24} />
                    </div>
                    <h3 style={{ color: '#19877b' }}>Add New Product</h3>
                </div>
            </div>
        </div>
    );
}
