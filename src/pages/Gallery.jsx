import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobalHero from '../components/GlobalHero';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Farm House', 'Weddings', 'Picnics'];

const galleryItems = [
  { id: 1, category: 'Farm House', image: '/images/hero-front.png', title: 'Farmhouse Exterior' },
  { id: 2, category: 'Farm House', image: '/images/gallery-bedroom.png', title: 'Luxury Bedroom' },
  { id: 3, category: 'Farm House', image: '/images/gallery-lobby.png', title: 'Grand Lobby' },
  { id: 4, category: 'Farm House', image: '/images/gallery-view.png', title: 'Beautiful Outdoor View' },
  { id: 5, category: 'Farm House', image: '/images/pool-area.png', title: 'Swimming Pool Area' },
  { id: 6, category: 'Weddings', image: '/images/Screenshot (53).png', title: 'Wedding Setup' },
  { id: 7, category: 'Weddings', image: '/images/wedding-2.png', title: 'Beautiful Wedding Decor' },
  { id: 8, category: 'Weddings', image: '/images/wedding-3.png', title: 'Wedding Ceremony Area' },
  { id: 9, category: 'Weddings', image: '/images/wedding-4.jpg', title: 'Night Wedding View' },
  { id: 10, category: 'Picnics', image: '/images/statue-horse.png', title: 'Statue Horse' },
  { id: 11, category: 'Picnics', image: '/images/picnic booking.png', title: 'Picnic Booking' }
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
    <div ref={containerRef} className="gallery-page" style={{ backgroundColor: 'var(--color-primary)', minHeight: '100vh' }}>
      
      <GlobalHero 
        title="Gallery" 
        breadcrumb="Home / Gallery" 
        bgImage="/images/hero-front.png" 
      />

      <div className="section" style={{ textAlign: 'center' }}>
        <div className="container">

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
          <div className="gallery-page-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="gallery-item gallery-page-item" style={{ backgroundColor: 'var(--color-gray)', padding: '10px', borderRadius: '12px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '8px' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
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
