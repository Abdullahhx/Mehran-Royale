import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const FacebookIcon = () => (
  <svg xmlns="http://www.开展w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <header className={`navbar ${scrolled || !isHome ? 'nav-scrolled glass' : ''}`}>
      <div className="container nav-container">
        <NavLink to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '15px', textTransform: 'none', letterSpacing: 'normal', textDecoration: 'none', color: 'inherit' }} onClick={() => setIsOpen(false)}>
          <img src="/favicon.svg" alt="Mehran Royale Logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '1', letterSpacing: '2px', fontFamily: 'var(--font-heading)' }}>MEHRAN ROYALE</div>
            <div style={{ fontSize: '0.65rem', fontWeight: '500', letterSpacing: '2px', marginTop: '4px', fontFamily: 'var(--font-body)', opacity: '0.9' }}>FARMHOUSE & EVENTS</div>
          </div>
        </NavLink>

        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About Us</NavLink>
          <NavLink to="/services" className="nav-link" onClick={() => setIsOpen(false)}>Services</NavLink>
          <NavLink to="/gallery" className="nav-link" onClick={() => setIsOpen(false)}>Gallery</NavLink>
          <NavLink to="/booking" className="nav-link" onClick={() => setIsOpen(false)}>Booking</NavLink>
          <NavLink to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</NavLink>

          <div className="nav-socials">
            <a href="https://www.facebook.com/htechsolutionsltd" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/mehranroyale/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </nav>

        <div className="nav-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
