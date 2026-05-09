import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import API_URL from '../config';
import './GoogleReviews.css';

gsap.registerPlugin(ScrollTrigger);

const staticReviewsData = [
  {
    _id: 'static1',
    author_name: "Ahmed Raza",
    rating: 5,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    text: "Amazing experience! The environment was clean and perfect for our family picnic. The pool is huge and the lawns are pristine. Highly recommended for family events.",
    is_local_guide: true
  },
  {
    _id: 'static2',
    author_name: "Sara Khan",
    rating: 5,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
    text: "We hosted our wedding here and everything was perfectly managed. The lighting at night and the gorgeous floral stage setup was wonderful.",
    is_local_guide: false
  },
  {
    _id: 'static3',
    author_name: "Muhammad Ali",
    rating: 5,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
    text: "One of the best farmhouses in Karachi. Very secure, spacious, and well-maintained. The caretaker was very cooperative and the overall vibe is extremely premium.",
    is_local_guide: true
  },
  {
    _id: 'static4',
    author_name: "Fatima Noor",
    rating: 4,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
    text: "Great place for a large family gathering. Kids enjoyed the pool area. Beautiful green lawns and seating arrangements. Will definitely visit again.",
    is_local_guide: false
  }
];

const GoogleReviews = ({ limit }) => {
  const sectionRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', rating: 5, message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/reviews`);
      if (response.ok) {
        const dbReviews = await response.json();
        setReviews([...dbReviews, ...staticReviewsData]);
      } else {
        setReviews(staticReviewsData);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews(staticReviewsData);
    }
  };

  useEffect(() => {
    if (reviews.length > 0) {
      const timer = setTimeout(() => {
        const ctx = gsap.context(() => {
          gsap.fromTo('.google-review-card', 
            { y: 50, opacity: 0 },
            {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out'
            }
          );
          ScrollTrigger.refresh();
        }, sectionRef);
        
        return () => ctx.revert();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [reviews]);

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name) => {
    if (!name) return 'var(--color-accent)';
    const colors = ['var(--color-accent)', 'var(--color-accent-dark)', '#8c7322', '#b3952d'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          rating: formData.rating,
          message: formData.message
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

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return b.rating - a.rating;
    }
  });

  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) : 4.8;

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    return "Recently";
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
              <span className="rating-number">{averageRating}</span>
              <div className="rating-stars-overall">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="var(--color-accent)" color="var(--color-accent)" />)}
              </div>
              <span className="rating-count">{reviews.length} Google Reviews</span>
            </div>
            
            <div className="google-reviews-actions">
              <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-review-write">
                Write a Review
              </button>
            </div>
          </div>
        </div>
        
        <div className="google-reviews-grid">
          {sortedReviews.map((review) => (
            <div key={review._id} className="google-review-card">
              <div className="review-author">
                <div className="author-avatar-fallback" style={{ backgroundColor: getAvatarColor(review.author_name) }}>
                  {getInitials(review.author_name)}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{review.author_name}</h4>
                  <div className="author-meta">
                    {review.is_local_guide && <span className="local-guide">Local Guide · </span>}
                    <span className="reviews-count">Guest</span>
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
                <span className="review-time">{timeAgo(review.createdAt)}</span>
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
