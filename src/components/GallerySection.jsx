import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ZoomIn } from 'lucide-react';
import './GallerySection.css';

const categories = ['All', 'Weddings', 'Events', 'Picnics'];

const galleryImages = [
  { id: 1, category: 'Picnics', src: '/images/pool-area.png', title: 'Family Picnic Pool' },
  { id: 2, category: 'Weddings', src: '/images/statue-horse.png', title: 'Wedding Setup' },
  { id: 3, category: 'Events', src: '/images/hero-front.png', title: 'Farmhouse Exterior' },
  { id: 4, category: 'Picnics', src: '/images/pool-area.png', title: 'Poolside Relaxing' },
  { id: 5, category: 'Weddings', src: '/images/statue-horse.png', title: 'Night Event Setup' },
  { id: 6, category: 'Events', src: '/images/hero-front.png', title: 'Lawn Area' }
];

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCat, setActiveCat] = useState('All');
  const galleryRef = useRef(null);

  const filteredImages = activeCat === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCat);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        scrollTrigger: {
          trigger: '.gallery-section',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Re-trigger GSAP animation when category changes
    if (galleryRef.current) {
      gsap.fromTo('.gallery-item', 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [activeCat]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="section gallery-section" ref={galleryRef} style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Our Moments</span>
          <h2>Explore The Gallery</h2>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
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

        <div className="gallery-grid">
          {filteredImages.map((img, index) => (
            <div 
              key={img.id} 
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <img src={img.src} alt={img.title} loading="lazy" />
              <div className="gallery-item-overlay">
                <ZoomIn size={32} color="#fff" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && filteredImages[currentImageIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-close" onClick={closeLightbox}>
            <X size={32} />
          </div>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={filteredImages[currentImageIndex].src} 
              alt={filteredImages[currentImageIndex].title} 
              className="lightbox-image" 
            />
            <div className="lightbox-caption">
              {filteredImages[currentImageIndex].title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
