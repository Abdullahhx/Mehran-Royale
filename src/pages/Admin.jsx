import { useState, useEffect } from 'react';
import { Trash2, CheckCircle, XCircle, Mail, Calendar, User, Phone, Users, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import API_URL from '../config';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, contactsRes, reviewsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/bookings`),
        fetch(`${API_URL}/api/admin/contacts`),
        fetch(`${API_URL}/api/admin/reviews`)
      ]);
      
      if (bookingsRes.ok && contactsRes.ok && reviewsRes.ok) {
        const bookingsData = await bookingsRes.json();
        const contactsData = await contactsRes.json();
        const reviewsData = await reviewsRes.json();
        setBookings(bookingsData);
        setContacts(contactsData);
        setReviews(reviewsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/bookings/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/contacts/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const toggleReviewApproval = async (id, is_approved) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_approved })
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/reviews/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--color-gray)' }}>
      <div className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem' }}>Admin Dashboard</h1>
            <button onClick={fetchData} className="btn btn-primary" style={{ padding: '10px 20px' }}>Refresh Data</button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid var(--color-gray-dark)' }}>
            <button 
              onClick={() => setActiveTab('bookings')}
              style={{ 
                padding: '15px 30px', 
                backgroundColor: 'transparent', 
                border: 'none', 
                borderBottom: activeTab === 'bookings' ? '3px solid var(--color-accent)' : '3px solid transparent',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: activeTab === 'bookings' ? 'var(--color-text)' : 'var(--color-text-light)',
                cursor: 'pointer'
              }}
            >
              Bookings ({bookings.length})
            </button>
            <button 
              onClick={() => setActiveTab('contacts')}
              style={{ 
                padding: '15px 30px', 
                backgroundColor: 'transparent', 
                border: 'none', 
                borderBottom: activeTab === 'contacts' ? '3px solid var(--color-accent)' : '3px solid transparent',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: activeTab === 'contacts' ? 'var(--color-text)' : 'var(--color-text-light)',
                cursor: 'pointer'
              }}
            >
              Inquiries ({contacts.length})
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              style={{ 
                padding: '15px 30px', 
                backgroundColor: 'transparent', 
                border: 'none', 
                borderBottom: activeTab === 'reviews' ? '3px solid var(--color-accent)' : '3px solid transparent',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: activeTab === 'reviews' ? 'var(--color-text)' : 'var(--color-text-light)',
                cursor: 'pointer'
              }}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
          ) : (
            <div>
              {activeTab === 'bookings' ? (
                <div style={{ display: 'grid', gap: '20px' }}>
                  {bookings.length === 0 ? <p>No bookings found.</p> : (
                    bookings.map(booking => (
                      <div key={booking._id} style={{ backgroundColor: 'var(--color-primary)', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'center' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                            <User size={18} color="var(--color-accent)" />
                            <strong style={{ fontSize: '1.1rem' }}>{booking.name}</strong>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Phone size={16} color="var(--color-text-light)" />
                            <span style={{ color: 'var(--color-text-light)' }}>{booking.phone}</span>
                          </div>
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                            <Calendar size={18} color="var(--color-accent)" />
                            <strong>{formatDate(booking.date)}</strong>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Users size={16} color="var(--color-text-light)" />
                            <span style={{ color: 'var(--color-text-light)' }}>{booking.guests} Guests • {booking.eventType}</span>
                          </div>
                        </div>

                        <div>
                          <span style={{ 
                            padding: '6px 12px', 
                            borderRadius: '20px', 
                            fontSize: '0.85rem', 
                            fontWeight: '600',
                            backgroundColor: booking.status === 'confirmed' ? '#dcfce7' : booking.status === 'cancelled' ? '#fee2e2' : '#fef9c3',
                            color: booking.status === 'confirmed' ? '#166534' : booking.status === 'cancelled' ? '#991b1b' : '#854d0e',
                            textTransform: 'uppercase'
                          }}>
                            {booking.status}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                          {booking.status !== 'confirmed' && (
                            <button onClick={() => updateBookingStatus(booking._id, 'confirmed')} title="Confirm Booking" style={{ padding: '8px', borderRadius: '8px', border: '1px solid #dcfce7', backgroundColor: '#f0fdf4', color: '#16a34a', cursor: 'pointer' }}>
                              <CheckCircle size={20} />
                            </button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <button onClick={() => updateBookingStatus(booking._id, 'cancelled')} title="Cancel Booking" style={{ padding: '8px', borderRadius: '8px', border: '1px solid #fee2e2', backgroundColor: '#fef2f2', color: '#dc2626', cursor: 'pointer' }}>
                              <XCircle size={20} />
                            </button>
                          )}
                          <button onClick={() => deleteBooking(booking._id)} title="Delete" style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--color-gray-dark)', backgroundColor: 'transparent', color: 'var(--color-text-light)', cursor: 'pointer' }}>
                            <Trash2 size={20} />
                          </button>
                        </div>
                        
                        {booking.message && (
                          <div style={{ gridColumn: '1 / -1', paddingTop: '15px', borderTop: '1px solid var(--color-gray)', color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
                            <strong>Message:</strong> {booking.message}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                  {contacts.length === 0 ? <p>No inquiries found.</p> : (
                    contacts.map(contact => (
                      <div key={contact._id} style={{ backgroundColor: 'var(--color-primary)', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                              <User size={18} color="var(--color-accent)" />
                              <strong style={{ fontSize: '1.1rem' }}>{contact.name}</strong>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Mail size={16} color="var(--color-text-light)" />
                              <span style={{ color: 'var(--color-text-light)' }}>{contact.contactInfo}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '10px' }}>{new Date(contact.createdAt).toLocaleString()}</div>
                            <button onClick={() => deleteContact(contact._id)} style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--color-gray-dark)', backgroundColor: 'transparent', color: '#dc2626', cursor: 'pointer' }}>
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                        <div style={{ padding: '15px', backgroundColor: 'var(--color-gray)', borderRadius: '8px' }}>
                          <div style={{ fontWeight: '600', marginBottom: '5px' }}>{contact.subject || 'General Inquiry'}</div>
                          <div style={{ color: 'var(--color-text)' }}>{contact.message}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                  {reviews.length === 0 ? <p>No reviews found.</p> : (
                    reviews.map(review => (
                      <div key={review._id} style={{ backgroundColor: 'var(--color-primary)', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                              <User size={18} color="var(--color-accent)" />
                              <strong style={{ fontSize: '1.1rem' }}>{review.author_name}</strong>
                              <span style={{ backgroundColor: 'var(--color-gray)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem' }}>{review.rating} Stars</span>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                              {new Date(review.createdAt).toLocaleString()}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span style={{ 
                              padding: '6px 12px', 
                              borderRadius: '20px', 
                              fontSize: '0.85rem', 
                              fontWeight: '600',
                              backgroundColor: review.is_approved ? '#dcfce7' : '#fef9c3',
                              color: review.is_approved ? '#166534' : '#854d0e',
                              textTransform: 'uppercase'
                            }}>
                              {review.is_approved ? 'Approved' : 'Pending'}
                            </span>
                            <button 
                              onClick={() => toggleReviewApproval(review._id, !review.is_approved)} 
                              title={review.is_approved ? "Unapprove" : "Approve"}
                              style={{ padding: '8px', borderRadius: '8px', border: review.is_approved ? '1px solid #fef9c3' : '1px solid #dcfce7', backgroundColor: review.is_approved ? '#fffbeb' : '#f0fdf4', color: review.is_approved ? '#d97706' : '#16a34a', cursor: 'pointer' }}
                            >
                              {review.is_approved ? <XCircle size={20} /> : <CheckCircle size={20} />}
                            </button>
                            <button onClick={() => deleteReview(review._id)} title="Delete" style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--color-gray-dark)', backgroundColor: 'transparent', color: '#dc2626', cursor: 'pointer' }}>
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                        <div style={{ padding: '15px', backgroundColor: 'var(--color-gray)', borderRadius: '8px' }}>
                          <div style={{ color: 'var(--color-text)', fontStyle: 'italic' }}>"{review.text}"</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
