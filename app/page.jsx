import Link from 'next/link';

export default function LandingPage() {
    return (
        <main style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome to WhatChat</h1>
            <Link href="/login">Go to Login</Link>
        </main>
    );
}
