import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

// Using the AI generated image path we have in brain
const heroImage = "/images/farmhouse_hero_day_1777125835860.png";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background subtle zoom
      gsap.fromTo('.hero-bg', 
        { scale: 1.1 }, 
        { scale: 1, duration: 10, ease: 'power2.out' }
      );

      // Text animation
      gsap.from('.hero-stagger', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div 
        className="hero-bg" 
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      <div className="hero-overlay"></div>
      
      <div className="container hero-content">
        <span className="hero-subtitle hero-stagger">Welcome to</span>
        <h1 className="hero-title hero-stagger">
          Your Perfect <br/>
          <span>Event Destination</span>
        </h1>
        <p className="hero-desc hero-stagger">
          Experience unforgettable moments at the perfect farmhouse destination. 
          Premium setups for family picnics, weddings, and private events.
        </p>
        <div className="hero-actions hero-stagger">
          <Link to="/booking" className="btn btn-primary">
            Book Now <ArrowRight size={20} />
          </Link>
          <Link to="/services" className="btn btn-outline" style={{color: 'white', borderColor: 'white'}}>
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
