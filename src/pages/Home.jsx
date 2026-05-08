import Hero from '../components/Hero';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import GallerySection from '../components/GallerySection';
import GoogleReviews from '../components/GoogleReviews';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Picnic Bookings',
    desc: 'Perfect for family day-outs and casual gatherings with a huge swimming pool.',
    image: '/images/picnic booking.png',
    link: '/services#picnics'
  },
  {
    title: 'Weddings',
    desc: 'Elegant outdoor wedding setups with customizable themes on lush green lawns.',
    image: '/images/Screenshot (53).png',
    link: '/services#weddings'
  },
  {
    title: 'Private Parties',
    desc: 'Exclusive private events tailored to your needs in a luxurious setting.',
    image: '/images/pool-area.png',
    link: '/services#private'
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
            src="/farmhouse-video.mp4"
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
                  <Link to={service.link} style={{ color: 'var(--color-accent)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
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

      {/* Google Reviews */}
      <GoogleReviews />

      {/* Gallery Section */}
      <GallerySection />

      {/* Map Section */}
      <section className="section map-section" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container">
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '400px', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
            <iframe 
              src="https://maps.google.com/maps?q=24.9289984,67.2568227&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mehran Royal Farm House Location"
            ></iframe>
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
