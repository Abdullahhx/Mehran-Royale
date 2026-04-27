import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Weddings', 'Events', 'Picnics'];

const galleryItems = [
  { id: 1, category: 'Weddings', image: '/images/wedding_setup_lawn_1777125850486.png', title: 'Elegant Floral Stage' },
  { id: 2, category: 'Picnics', image: '/images/picnic_family_pool_1777125863872.png', title: 'Poolside Family Picnic' },
  { id: 3, category: 'Events', image: '/images/farmhouse_hero_day_1777125835860.png', title: 'Corporate Retreat Setup' },
  { id: 4, category: 'Weddings', image: '/images/wedding_setup_lawn_1777125850486.png', title: 'Night Time Lighting Setup' },
  { id: 5, category: 'Events', image: '/images/farmhouse_hero_day_1777125835860.png', title: 'Private Birthday Gathering' },
  { id: 6, category: 'Picnics', image: '/images/picnic_family_pool_1777125863872.png', title: 'Green Lawns Relaxation' },
];

const Gallery = () => {
  const [activeCat, setActiveCat] = useState('All');
  const containerRef = useRef(null);

  const filteredItems = activeCat === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCat);

  useEffect(() => {
    // Re-trigger GSAP animation when category changes
    gsap.fromTo('.gallery-item', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
  }, [activeCat]);

  return (
    <div ref={containerRef} className="gallery-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-primary)', minHeight: '100vh' }}>
      
      <div className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Our Gallery</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto 50px auto', fontSize: '1.1rem' }}>
            A glimpse into the unforgettable moments created at Mehran Royale Farm House.
          </p>

          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', flexWrap: 'wrap' }}>
            {categories.map((cat, index) => (
              <button 
                key={index} 
                onClick={() => setActiveCat(cat)}
                className={`btn ${activeCat === cat ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '8px 24px', fontSize: '0.9rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            {filteredItems.map(item => (
              <div key={item.id} className="gallery-item" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', height: '300px', cursor: 'pointer' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  padding: '20px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: 'white',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: '600' }}>{item.category}</span>
                  <h4 style={{ fontSize: '1.2rem', margin: '0' }}>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Gallery;
