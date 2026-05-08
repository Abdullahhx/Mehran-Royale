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
            <a href="https://www.google.com/maps/search/?api=1&query=24.9289984,67.2568227" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-review-write">
              Write a Review
            </a>
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
    </section>
  );
};

export default GoogleReviews;
