import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ZoomIn } from 'lucide-react';
import './GallerySection.css';

const galleryImages = [
  { id: 1, src: '/images/picnic_family_pool_1777125863872.png', title: 'Family Picnic Pool' },
  { id: 2, src: '/images/wedding_setup_lawn_1777125850486.png', title: 'Wedding Setup' },
  { id: 3, src: '/images/farmhouse_hero_day_1777125835860.png', title: 'Farmhouse Exterior' },
  { id: 4, src: '/images/picnic_family_pool_1777125863872.png', title: 'Poolside Relaxing' },
  { id: 5, src: '/images/wedding_setup_lawn_1777125850486.png', title: 'Night Event Setup' },
  { id: 6, src: '/images/farmhouse_hero_day_1777125835860.png', title: 'Lawn Area' }
];

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useRef(null);

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

        <div className="gallery-grid">
          {galleryImages.map((img, index) => (
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
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-close" onClick={closeLightbox}>
            <X size={32} />
          </div>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryImages[currentImageIndex].src} 
              alt={galleryImages[currentImageIndex].title} 
              className="lightbox-image" 
            />
            <div className="lightbox-caption">
              {galleryImages[currentImageIndex].title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
