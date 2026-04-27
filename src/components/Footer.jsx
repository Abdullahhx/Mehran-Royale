import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <Link to="/" className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '15px', textTransform: 'none', letterSpacing: 'normal' }}>
            <img src="/favicon.svg" alt="Mehran Royale Logo" style={{ width: '45px', height: '45px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '1', letterSpacing: '2px', fontFamily: 'var(--font-heading)' }}>MEHRAN ROYALE</div>
              <div style={{ fontSize: '0.65rem', fontWeight: '500', letterSpacing: '2px', marginTop: '4px', fontFamily: 'var(--font-body)', opacity: '0.9' }}>FARMHOUSE & EVENTS</div>
            </div>
          </Link>
          <p className="footer-desc">
            Experience unforgettable moments at the perfect farmhouse destination.
            Premium setups for weddings, private parties, and family picnics.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/htechsolutionsltd" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/mehranroyale/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/booking">Booking / Inquiry</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Our Services</h4>
          <ul className="footer-links">
            <li><Link to="/services">Picnic Bookings</Link></li>
            <li><Link to="/services">Private Events</Link></li>
            <li><Link to="/services">Weddings</Link></li>
            <li><Link to="/services">Corporate Gatherings</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-contact">
            <li>
              <Phone size={18} className="footer-icon" />
              <span>+92 300 1234567</span>
            </li>
            <li>
              <Mail size={18} className="footer-icon" />
              <span>info@farmhouse.com</span>
            </li>
            <li>
              <MapPin size={18} className="footer-icon" />
              <span>Karachi, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Mehran Royale Farm House. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
