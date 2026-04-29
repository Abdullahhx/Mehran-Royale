import Hero from '../components/Hero';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import GallerySection from '../components/GallerySection';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Picnic Bookings',
    desc: 'Perfect for family day-outs and casual gatherings with a huge swimming pool.',
    image: '/images/picnic_family_pool_1777125863872.png'
  },
  {
    title: 'Weddings',
    desc: 'Elegant outdoor wedding setups with customizable themes on lush green lawns.',
    image: '/images/wedding_setup_lawn_1777125850486.png'
  },
  {
    title: 'Private Parties',
    desc: 'Exclusive private events tailored to your needs in a luxurious setting.',
    image: '/images/farmhouse_hero_day_1777125835860.png'
  }
];

const testimonials = [
  {
    name: 'Ahmed R.',
    text: 'Amazing experience! The environment was clean and perfect for our family picnic. The pool is huge and the lawns are pristine.',
    rating: 5
  },
  {
    name: 'Sara K.',
    text: 'We hosted our wedding here and everything was perfectly managed. The lighting at night and the gorgeous floral stage setup was wonderful.',
    rating: 5
  }
];

const Home = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Services Animation
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Welcome Section Animation
      gsap.from('.welcome-text', {
        scrollTrigger: {
          trigger: '.welcome-section',
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, mainRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef}>
      <Hero />
      
      {/* Welcome Section */}
      <section className="section welcome-section" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle welcome-text">Mehran Royale Farm House</span>
          <h2 className="welcome-text">A Premium Destination for Unforgettable Events</h2>
          <p className="welcome-text" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
            We provide a premium farmhouse experience designed for family picnics, weddings, and private events. 
            With spacious green lawns, elegant setups, and top-tier service, we ensure every event becomes memorable.
          </p>
          <video 
            className="welcome-text"
            autoPlay 
            loop 
            muted 
            playsInline
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', boxShadow: 'var(--shadow-md)', pointerEvents: 'none' }}
          />
        </div>
      </section>

      {/* Services Preview */}
      <section className="section services-section" style={{ backgroundColor: 'var(--color-gray)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Offerings</span>
            <h2>Premium Services for Every Occasion</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {services.map((service, index) => (
              <div key={index} className="service-card" style={{ backgroundColor: 'var(--color-primary)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ height: '250px', overflow: 'hidden' }}>
                  <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                </div>
                <div style={{ padding: '30px' }}>
                  <h3 style={{ fontSize: '1.5rem' }}>{service.title}</h3>
                  <p>{service.desc}</p>
                  <Link to="/services" style={{ color: 'var(--color-accent)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/services" className="btn btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Client Stories</span>
            <h2>What Our Guests Say</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            {testimonials.map((test, index) => (
              <div key={index} style={{ padding: '40px', backgroundColor: 'var(--color-gray)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '5px', color: 'var(--color-accent)', marginBottom: '20px' }}>
                  {[...Array(test.rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: '20px' }}>
                  "{test.text}"
                </p>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                  - {test.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Map Section */}
      <section className="section map-section" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container">
          <div style={{ backgroundColor: '#e5e3df', borderRadius: '16px', overflow: 'hidden', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
            <div style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>
              <MapPin size={48} style={{ margin: '0 auto 15px auto', color: 'var(--color-text)' }} />
              <h3>Interactive Google Map</h3>
              <p>Location: Karachi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section" style={{ backgroundColor: 'var(--color-accent-dark)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '20px' }}>Ready to Book Your Event?</h2>
          <p style={{ color: 'white', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Contact our team today to discuss your requirements, check availability, and secure your date.
          </p>
          <Link to="/booking" className="btn" style={{ backgroundColor: 'white', color: 'var(--color-accent-dark)' }}>
            Request a Booking
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
