import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import './GoogleReviews.css';

gsap.registerPlugin(ScrollTrigger);

const googleReviewsData = [
  {
    id: 1,
    author_name: "Ahmed Raza",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Amazing experience! The environment was clean and perfect for our family picnic. The pool is huge and the lawns are pristine.",
    is_local_guide: true,
    reviews_count: 14
  },
  {
    id: 2,
    author_name: "Sara Khan",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "We hosted our wedding here and everything was perfectly managed. The lighting at night and the gorgeous floral stage setup was wonderful.",
    is_local_guide: false,
    reviews_count: 2
  },
  {
    id: 3,
    author_name: "Muhammad Ali",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "One of the best farmhouses in Karachi. Very secure, spacious, and well-maintained. The caretaker was very cooperative.",
    is_local_guide: true,
    reviews_count: 32
  },
  {
    id: 4,
    author_name: "Fatima Noor",
    profile_photo_url: "",
    rating: 4,
    relative_time_description: "3 months ago",
    text: "Great place for a large family gathering. Kids enjoyed the pool area. Beautiful green lawns and seating arrangements.",
    is_local_guide: false,
    reviews_count: 5
  }
];

const GoogleReviews = () => {
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

  // Helper to get initials if no photo
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <section className="section google-reviews-section" ref={sectionRef} style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container">
        <div className="section-header google-reviews-header">
          <div className="google-badge-container">
            <h2 className="google-title">
              <span className="google-g-blue">G</span>
              <span className="google-o-red">o</span>
              <span className="google-o-yellow">o</span>
              <span className="google-g-blue">g</span>
              <span className="google-l-green">l</span>
              <span className="google-e-red">e</span>
              {' '}Reviews
            </h2>
            <div className="google-overall-rating">
              <span className="rating-number">4.8</span>
              <div className="rating-stars-overall">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="#fbbc04" color="#fbbc04" />)}
              </div>
              <span className="rating-count">Based on 124 reviews</span>
            </div>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-review-write">
              Write a review
            </a>
          </div>
        </div>
        
        <div className="google-reviews-grid">
          {googleReviewsData.map((review) => (
            <div key={review.id} className="google-review-card">
              <div className="review-author">
                {review.profile_photo_url ? (
                  <img src={review.profile_photo_url} alt={review.author_name} className="author-avatar" />
                ) : (
                  <div className="author-avatar-fallback" style={{ backgroundColor: getAvatarColor(review.author_name) }}>
                    {getInitials(review.author_name)}
                  </div>
                )}
                <div className="author-info">
                  <h4 className="author-name">{review.author_name}</h4>
                  <div className="author-meta">
                    {review.is_local_guide && <span className="local-guide">Local Guide · </span>}
                    <span className="reviews-count">{review.reviews_count} reviews</span>
                  </div>
                </div>
                <div className="google-icon-small">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
              <div className="review-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < review.rating ? "#fbbc04" : "#e0e0e0"} 
                      color={i < review.rating ? "#fbbc04" : "#e0e0e0"} 
                    />
                  ))}
                </div>
                <span className="review-time">{review.relative_time_description}</span>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
