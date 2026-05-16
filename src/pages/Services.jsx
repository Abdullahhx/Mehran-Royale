import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Layout, MapPin, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalHero from '../components/GlobalHero';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 'picnics',
    title: 'Family Picnics',
    capacity: '20–100 people',
    facilities: ['BBQ area', 'Play area', 'Seating', 'Large Swimming Pool', 'Green Lawns'],
    desc: 'Perfect for family day-outs and casual gatherings. Enjoy our spacious green lawns, dedicated BBQ areas, and crystal-clear swimming pool designed for ultimate relaxation.',
    image: '/images/pool-area.png',
    reverse: false
  },
  {
    id: 'weddings',
    title: 'Wedding Events',
    capacity: '300–500 guests',
    facilities: ['Stage décor', 'Premium Lighting', 'Elegant Seating', 'Valet Parking', 'Bridal Room'],
    desc: 'Elegant outdoor wedding setups with customizable themes. Make your special day unforgettable with our premium floral arrangements, stunning stage designs, and top-tier hospitality.',
    image: '/images/statue-horse.png',
    reverse: true
  },
  {
    id: 'private',
    title: 'Private Parties',
    capacity: '50–200 people',
    facilities: ['Customized Decor', 'DJ Setup Area', 'Poolside Seating', 'Catering Area'],
    desc: 'Celebrate birthdays, anniversaries, and milestones in a luxurious, private setting. Our team will help you customize the space to match your exact vision.',
    image: '/images/hero-front.png',
    reverse: false
  },
  {
    id: 'corporate',
    title: 'Corporate Gatherings',
    capacity: '100–300 people',
    facilities: ['Presentation Area', 'Team Building Spaces', 'High-Speed Wi-Fi', 'Dining Setup'],
    desc: 'Take your team out of the office for a refreshing corporate retreat, annual dinner, or team-building exercise in our highly-equipped, peaceful farmhouse environment.',
    image: '/images/statue-horse.png',
    reverse: true
  }
];

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-row', {
        scrollTrigger: {
          trigger: '.services-page',
          start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out'
      });
      
      gsap.from('.page-hero-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="services-page" style={{ backgroundColor: 'var(--color-primary)' }}>
      {/* Page Hero */}
      <GlobalHero 
        title="Our Services" 
        breadcrumb="Home / Services" 
        bgImage="/images/pool-area.png" 
      />

      {/* Services List */}
      <div className="section">
        <div className="container">
          {servicesData.map((service, index) => (
            <div 
              key={index} 
              id={service.id}
              className={`service-row-layout ${service.reverse ? 'reverse' : ''}`}
            >
              {/* Image Side */}
              <div style={{ flex: 1 }}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)', height: '400px', objectFit: 'cover' }} 
                />
              </div>
              
              {/* Content Side */}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{service.title}</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>{service.desc}</p>
                
                <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users className="service-icon" style={{ color: 'var(--color-accent)' }} size={24} />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Capacity</span>
                      <strong>{service.capacity}</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin className="service-icon" style={{ color: 'var(--color-accent)' }} size={24} />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</span>
                      <strong>Main Lawns / Pool</strong>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Included Facilities:</h4>
                  <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {service.facilities.map((fac, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-light)' }}>
                        <CheckCircle size={18} style={{ color: 'var(--color-accent)' }} /> {fac}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link to="/booking" className="btn btn-primary">Book This Service</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
