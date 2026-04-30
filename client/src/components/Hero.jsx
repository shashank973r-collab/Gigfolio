import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import NET from 'vanta/src/vanta.net';
import { X, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import TrustProtocol from './TrustProtocol';
import ValueProposition from './ValueProposition';

const Hero = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  // Modal State requested by user
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  
  // Client Modal State
  const [showClientModal, setShowClientModal] = useState(false);
  const [isClientSignup, setIsClientSignup] = useState(false);
  
  // Auth State
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('username') || null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Client Auth State
  const [clientLoggedInUser, setClientLoggedInUser] = useState(localStorage.getItem('clientUsername') || null);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  
  // Form State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [clientFormData, setClientFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMsg) setErrorMsg('');
    if (successMsg) setSuccessMsg('');
  };

  const handleClientInputChange = (e) => {
    setClientFormData({
      ...clientFormData,
      [e.target.name]: e.target.value
    });
    if (errorMsg) setErrorMsg('');
    if (successMsg) setSuccessMsg('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedInUser(null);
    setShowDropdown(false);
  };

  const handleClientLogout = () => {
    localStorage.removeItem('clientToken');
    localStorage.removeItem('clientUsername');
    localStorage.removeItem('clientRole');
    setClientLoggedInUser(null);
    setShowClientDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    if (isSignup) {
      if (!formData.fullName || !formData.username || !formData.password || !formData.confirmPassword) {
        setErrorMsg('All fields are required');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match');
        return;
      }

      setLoading(true);
      try {
        await axios.post('http://localhost:5000/api/auth/signup', {
          fullName: formData.fullName,
          username: formData.username,
          password: formData.password
        });
        setSuccessMsg('Account created! Please login.');
        setTimeout(() => {
          setIsSignup(false);
          setSuccessMsg('');
          setFormData({ ...formData, password: '', confirmPassword: '' });
        }, 1500);
      } catch (err) {
        setErrorMsg(err.response?.data?.message || 'Error creating account');
      } finally {
        setLoading(false);
      }
    } else {
      if (!formData.username || !formData.password) {
        setErrorMsg('All fields are required');
        return;
      }

      setLoading(true);
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          username: formData.username,
          password: formData.password
        });
        
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        setLoggedInUser(res.data.username);
        setSuccessMsg('Login successful!');
        
        setTimeout(() => {
          setShowModal(false);
          setSuccessMsg('');
        }, 1000);
      } catch (err) {
        setErrorMsg(err.response?.data?.message || 'Invalid username or password');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    if (isClientSignup) {
      if (!clientFormData.fullName || !clientFormData.username || !clientFormData.password || !clientFormData.confirmPassword) {
        setErrorMsg('All fields are required');
        return;
      }
      if (clientFormData.password !== clientFormData.confirmPassword) {
        setErrorMsg('Passwords do not match');
        return;
      }

      setLoading(true);
      try {
        await axios.post('http://localhost:5000/api/client/signup', {
          fullName: clientFormData.fullName,
          username: clientFormData.username,
          password: clientFormData.password
        });
        setSuccessMsg('Account created! Please login.');
        setTimeout(() => {
          setIsClientSignup(false);
          setSuccessMsg('');
          setClientFormData({ ...clientFormData, password: '', confirmPassword: '' });
        }, 1500);
      } catch (err) {
        setErrorMsg(err.response?.data?.message || 'Error creating client account');
      } finally {
        setLoading(false);
      }
    } else {
      if (!clientFormData.username || !clientFormData.password) {
        setErrorMsg('All fields are required');
        return;
      }

      setLoading(true);
      try {
        const res = await axios.post('http://localhost:5000/api/client/login', {
          username: clientFormData.username,
          password: clientFormData.password
        });
        
        localStorage.setItem('clientToken', res.data.token);
        localStorage.setItem('clientUsername', res.data.username);
        localStorage.setItem('clientRole', res.data.role);
        setClientLoggedInUser(res.data.username);
        setSuccessMsg('Client Login successful!');
        
        setTimeout(() => {
          setShowClientModal(false);
          setSuccessMsg('');
        }, 1000);
      } catch (err) {
        setErrorMsg(err.response?.data?.message || 'Invalid username or password');
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (!vantaEffect && myRef.current) {
      setVantaEffect(
        NET({
          el: myRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xffffff,
          color2: 0xffffff,
          backgroundColor: 0x0a0a0a,
          points: 12.00,
          maxDistance: 20.00,
          spacing: 16.00,
          showDots: true
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (showModal || showClientModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal, showClientModal]);

  return (
    <>
      {/* Vanta.js Background - FIXED to stay behind all sections */}
      <div 
        ref={myRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />
      
      {/* Dark Overlay - FIXED */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          background: 'rgba(0,0,0,0.5)',
          pointerEvents: 'none'
        }}
      />
      


      <div className="relative w-full overflow-hidden">
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 lg:px-24 pointer-events-auto">
          
          {/* Navbar */}
          <nav className="flex justify-between items-center py-6 animate-fade-in relative z-20">
            <div className="text-2xl font-bold tracking-tighter text-white">
              Gig<span className="text-primary">Folio</span>
            </div>
            <div className="flex gap-8 relative">
              {/* Worker Auth Section */}
              {loggedInUser ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.textShadow = '0 0 10px rgba(0,255,136,0.8)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#00ff88',
                      fontWeight: '700',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '15px',
                      letterSpacing: '0.02em'
                    }}
                  >
                    <span style={{ fontSize: '10px', filter: 'drop-shadow(0 0 5px #00ff88)' }}>●</span> Hello, {loggedInUser}
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-4 w-48 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-2 animate-fade-in z-50 backdrop-blur-xl">
                      <Link 
                        to="/dashboard" 
                        onMouseEnter={e => {
                          e.target.style.background = 'rgba(0,255,136,0.05)';
                          e.target.style.color = '#00ff88';
                          e.target.style.paddingLeft = '20px';
                        }}
                        onMouseLeave={e => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#ffffff';
                          e.target.style.paddingLeft = '16px';
                        }}
                        style={{
                          display: 'block',
                          padding: '10px 16px',
                          fontSize: '14px',
                          color: '#ffffff',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        My Dashboard
                      </Link>
                      <button 
                        onClick={handleLogout}
                        onMouseEnter={e => {
                          e.target.style.background = 'rgba(255,68,68,0.05)';
                          e.target.style.paddingLeft = '20px';
                        }}
                        onMouseLeave={e => {
                          e.target.style.background = 'transparent';
                          e.target.style.paddingLeft = '16px';
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          fontSize: '14px',
                          color: '#ff4444',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setShowModal(true)}
                  style={{
                    border: '2px solid #00ff88',
                    color: '#00ff88',
                    background: 'transparent',
                    padding: '10px 24px',
                    borderRadius: '4px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#00ff88';
                    e.currentTarget.style.color = '#0a0a0a';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0,255,136,0.5)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#00ff88';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Worker Login
                </button>
              )}

              {/* Client Auth Section */}
              {clientLoggedInUser ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowClientDropdown(!showClientDropdown)}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.textShadow = '0 0 10px rgba(0,180,216,0.8)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#00B4D8',
                      fontWeight: '700',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '15px',
                      letterSpacing: '0.02em'
                    }}
                  >
                    <span style={{ fontSize: '10px', filter: 'drop-shadow(0 0 5px #00B4D8)' }}>●</span> Hello, {clientLoggedInUser}
                  </button>
                  {showClientDropdown && (
                    <div className="absolute right-0 mt-4 w-48 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-2 animate-fade-in z-50 backdrop-blur-xl">
                      <Link 
                        to="/client-dashboard" 
                        onMouseEnter={e => {
                          e.target.style.background = 'rgba(0,180,216,0.05)';
                          e.target.style.color = '#00B4D8';
                          e.target.style.paddingLeft = '20px';
                        }}
                        onMouseLeave={e => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#ffffff';
                          e.target.style.paddingLeft = '16px';
                        }}
                        style={{
                          display: 'block',
                          padding: '10px 16px',
                          fontSize: '14px',
                          color: '#ffffff',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        My Dashboard
                      </Link>
                      <button 
                        onClick={handleClientLogout}
                        onMouseEnter={e => {
                          e.target.style.background = 'rgba(255,68,68,0.05)';
                          e.target.style.paddingLeft = '20px';
                        }}
                        onMouseLeave={e => {
                          e.target.style.background = 'transparent';
                          e.target.style.paddingLeft = '16px';
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          fontSize: '14px',
                          color: '#ff4444',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setShowClientModal(true)}
                  style={{
                    border: '2px solid #00B4D8',
                    color: '#00B4D8',
                    background: 'transparent',
                    padding: '10px 24px',
                    borderRadius: '4px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#00B4D8';
                    e.currentTarget.style.color = '#0a0a0a';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0,180,216,0.5)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#00B4D8';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Client Login
                </button>
              )}
            </div>
          </nav>

          {/* Center Content Area */}
          <div className="flex-1 flex flex-col justify-center items-start text-left max-w-4xl w-full">
            
            <div className="bg-black/60 p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl">
              <div 
                className="text-primary tracking-[0.3em] text-[11px] font-semibold mb-6 animate-slide-up"
                style={{ animationDelay: '0.1s', opacity: 0 }}
              >
                VERIFIED GIG ECONOMY
              </div>
              
              <h1 
                className="text-4xl md:text-[52px] lg:text-[72px] font-extrabold leading-[1.1] mb-6 animate-slide-up"
                style={{ animationDelay: '0.3s', opacity: 0 }}
              >
                <div className="text-white">Hire with Confidence,</div>
                <div className="text-gradient">Work with Pride.</div>
              </h1>

              <p 
                className="text-muted text-lg md:text-xl max-w-[500px] mb-10 animate-slide-up drop-shadow-md"
                style={{ animationDelay: '0.5s', opacity: 0 }}
              >
                Background-verified portfolios for electricians, plumbers, carpenters and tutors. Powered by blockchain.
              </p>


              <div 
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 text-sm text-white font-semibold"
              >
                <div className="animate-fade-in" style={{ animationDelay: '0.9s', opacity: 0 }}>
                  2,400+ Verified Workers
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/30 animate-fade-in" style={{ animationDelay: '1.0s', opacity: 0 }}></div>
                <div className="animate-fade-in" style={{ animationDelay: '1.1s', opacity: 0 }}>
                  98% Client Satisfaction
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/30 animate-fade-in" style={{ animationDelay: '1.2s', opacity: 0 }}></div>
                <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '1.3s', opacity: 0 }}>
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Blockchain Secured
                </div>
              </div>
            </div>
          </div>

          <div className="pb-8 flex justify-center animate-fade-in" style={{ animationDelay: '1.5s', opacity: 0 }}>
            <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent animate-float"></div>
          </div>

        </div>

        <TrustProtocol />
        <ValueProposition />
      </div>

      {/* Worker Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-[10px] animate-fade-in px-6">
          <div 
            className="relative w-full max-w-[420px] bg-white/[0.03] border border-white/10 rounded-xl p-8 sm:p-12 shadow-2xl hover:border-primary/30 transition-colors duration-500 scale-95 animate-[scaleUp_0.3s_ease_forwards]"
            style={{ animation: 'fadeIn 0.3s ease, scaleUp 0.3s ease forwards' }}
          >
            <style>{`
              @keyframes scaleUp {
                from { transform: scale(0.95); }
                to { transform: scale(1); }
              }
            `}</style>
            
            <button 
              onClick={() => {
                setShowModal(false);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="absolute top-6 right-6 text-[#888888] hover:text-white transition-colors duration-300"
            >
              <X size={24} />
            </button>

            <div key={!isSignup ? 'login' : 'signup'} className="animate-slide-up">
              
              <div className="text-primary tracking-[0.3em] text-[11px] font-semibold mb-2 uppercase">
                Worker Portal
              </div>
              
              <h2 className="text-[28px] font-bold text-white mb-2">
                {!isSignup ? 'Welcome Back' : 'Create Account'}
              </h2>
              
              <p className="text-[#888888] text-sm mb-8">
                {!isSignup ? 'Sign in to your GigFolio account' : 'Join GigFolio as a verified worker'}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {isSignup && (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-md py-[14px] px-4 text-white placeholder-[#555555] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all duration-300"
                  />
                )}

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-md py-[14px] px-4 text-white placeholder-[#555555] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all duration-300"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-md py-[14px] pl-4 pr-12 text-white placeholder-[#555555] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {isSignup && (
                  <div className="flex flex-col">
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-md py-[14px] pl-4 pr-12 text-white placeholder-[#555555] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errorMsg === 'Passwords do not match' && (
                      <div className="text-[#ff4444] text-[13px] mt-2 animate-fade-in">
                        Passwords do not match
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-primary text-background font-bold py-[14px] rounded-md transition-all duration-300 mt-2 ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]'
                  }`}
                >
                  {loading ? (!isSignup ? 'Signing in...' : 'Creating account...') : (!isSignup ? 'Login' : 'Create Account')}
                </button>
                
                {/* General error message for validaton errors other than password match, and server errors */}
                {errorMsg && errorMsg !== 'Passwords do not match' && (
                  <div className="text-[#ff4444] text-[13px] mt-2 animate-fade-in text-center">
                    {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="text-[#00ff88] text-[13px] mt-2 animate-fade-in text-center">
                    {successMsg}
                  </div>
                )}
              </form>

              <div className="mt-6 text-center">
                <span className="text-[#888888] text-sm">
                  {!isSignup ? "New user? " : "Already have an account? "}
                </span>
                <button 
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  {!isSignup ? "Sign Up" : "Login"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Client Modal Overlay */}
      {showClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-[10px] animate-fade-in px-6">
          <div 
            className="relative w-full max-w-[420px] bg-white/[0.03] border border-white/10 rounded-xl p-8 sm:p-12 shadow-2xl hover:border-[#00B4D8]/30 transition-colors duration-500 scale-95 animate-[scaleUp_0.3s_ease_forwards]"
            style={{ animation: 'fadeIn 0.3s ease, scaleUp 0.3s ease forwards' }}
          >
            <button 
              onClick={() => {
                setShowClientModal(false);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="absolute top-6 right-6 text-[#888888] hover:text-white transition-colors duration-300"
            >
              <X size={24} />
            </button>

            <div key={!isClientSignup ? 'client-login' : 'client-signup'} className="animate-slide-up">
              
              <div style={{ color: '#00B4D8', letterSpacing: '0.3em', fontSize: '11px', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>
                Client Portal
              </div>
              
              <h2 className="text-[28px] font-bold text-white mb-2">
                {!isClientSignup ? 'Welcome Back' : 'Create Client Account'}
              </h2>
              
              <p className="text-[#888888] text-sm mb-8">
                {!isClientSignup ? 'Sign in to find verified workers' : 'Join GigFolio to hire verified workers'}
              </p>

              <form onSubmit={handleClientSubmit} className="flex flex-col gap-4">
                
                {isClientSignup && (
                  <input
                    type="text"
                    name="fullName"
                    value={clientFormData.fullName}
                    onChange={handleClientInputChange}
                    placeholder="Full Name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-md py-[14px] px-4 text-white placeholder-[#555555] focus:outline-none focus:border-[#00B4D8] focus:ring-[3px] focus:ring-[#00B4D8]/10 transition-all duration-300"
                  />
                )}

                <input
                  type="text"
                  name="username"
                  value={clientFormData.username}
                  onChange={handleClientInputChange}
                  placeholder="Username"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-md py-[14px] px-4 text-white placeholder-[#555555] focus:outline-none focus:border-[#00B4D8] focus:ring-[3px] focus:ring-[#00B4D8]/10 transition-all duration-300"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={clientFormData.password}
                    onChange={handleClientInputChange}
                    placeholder="Password"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-md py-[14px] pl-4 pr-12 text-white placeholder-[#555555] focus:outline-none focus:border-[#00B4D8] focus:ring-[3px] focus:ring-[#00B4D8]/10 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {isClientSignup && (
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={clientFormData.confirmPassword}
                      onChange={handleClientInputChange}
                      placeholder="Confirm Password"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-md py-[14px] pl-4 pr-12 text-white placeholder-[#555555] focus:outline-none focus:border-[#00B4D8] focus:ring-[3px] focus:ring-[#00B4D8]/10 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: '#00B4D8',
                    color: '#0a0a0a',
                    fontWeight: '700',
                    padding: '14px',
                    borderRadius: '6px',
                    border: 'none',
                    marginTop: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.7 : 1
                  }}
                  onMouseEnter={e => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(0,180,216,0.4)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {loading ? (!isClientSignup ? 'Signing in...' : 'Creating account...') : (!isClientSignup ? 'Login' : 'Create Account')}
                </button>
                
                {errorMsg && (
                  <div className="text-[#ff4444] text-[13px] mt-2 animate-fade-in text-center">
                    {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div style={{ color: '#00B4D8', fontSize: '13px', marginTop: '8px', textAlign: 'center' }} className="animate-fade-in">
                    {successMsg}
                  </div>
                )}
              </form>

              <div className="mt-6 text-center">
                <span className="text-[#888888] text-sm">
                  {!isClientSignup ? "New client? " : "Already have an account? "}
                </span>
                <button 
                  onClick={() => {
                    setIsClientSignup(!isClientSignup);
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  style={{ color: '#00B4D8', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                  className="text-sm hover:underline"
                >
                  {!isClientSignup ? "Sign Up" : "Login"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
