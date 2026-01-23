export default function Button({ children, ...props }) {
    return (
        <button style={{ padding: '0.5rem 1rem' }} {...props}>
            {children}
        </button>
    );
}
