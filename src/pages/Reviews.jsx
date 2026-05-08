import { useEffect } from 'react';
import GlobalHero from '../components/GlobalHero';
import GoogleReviews from '../components/GoogleReviews';

const Reviews = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-primary)', minHeight: '100vh' }}>
      <GlobalHero 
        title="Guest Reviews" 
        breadcrumb="Home / Reviews" 
        bgImage="/images/hero-front.png" 
      />
      
      {/* Passing no limit so it shows all reviews on the dedicated page */}
      <GoogleReviews />
      
    </div>
  );
};

export default Reviews;
