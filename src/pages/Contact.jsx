import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import API_URL from '../config';
import GlobalHero from '../components/GlobalHero';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const Contact = () => {
  const containerRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-stagger', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({ name: '', contactInfo: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', contactInfo: '', subject: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 4000);
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-primary)', minHeight: '100vh' }}>
      <GlobalHero 
        title="Contact Us" 
        breadcrumb="Home / Contact" 
        bgImage="/images/statue-horse.png" 
      />

      <div className="section">
        <div className="container" style={{ maxWidth: '1200px' }}>

          {/* Map Section */}
          <div className="contact-stagger" style={{ marginBottom: '40px', backgroundColor: '#e5e3df', borderRadius: '16px', overflow: 'hidden', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
            <div style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>
              <MapPin size={48} style={{ margin: '0 auto 15px auto', color: 'var(--color-text)' }} />
              <h3>Interactive Google Map</h3>
              <p>Location: Karachi</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '40px' }}>
            
            {/* Contact Information */}
            <div className="contact-stagger">
              <div style={{ backgroundColor: 'var(--color-gray)', padding: '40px', borderRadius: '16px', height: '100%' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '30px' }}>Get in Touch</h3>
                
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ color: 'var(--color-accent)', marginTop: '2px' }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '5px' }}>Location</strong>
                      <span style={{ color: 'var(--color-text-light)', lineHeight: '1.5', display: 'block' }}>Mehran Royale Farm House<br/>Karachi, Pakistan</span>
                    </div>
                  </li>

                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ color: 'var(--color-accent)', marginTop: '2px' }}>
                      <Phone size={24} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '5px' }}>Phone</strong>
                      <span style={{ color: 'var(--color-text-light)' }}>+92 300 1234567</span>
                    </div>
                  </li>

                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ color: 'var(--color-accent)', marginTop: '2px' }}>
                      <Mail size={24} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '5px' }}>Email</strong>
                      <span style={{ color: 'var(--color-text-light)' }}>info@farmhouse.com</span>
                    </div>
                  </li>

                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '40px' }}>
                    <div style={{ color: 'var(--color-accent)', marginTop: '2px' }}>
                      <Clock size={24} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '5px' }}>Office Hours</strong>
                      <span style={{ color: 'var(--color-text-light)' }}>Mon - Sun: 9:00 AM - 8:00 PM</span>
                    </div>
                  </li>
                </ul>

                <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', borderTop: '1px solid var(--color-gray-dark)', paddingTop: '30px' }}>Follow Us</h4>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <a href="https://www.facebook.com/htechsolutionsltd" target="_blank" rel="noreferrer" style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text)', boxShadow: 'var(--shadow-sm)' }}>
                    <FacebookIcon />
                  </a>
                  <a href="https://www.instagram.com/mehranroyale/" target="_blank" rel="noreferrer" style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text)', boxShadow: 'var(--shadow-sm)' }}>
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="contact-stagger">
              <div style={{ padding: '40px', backgroundColor: 'var(--color-primary)', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-gray)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Send a Message</h3>
                <p style={{ color: 'var(--color-text-light)', marginBottom: '30px' }}>Have a quick question? Let us know below.</p>
                
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                     <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.2)', color: 'var(--color-accent-dark)', marginBottom: '20px' }}>
                      <Send size={40} />
                    </div>
                    <h4>Message Sent!</h4>
                    <p style={{ color: 'var(--color-text-light)' }}>We will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" style={{ width: '100%', padding: '14px', border: '1px solid var(--color-gray-dark)', borderRadius: '8px', fontFamily: 'var(--font-body)' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone/Email *</label>
                        <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required placeholder="john@example.com" style={{ width: '100%', padding: '14px', border: '1px solid var(--color-gray-dark)', borderRadius: '8px', fontFamily: 'var(--font-body)' }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="General Inquiry" style={{ width: '100%', padding: '14px', border: '1px solid var(--color-gray-dark)', borderRadius: '8px', fontFamily: 'var(--font-body)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Message *</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required placeholder="How can we help you?" style={{ width: '100%', padding: '14px', border: '1px solid var(--color-gray-dark)', borderRadius: '8px', fontFamily: 'var(--font-body)' }}></textarea>
                    </div>
                    <div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>Send Message</button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
