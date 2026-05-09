import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobalHero from '../components/GlobalHero';
import { Wifi, Coffee, Map, Shield, Users, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  { icon: <Wifi size={32} />, title: 'High-Speed Wi-Fi', desc: 'Stay connected throughout the property.' },
  { icon: <Coffee size={32} />, title: 'Catering Options', desc: 'Delicious food tailored for your events.' },
  { icon: <Map size={32} />, title: 'Spacious Lawns', desc: 'Lush green lawns for outdoor setups.' },
  { icon: <Shield size={32} />, title: 'Secure Environment', desc: '24/7 security for your peace of mind.' },
];


const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-stagger', {
        scrollTrigger: {
          trigger: '.about-welcome',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
      
      gsap.from('.amenity-card', {
        scrollTrigger: {
          trigger: '.about-amenities',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'all'
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-primary)', minHeight: '100vh' }}>
      
      <GlobalHero 
        title="About Us" 
        breadcrumb="Home / About" 
        bgImage="/images/hero-front.png" 
      />

      {/* Welcome Section */}
      <div className="section about-welcome" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            
            <div className="about-image" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', height: '500px' }}>
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                src="/farmhouse-video.mp4"
                style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
              />
            </div>

            <div>
              <span className="about-stagger" style={{ display: 'block', fontSize: '1rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', marginBottom: '15px' }}>Our Story</span>
              <h2 className="about-stagger" style={{ fontSize: '3rem', marginBottom: '30px' }}>Welcome to Mehran Royale</h2>
              
              <div className="about-stagger">
                <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--color-text)' }}>
                  Mehran Royale was established with a singular vision: to offer a sanctuary away from the hustle of the city, where luxury meets nature. Whether you are walking down the aisle, hosting a corporate retreat, or simply spending a sunny afternoon by the pool with your family, our facilities are crafted to exceed your expectations.
                </p>
                <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: 'var(--color-text)' }}>
                  We provide a premium farmhouse experience designed for family picnics, weddings, and private events. With spacious green lawns, elegant setups, and top-tier service, we ensure every event becomes memorable.
                </p>
              </div>

              <div className="about-stagger" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px', paddingTop: '40px', borderTop: '1px solid var(--color-gray-dark)' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '2.5rem', color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>500+</strong>
                  <span style={{ color: 'var(--color-text-light)' }}>Events Hosted</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '2.5rem', color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>50,000</strong>
                  <span style={{ color: 'var(--color-text-light)' }}>Sqft of Lawns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="section about-amenities" style={{ backgroundColor: 'var(--color-gray)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '1rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', marginBottom: '15px' }}>Why Choose Us</span>
          <h2 style={{ fontSize: '3rem', marginBottom: '60px' }}>Premium Amenities</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            {amenities.map((item, i) => (
              <div key={i} className="amenity-card" style={{ padding: '40px 20px', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-accent)', marginBottom: '20px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-light)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Luxury Experience Section */}
      <div className="section" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '1rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', marginBottom: '15px' }}>Luxury Lifestyle</span>
              <h2 style={{ fontSize: '3rem', marginBottom: '30px' }}>Unmatched Elegance and Comfort</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--color-text)' }}>
                Step into a world of refined elegance where every detail is meticulously curated to provide the ultimate luxury experience. From the grandeur of our entrance to the serene beauty of our lush gardens, Mehran Royale stands as a beacon of sophistication.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '30px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', fontSize: '1.1rem' }}><span style={{ color: 'var(--color-accent)' }}>✔</span> State-of-the-art facilities</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', fontSize: '1.1rem' }}><span style={{ color: 'var(--color-accent)' }}>✔</span> Professional event management team</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', fontSize: '1.1rem' }}><span style={{ color: 'var(--color-accent)' }}>✔</span> Exquisite culinary experiences</li>
              </ul>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
               <img src="/images/statue-horse.png" alt="Luxury 1" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', marginTop: '40px' }} />
               <img src="/images/pool-area.png" alt="Luxury 2" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
