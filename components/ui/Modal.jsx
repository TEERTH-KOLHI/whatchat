export default function Modal({ children, isOpen }) {
    if (!isOpen) return null;
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)' }}>
            <div style={{ background: 'white', padding: '1rem', margin: '2rem auto', maxWidth: '500px' }}>
                {children}
            </div>
        </div>
    );
}
