import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-stagger', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
      
      gsap.fromTo('.about-image', 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ paddingTop: '100px', backgroundColor: 'var(--color-primary)', minHeight: '100vh' }}>
      
      <div className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '60px', alignItems: 'center' }}>
            
            {/* Image */}
            <div className="about-image" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', height: '600px' }}>
              <img 
                src="/images/farmhouse_hero_day_1777125835860.png" 
                alt="Mehran Royale Exterior" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Content */}
            <div>
              <span className="about-stagger" style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', marginBottom: '15px' }}>Our Story</span>
              <h1 className="about-stagger" style={{ fontSize: '3.5rem', marginBottom: '30px' }}>Where Memories Are Made</h1>
              
              <div className="about-stagger">
                <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                  We provide a premium farmhouse experience designed for family picnics, weddings, and private events. With spacious green lawns, elegant setups, and top-tier service, we ensure every event becomes memorable.
                </p>
                <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                  Mehran Royale was established with a singular vision: to offer a sanctuary away from the hustle of the city, where luxury meets nature. Whether you are walking down the aisle, hosting a corporate retreat, or simply spending a sunny afternoon by the pool with your family, our facilities are crafted to exceed your expectations.
                </p>
              </div>

              <div className="about-stagger" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px', paddingTop: '40px', borderTop: '1px solid var(--color-gray-dark)' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '2rem', color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>500+</strong>
                  <span style={{ color: 'var(--color-text-light)' }}>Events Hosted</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '2rem', color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>50,000</strong>
                  <span style={{ color: 'var(--color-text-light)' }}>Sqft of Lawns</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default About;
