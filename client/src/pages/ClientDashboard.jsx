import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as THREE from 'three';
import NET from 'vanta/src/vanta.net';
import {
  Search,
  Briefcase,
  Star,
  Bell,
  Home,
  Users,
  Shield,
  LogOut,
  ChevronRight,
  History
} from 'lucide-react';

const StatBox = ({ icon: Icon, label, value, color, delay }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'rgba(10,10,10,0.8)',
        border: hover ? `1px solid ${color}44` : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '24px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        animation: `slideUpFade 0.6s ease forwards`,
        animationDelay: delay,
        opacity: 0
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '10px',
          background: `${color}15`, border: `1px solid ${color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon size={22} color={color} />
        </div>
        <div>
          <div style={{ color: '#888888', fontSize: '13px', marginBottom: '4px' }}>{label}</div>
          <div style={{ color: '#ffffff', fontSize: '24px', fontWeight: 700 }}>{value}</div>
        </div>
      </div>
    </div>
  );
};

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('findworkers');
  const [clientUsername, setClientUsername] = useState('');
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const [searchQuery, setSearchQuery] = useState('')
  const [workers, setWorkers] = useState([])
  const [loadingWorkers, setLoadingWorkers] = useState(false)

  // Booking states
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    jobDescription: '',
    preferredDate: '',
    preferredTime: '',
    address: ''
  })
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingError, setBookingError] = useState('')

  const handleBookingSubmit = async () => {
    setBookingLoading(true)
    setBookingError('')
    try {
      const token = localStorage.getItem('clientToken')
      await axios.post(
        'https://gigfolio-production.up.railway.app//api/appointments/book',
        {
          workerUsername: selectedWorker.username,
          ...bookingForm
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setBookingSuccess(true)
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Booking failed. Try again.')
    }
    setBookingLoading(false)
  }



  useEffect(() => {
    if (activeSection === 'findworkers') {
      fetchWorkers('')
    }
  }, [activeSection])

  const fetchWorkers = async (query) => {
    setLoadingWorkers(true)
    try {
      const res = await axios.get(
        `https://gigfolio-production.up.railway.app//api/workers/search?query=${query}`
      )
      setWorkers(res.data)
    } catch (err) {
      console.error('Worker fetch error:', err)
      setWorkers([])
    }
    setLoadingWorkers(false)
  }


  useEffect(() => {
    // Auth Check
    const token = localStorage.getItem('clientToken');
    const role = localStorage.getItem('clientRole');
    const username = localStorage.getItem('clientUsername');

    if (!token || role !== 'client') {
      navigate('/');
      return;
    }
    setClientUsername(username || 'Client');

    // Vanta Effect
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x00b4d8,
          backgroundColor: 0x0a0a0a,
          points: 10.0,
          maxDistance: 20.0,
          spacing: 16.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('clientToken');
    localStorage.removeItem('clientUsername');
    localStorage.removeItem('clientRole');
    navigate('/');
  };

  const navItems = [
    { id: 'findworkers', label: 'Find Workers', icon: Search },
    { id: 'history', label: 'History', icon: History },
    { id: 'home', label: 'Back to Home', icon: Home, action: () => navigate('/') },
  ];

  const historyData = [
    {
      worker: "testuser",
      client: "srij",
      job: "Full House Electrical Rewiring",
      date: "12 March 2024",
      amount: "₹4,500",
      status: "Completed",
      duration: "2 days",
      rating: 5
    },
    {
      worker: "sa",
      client: "Rohit Verma",
      job: "MCB Panel Installation & Upgrade",
      date: "28 February 2024",
      amount: "₹2,800",
      status: "Completed",
      duration: "1 day",
      rating: 5
    },
    {
      worker: "ball",
      client: "Meera Pillai",
      job: "Office Wiring & Socket Fitting",
      date: "15 January 2024",
      amount: "₹6,200",
      status: "Completed",
      duration: "3 days",
      rating: 4
    },
    {
      worker: "sha",
      client: "Aryan Kapoor",
      job: "Inverter & Battery Setup",
      date: "3 January 2024",
      amount: "₹3,100",
      status: "Completed",
      duration: "Half day",
      rating: 5
    },
    {
      worker: "sa",
      client: "Divya Nair",
      job: "Ceiling Fan Installation x4",
      date: "18 December 2023",
      amount: "₹1,800",
      status: "Completed",
      duration: "3 hours",
      rating: 4
    }
  ];

  return (
    <div ref={vantaRef} style={{ minHeight: '100vh', display: 'flex', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: '280px', minWidth: '280px', height: '100vh',
        background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: 100
      }}>
        {/* Logo */}
        <div style={{ padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-1px', color: '#00B4D8' }}>
            Gig<span style={{ color: '#ffffff' }}>Folio</span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={item.action || (() => setActiveSection(item.id))}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', borderRadius: '8px',
                  background: isActive ? 'rgba(0,180,216,0.1)' : 'transparent',
                  border: 'none', borderLeft: isActive ? '3px solid #00B4D8' : '3px solid transparent',
                  color: isActive ? '#00B4D8' : '#888888',
                  fontSize: '15px', fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(0,180,216,0.08)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#888888';
                  }
                }}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Sidebar Bottom */}
        <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #00B4D8, #0077B6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '16px'
            }}>
              {clientUsername[0]?.toUpperCase()}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis' }}>{clientUsername}</div>
              <div style={{ fontSize: '11px', color: '#555', letterSpacing: '0.05em' }}>CLIENT ACCOUNT</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px', borderRadius: '6px', background: 'rgba(255,68,68,0.05)',
              border: '1px solid rgba(255,68,68,0.1)', color: '#ff4444',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,68,68,0.15)';
              e.currentTarget.style.borderColor = 'rgba(255,68,68,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,68,68,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,68,68,0.1)';
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '280px', padding: '40px 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>


          {activeSection === 'welcome' && (
            <>
              {/* Section Heading */}
              <div style={{ marginBottom: '40px', animation: 'slideUpFade 0.6s ease forwards' }}>
                <div style={{ color: '#00B4D8', fontSize: '11px', letterSpacing: '0.3em', fontWeight: 600, marginBottom: '8px' }}>CLIENT PORTAL</div>
                <h1 style={{
                  fontSize: '42px', fontWeight: 800, marginBottom: '8px',
                  background: 'linear-gradient(90deg, #00B4D8, #ffffff)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                  Client Dashboard
                </h1>
                <p style={{ color: '#888888', fontSize: '15px' }}>Find and hire verified gig workers</p>
              </div>

              {/* Welcome Card */}
              <div style={{
                background: 'rgba(0,180,216,0.05)', border: '1px solid rgba(0,180,216,0.15)',
                borderRadius: '16px', padding: '32px', marginBottom: '32px',
                backdropFilter: 'blur(10px)', animation: 'slideUpFade 0.6s ease forwards',
                animationDelay: '0.1s', opacity: 0
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Welcome, {clientUsername} 👋</h2>
                <p style={{ color: '#cccccc', fontSize: '15px', lineHeight: 1.6, maxWidth: '600px' }}>
                  Use the sidebar to find verified workers and manage your jobs. You can post new requirements or check the status of your existing hires.
                </p>
              </div>

              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <StatBox icon={Briefcase} label="Jobs Posted" value="0" color="#00B4D8" delay="0.2s" />
                <StatBox icon={Users} label="Workers Hired" value="0" color="#00ff88" delay="0.3s" />
                <StatBox icon={Star} label="Reviews Given" value="0" color="#FFB800" delay="0.4s" />
                <StatBox icon={Shield} label="Trusted Client" value="PRO" color="#00B4D8" delay="0.5s" />
              </div>
            </>
          )}

          {activeSection === 'findworkers' && (
            <div style={{
              padding: '48px',
              background: 'rgba(5, 5, 5, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.05)',
              marginTop: '20px'
            }}>
              <p style={{ color: '#00B4D8', fontSize: 11, letterSpacing: '0.3em', marginBottom: 8 }}>
                DISCOVER
              </p>
              <h1 style={{
                fontSize: 42, fontWeight: 800,
                background: 'linear-gradient(90deg,#00B4D8,#fff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 8
              }}>
                Find Workers
              </h1>
              <p style={{ color: '#888', fontSize: 15, marginBottom: 32 }}>
                Search verified gig workers in your area
              </p>

              <div style={{ position: 'relative', maxWidth: '600px', marginBottom: '24px' }}>
                <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#555' }} size={20} />
                <input
                  type="text"
                  placeholder="Search by skill, trade or name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    fetchWorkers(e.target.value)
                  }}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12, padding: '16px 20px 16px 50px',
                    color: '#ffffff', fontSize: 16,
                    outline: 'none',
                    display: 'block',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#00B4D8'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <p style={{ color: '#555', fontSize: 13, marginBottom: 20 }}>
                {workers.length} workers found
              </p>

              {loadingWorkers && (
                <p style={{ color: '#888' }}>Loading...</p>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
                {workers.map((worker, i) => (
                  <div key={i} style={{
                    background: 'rgba(10,10,10,0.8)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16, padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.3s ease'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(20,20,20,0.9)';
                      e.currentTarget.style.borderColor = 'rgba(0,180,216,0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(10,10,10,0.8)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{
                        width: 56, height: 56,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg,#00ff88,#7B2FBE)',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 22, fontWeight: 800,
                        color: '#0a0a0a'
                      }}>
                        {worker.username?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>
                          {worker.username}
                        </p>
                        <p style={{ color: '#888', fontSize: 13, margin: '2px 0' }}>
                          {worker.jobTitle || 'Gig Worker'}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[...Array(5)].map((_, starI) => (
                              <Star key={starI} size={10} style={{
                                fill: starI < Math.floor(worker.rating || 0) ? "#FFB800" : "none",
                                color: starI < Math.floor(worker.rating || 0) ? "#FFB800" : "rgba(255,255,255,0.1)"
                              }} />
                            ))}
                          </div>
                          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                            {worker.jobsCompleted || 0} JOBS
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                      <div style={{
                        background: 'rgba(0,255,136,0.08)',
                        border: '1px solid rgba(0,255,136,0.2)',
                        borderRadius: 20, padding: '4px 12px',
                        color: '#00ff88', fontSize: 11,
                        fontWeight: 600, letterSpacing: '0.05em'
                      }}>
                        ✓ VERIFIED
                      </div>
                      <button
                        onClick={() => {
                          setSelectedWorker(worker)
                          setShowBookingModal(true)
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #00B4D8, #0077B6)',
                          border: 'none',
                          color: '#ffffff',
                          borderRadius: '8px',
                          padding: '10px 20px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(0,180,216,0.2)'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(0,180,216,0.3)'
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,180,216,0.2)'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {!loadingWorkers && workers.length === 0 && (
                <p style={{ color: '#555', textAlign: 'center', marginTop: 60, fontSize: 16 }}>
                  No workers found for "{searchQuery}"
                </p>
              )}
            </div>
          )}

          {activeSection === 'history' && (
            <div style={{
              padding: '48px',
              background: 'rgba(5, 5, 5, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.05)',
              marginTop: '20px'
            }}>
              <p style={{ color: '#00B4D8', fontSize: 11, letterSpacing: '0.3em', marginBottom: 8 }}>
                WORK HISTORY
              </p>
              <h1 style={{
                fontSize: 42, fontWeight: 800,
                background: 'linear-gradient(90deg, #00B4D8, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 8
              }}>
                History
              </h1>
              <p style={{ color: '#888888', fontSize: 15, marginBottom: 40 }}>
                All your past job engagements
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
                {historyData.map((item, index) => (
                  <div key={index} style={{
                    background: 'rgba(10,10,10,0.8)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '24px 28px',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.3s ease',
                    animation: `slideUpFade 0.6s ease forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,180,216,0.3)';
                      e.currentTarget.style.transform = 'translateX(6px)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                    {/* CARD TOP ROW */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#00B4D8', fontSize: '13px', fontWeight: 700, marginRight: '14px'
                        }}>
                          #{index + 1}
                        </div>
                        <div>
                          <div style={{ color: '#ffffff', fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>
                            {item.job}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#00ff88', fontSize: '13px', fontWeight: 600 }}>👷 {item.worker}</span>
                            <span style={{ color: '#555555', fontSize: '13px' }}>→</span>
                            <span style={{ color: '#00B4D8', fontSize: '13px', fontWeight: 600 }}>👤 {item.client}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{
                        background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)',
                        borderRadius: '20px', padding: '4px 14px', color: '#00ff88', fontSize: '12px', fontWeight: 600
                      }}>
                        ✓ {item.status}
                      </div>
                    </div>

                    {/* CARD MIDDLE ROW */}
                    <div style={{
                      borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)',
                      padding: '14px 0', margin: '14px 0', display: 'flex', gap: '32px', flexWrap: 'wrap'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Date</span>
                        <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>{item.date}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Duration</span>
                        <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>{item.duration}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Amount</span>
                        <span style={{ color: '#00ff88', fontSize: '14px', fontWeight: 600 }}>{item.amount}</span>
                      </div>
                    </div>

                    {/* CARD BOTTOM ROW */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '3px' }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: i < item.rating ? '#FFB800' : '#333333', fontSize: '14px' }}>★</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88' }}></div>
                        <span style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.05em' }}>Blockchain Verified</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          <style>{`
            @keyframes slideUpFade {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>

        </div>
      </main>
      {/* Booking Modal */}
      {showBookingModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(0,180,216,0.2)',
            borderRadius: '16px', padding: '40px', maxWidth: '500px', width: '90%',
            position: 'relative'
          }}>
            <button
              onClick={() => {
                setShowBookingModal(false)
                setBookingSuccess(false)
              }}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'none', border: 'none', color: '#888',
                fontSize: '20px', cursor: 'pointer'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = '#888'}
            >✕</button>

            {!bookingSuccess ? (
              <>
                <div style={{ color: '#00B4D8', letterSpacing: '0.3em', fontSize: '11px', marginBottom: '8px' }}>BOOK APPOINTMENT</div>
                <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>Book {selectedWorker?.username}</h2>
                <div style={{ color: '#888', fontSize: '13px', marginBottom: '24px' }}>{selectedWorker?.jobTitle || 'Gig Worker'}</div>

                <div style={{
                  display: 'flex', gap: '12px', alignItems: 'center',
                  background: 'rgba(0,180,216,0.04)', border: '1px solid rgba(0,180,216,0.1)',
                  borderRadius: '10px', padding: '12px 16px', marginBottom: '24px'
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00ff88, #7B2FBE)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: '#0a0a0a', fontSize: '14px'
                  }}>
                    {selectedWorker?.username?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{selectedWorker?.username}</div>
                    <div style={{ fontSize: '11px', color: '#666' }}>{selectedWorker?.jobTitle}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ color: '#555', fontSize: '11px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>WHAT DO YOU NEED DONE?</label>
                    <textarea
                      placeholder="Describe the work you need..."
                      value={bookingForm.jobDescription}
                      onChange={e => setBookingForm({ ...bookingForm, jobDescription: e.target.value })}
                      style={{
                        width: '100%', height: '80px', background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                        padding: '12px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'none'
                      }}
                      onFocus={e => e.target.style.borderColor = '#00B4D8'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ color: '#555', fontSize: '11px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>PREFERRED DATE</label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingForm.preferredDate}
                        onChange={e => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                        style={{
                          width: '100%', background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                          padding: '12px', color: '#fff', fontSize: '14px', outline: 'none'
                        }}
                        onFocus={e => e.target.style.borderColor = '#00B4D8'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                    <div>
                      <label style={{ color: '#555', fontSize: '11px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>PREFERRED TIME</label>
                      <input
                        type="time"
                        value={bookingForm.preferredTime}
                        onChange={e => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                        style={{
                          width: '100%', background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                          padding: '12px', color: '#fff', fontSize: '14px', outline: 'none'
                        }}
                        onFocus={e => e.target.style.borderColor = '#00B4D8'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ color: '#555', fontSize: '11px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>YOUR ADDRESS</label>
                    <textarea
                      placeholder="Full address for the job..."
                      value={bookingForm.address}
                      onChange={e => setBookingForm({ ...bookingForm, address: e.target.value })}
                      style={{
                        width: '100%', height: '60px', background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                        padding: '12px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'none'
                      }}
                      onFocus={e => e.target.style.borderColor = '#00B4D8'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  {bookingError && <div style={{ color: '#ff4444', fontSize: '13px' }}>{bookingError}</div>}

                  <button
                    onClick={handleBookingSubmit}
                    disabled={bookingLoading || !bookingForm.jobDescription || !bookingForm.preferredDate || !bookingForm.preferredTime || !bookingForm.address}
                    style={{
                      width: '100%', background: 'linear-gradient(135deg, #00B4D8, #0077B6)',
                      color: '#fff', fontWeight: 700, padding: '14px', borderRadius: '8px',
                      border: 'none', fontSize: '15px', cursor: bookingLoading ? 'not-allowed' : 'pointer',
                      marginTop: '8px', opacity: (bookingLoading || !bookingForm.jobDescription || !bookingForm.preferredDate || !bookingForm.preferredTime || !bookingForm.address) ? 0.6 : 1
                    }}
                  >
                    {bookingLoading ? 'Booking appointment...' : 'Confirm Booking'}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '32px', margin: '0 auto'
                }}>✓</div>
                <h2 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 800, marginTop: '16px' }}>Appointment Booked! 🎉</h2>
                <p style={{ color: '#888', fontSize: '14px', marginTop: '8px' }}>{selectedWorker?.username} has been notified</p>

                <div style={{
                  background: 'rgba(0,180,216,0.04)', border: '1px solid rgba(0,180,216,0.1)',
                  borderRadius: '10px', padding: '16px', marginTop: '20px', textAlign: 'left'
                }}>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Date: </span>
                    <span style={{ color: '#fff', fontSize: '13px' }}>{bookingForm.preferredDate}</span>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Time: </span>
                    <span style={{ color: '#fff', fontSize: '13px' }}>{bookingForm.preferredTime}</span>
                  </div>
                  <div>
                    <span style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Address: </span>
                    <span style={{ color: '#fff', fontSize: '13px' }}>{bookingForm.address}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowBookingModal(false)
                    setBookingSuccess(false)
                    setBookingForm({
                      jobDescription: '',
                      preferredDate: '',
                      preferredTime: '',
                      address: ''
                    })
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#888', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer',
                    width: '100%', marginTop: '16px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888'}
                >Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
