import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import './GoogleReviews.css';

gsap.registerPlugin(ScrollTrigger);

const googleReviewsData = [
  {
    id: 1,
    author_name: "Ahmed Raza",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Amazing experience! The environment was clean and perfect for our family picnic. The pool is huge and the lawns are pristine. Highly recommended for family events.",
    is_local_guide: true,
    reviews_count: 14
  },
  {
    id: 2,
    author_name: "Sara Khan",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "We hosted our wedding here and everything was perfectly managed. The lighting at night and the gorgeous floral stage setup was wonderful.",
    is_local_guide: false,
    reviews_count: 2
  },
  {
    id: 3,
    author_name: "Muhammad Ali",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "One of the best farmhouses in Karachi. Very secure, spacious, and well-maintained. The caretaker was very cooperative and the overall vibe is extremely premium.",
    is_local_guide: true,
    reviews_count: 32
  },
  {
    id: 4,
    author_name: "Fatima Noor",
    rating: 4,
    relative_time_description: "3 months ago",
    text: "Great place for a large family gathering. Kids enjoyed the pool area. Beautiful green lawns and seating arrangements. Will definitely visit again.",
    is_local_guide: false,
    reviews_count: 5
  },
  {
    id: 5,
    author_name: "Hassan Syed",
    rating: 5,
    relative_time_description: "4 months ago",
    text: "The ultimate luxury destination for private parties. The villa is majestic and the staff is extremely professional. Worth every penny.",
    is_local_guide: true,
    reviews_count: 11
  },
  {
    id: 6,
    author_name: "Ayesha Malik",
    rating: 5,
    relative_time_description: "5 months ago",
    text: "Absolutely stunning location. The sunset view by the pool is breathtaking. Perfect getaway from the city's noise without having to travel too far.",
    is_local_guide: false,
    reviews_count: 3
  }
];

const GoogleReviews = ({ limit }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.google-review-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['var(--color-accent)', 'var(--color-accent-dark)', '#8c7322', '#b3952d'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const displayedReviews = limit ? googleReviewsData.slice(0, limit) : googleReviewsData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', rating: 5, message: '' });
  const [status, setStatus] = useState('');

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          contactInfo: `Rating: ${formData.rating} Stars`,
          subject: 'New Guest Review Submitted via Website',
          message: `The user left this review:\n\n${formData.message}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setIsModalOpen(false);
          setStatus('');
          setFormData({ name: '', rating: 5, message: '' });
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="section google-reviews-section" ref={sectionRef} style={{ backgroundColor: 'var(--color-secondary)' }}>
      <div className="container">
        <div className="section-header google-reviews-header">
          <div className="google-badge-container">
            <span className="section-subtitle">Testimonials</span>
            <h2 className="google-title">
              Guest <span className="google-title-highlight">Reviews</span>
            </h2>
            <div className="google-overall-rating">
              <span className="rating-number">4.8</span>
              <div className="rating-stars-overall">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="var(--color-accent)" color="var(--color-accent)" />)}
              </div>
              <span className="rating-count">124 Google Reviews</span>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-review-write">
              Write a Review
            </button>
          </div>
        </div>
        
        <div className="google-reviews-grid">
          {displayedReviews.map((review) => (
            <div key={review.id} className="google-review-card">
              <div className="review-author">
                <div className="author-avatar-fallback" style={{ backgroundColor: getAvatarColor(review.author_name) }}>
                  {getInitials(review.author_name)}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{review.author_name}</h4>
                  <div className="author-meta">
                    {review.is_local_guide && <span className="local-guide">Local Guide · </span>}
                    <span className="reviews-count">{review.reviews_count} reviews</span>
                  </div>
                </div>
              </div>
              <div className="review-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < review.rating ? "var(--color-accent)" : "#e0e0e0"} 
                      color={i < review.rating ? "var(--color-accent)" : "#e0e0e0"} 
                    />
                  ))}
                </div>
                <span className="review-time">{review.relative_time_description}</span>
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      <div className={`review-modal-overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="review-modal">
          <h3>Write a Review</h3>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Star size={48} color="var(--color-accent)" fill="var(--color-accent)" style={{ marginBottom: '20px' }} />
              <h4 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Thank You!</h4>
              <p>Your review has been submitted successfully and will be visible after approval.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Rating</label>
                <div className="star-rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={32} 
                      onClick={() => handleStarClick(star)}
                      fill={star <= formData.rating ? "var(--color-accent)" : "transparent"} 
                      color={star <= formData.rating ? "var(--color-accent)" : "var(--color-gray-dark)"} 
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    />
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Your Experience</label>
                <textarea 
                  required 
                  placeholder="Tell us about your experience at Mehran Royale..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              {status === 'error' && (
                <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '15px' }}>There was an error submitting your review. Please try again.</p>
              )}

              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
