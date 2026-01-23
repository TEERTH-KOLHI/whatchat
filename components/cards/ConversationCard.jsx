export default function ConversationCard({ conversation }) {
    return <div style={{ border: '1px solid #ddd', padding: '1rem' }}>{conversation.subject}</div>;
}
