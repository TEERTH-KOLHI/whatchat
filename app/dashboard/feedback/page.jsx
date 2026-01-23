"use client";
import { Star, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function FeedbackPage() {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Logic to send feedback to server would go here
    };

    if (submitted) {
        return (
            <div className="dashboard-page centered-layout">
                <div className="feedback-card success">
                    <div className="success-icon">
                        <Star size={48} fill="#f59e0b" color="#f59e0b" />
                    </div>
                    <h2>Thank You!</h2>
                    <p>We appreciate your feedback. It helps us build a better product for you.</p>
                    <button className="primary-btn" onClick={() => setSubmitted(false)}>Submit Another</button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page centered-layout">
            <div className="dev-header">
                <h1 style={{ fontSize: '1.75rem' }}>We value your feedback</h1>
                <p>Let us know how we can improve your experience</p>
            </div>

            <div className="feedback-card">
                {/* Rating Section */}
                <div className="rating-section">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            className="star-btn"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <Star
                                size={32}
                                fill={star <= (hoverRating || rating) ? "#f59e0b" : "transparent"}
                                color={star <= (hoverRating || rating) ? "#f59e0b" : "#d1d5db"}
                                strokeWidth={star <= (hoverRating || rating) ? 0 : 2}
                            />
                        </button>
                    ))}
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6b7280', margin: '0.5rem 0 2rem' }}>
                    {rating === 0 ? 'Rate your experience' :
                        rating === 5 ? 'Excellent!' :
                            rating === 4 ? 'Good' :
                                rating === 3 ? 'Average' : 'Poor'}
                </p>

                {/* Form Section */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                        <label>Feedback Category</label>
                        <select defaultValue="general">
                            <option value="general">General Feedback</option>
                            <option value="feature">Feature Request</option>
                            <option value="bug">Report a Bug</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem', textAlign: 'left' }}>
                        <label>Your Message</label>
                        <textarea
                            rows="4"
                            placeholder="Tell us what you like or what needs improvement..."
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
                        <Send size={18} style={{ marginRight: '0.5rem' }} /> Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
}
