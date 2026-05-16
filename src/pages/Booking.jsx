import { useState, useEffect } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API_URL from '../config';
import GlobalHero from '../components/GlobalHero';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Picnic',
    guests: '',
    message: ''
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch(`${API_URL}/api/booking/booked-dates`);
        if (response.ok) {
          const data = await response.json();
          // Convert strings to Date objects
          const dates = data.map(dateStr => new Date(dateStr));
          setBookedDates(dates);
        }
      } catch (error) {
        console.error('Error fetching booked dates:', error);
      }
    };
    fetchBookedDates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedDate) {
      setErrorMsg('Please select a date.');
      return;
    }

    try {
      const payload = { ...formData, date: selectedDate };
      const response = await fetch(`${API_URL}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Refresh booked dates so the newly booked date is blocked immediately
        setBookedDates([...bookedDates, selectedDate]);

        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', phone: '', eventType: 'Picnic', guests: '', message: '' });
          setSelectedDate(null);
        }, 4000);
      } else {
        setErrorMsg(data.error || 'Failed to submit booking. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundColor: 'var(--color-gray)', minHeight: '100vh' }}>

      <GlobalHero
        title="Request a Booking"
        breadcrumb="Home / Booking"
        bgImage="/images/pool-area.png"
      />

      <div className="section">
        <div className="container" style={{ maxWidth: '1000px' }}>

          <div className="responsive-grid-2" style={{ backgroundColor: 'var(--color-primary)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>

            {/* Contact Info Sidebar */}
            <div style={{ backgroundColor: 'var(--color-accent-dark)', color: 'white', padding: '40px' }}>
              <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '30px' }}>Contact Information</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '40px' }}>
                Have urgent questions? Reach out to us directly through WhatsApp or a phone call.
              </p>

              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', fontSize: '1.1rem' }}>
                  <Phone size={24} style={{ color: 'var(--color-accent-light)' }} />
                  +92 321 3862733
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', fontSize: '1.1rem' }}>
                  <Mail size={24} style={{ color: 'var(--color-accent-light)' }} />
                  info@mehranroyale.com
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', fontSize: '1.1rem' }}>
                  <MapPin size={24} style={{ color: 'var(--color-accent-light)' }} />
                  Karachi, Pakistan
                </li>
              </ul>

              <div style={{ marginTop: '50px' }}>
                <a href="https://wa.me/923213862733" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: '#25D366', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold' }}>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Main Form */}
            <div style={{ padding: '40px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.2)', color: 'var(--color-accent-dark)', marginBottom: '20px' }}>
                    <Send size={40} />
                  </div>
                  <h3>Request Sent Successfully!</h3>
                  <p>We have received your inquiry and will contact you shortly to confirm the details.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="responsive-grid-2">

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Mehran" style={{ width: '100%', padding: '14px', border: '1px solid var(--color-gray-dark)', borderRadius: '8px', fontFamily: 'var(--font-body)' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+92 3XX XXXXXXX" style={{ width: '100%', padding: '14px', border: '1px solid var(--color-gray-dark)', borderRadius: '8px', fontFamily: 'var(--font-body)' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Event Type *</label>
                    <select name="eventType" required value={formData.eventType} onChange={handleChange} style={{ width: '100%', padding: '14px', border: '1px solid var(--color-gray-dark)', borderRadius: '8px', fontFamily: 'var(--font-body)', appearance: 'none', backgroundColor: 'white' }}>
                      <option value="Picnic">Family Picnic</option>
                      <option value="Wedding">Wedding Event</option>
                      <option value="Private">Private Party</option>
                      <option value="Corporate">Corporate Gathering</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Preferred Date *</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      excludeDates={bookedDates}
                      minDate={new Date()}
                      placeholderText="Select an available date"
                      required
                      wrapperClassName="date-picker-wrapper"
                      customInput={<input style={{ width: '100%', padding: '14px', border: '1px solid var(--color-gray-dark)', borderRadius: '8px', fontFamily: 'var(--font-body)' }} />}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Number of Guests *</label>
                    <input type="number" name="guests" required value={formData.guests} onChange={handleChange} placeholder="e.g. 50" style={{ width: '100%', padding: '14px', border: '1px solid var(--color-gray-dark)', borderRadius: '8px', fontFamily: 'var(--font-body)' }} />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Special Requirements / Message</label>
                    <textarea name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Tell us more about your event..." style={{ width: '100%', padding: '14px', border: '1px solid var(--color-gray-dark)', borderRadius: '8px', fontFamily: 'var(--font-body)' }}></textarea>
                  </div>

                  {errorMsg && (
                    <div style={{ gridColumn: '1 / -1', color: 'red', marginBottom: '10px' }}>
                      {errorMsg}
                    </div>
                  )}

                  <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}>Submit Request</button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
