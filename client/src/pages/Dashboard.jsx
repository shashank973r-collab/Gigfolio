import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import * as THREE from 'three';
import NET from 'vanta/src/vanta.net';
import { 
  User, 
  Star, 
  Plus, 
  Award, 
  Home,
  Phone,
  MapPin,
  Share2,
  Info,
  QrCode,
  Shield,
  CreditCard,
  FileText,
  Bell
} from 'lucide-react';
import anti1 from '../assets/anti1.jpg';
import anti2 from '../assets/anti2.jpg';
import anti3 from '../assets/anti3.jpg';
import TrustOrb from '../components/TrustOrb';
import GigGraph from '../components/GigGraph';

const ProfileCard = ({ children, delay }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'rgba(10,10,10,0.8)',
        border: hover ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '32px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        animation: `slideUpFade 0.6s ease forwards`,
        animationDelay: delay,
        opacity: 0
      }}
    >
      {children}
    </div>
  );
};

const ReviewCard = ({ children, delay }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'rgba(10,10,10,0.8)',
        border: hover ? '1px solid rgba(0,255,136,0.25)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '28px 32px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
        transform: hover ? 'translateX(6px)' : 'translateX(0)',
        boxShadow: hover ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
        animation: `slideUpFade 0.6s ease forwards`,
        animationDelay: delay,
        opacity: 0
      }}
    >
      {children}
    </div>
  );
};

const GalleryCard = ({ image, title, subtitle, delay }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        border: hover ? '1px solid rgba(0,255,136,0.4)' : '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        transform: hover ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hover ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
        animation: `slideUpFade 0.6s ease forwards`,
        animationDelay: delay,
        opacity: 0
      }}
    >
      <img src={image} alt={title} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', transition: 'all 0.3s ease' }} />
      
      <div style={{
        position: 'absolute',
        top: '12px', right: '12px',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        borderRadius: '20px', padding: '4px 10px',
        fontSize: '11px', color: '#00ff88'
      }}>
        ✓ Verified
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
        padding: '20px 16px 16px',
        transform: hover ? 'translateY(0)' : 'translateY(10px)',
        opacity: hover ? 1 : 0,
        transition: 'all 0.3s ease'
      }}>
        <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600 }}>{title}</div>
        <div style={{ color: '#00ff88', fontSize: '12px', marginTop: '4px' }}>{subtitle}</div>
      </div>
    </div>
  );
};

const CertificateCard = ({ image }) => {
  const [hover, setHover] = useState(false);
  const [btn1Hover, setBtn1Hover] = useState(false);
  const [btn2Hover, setBtn2Hover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', gap: '24px', alignItems: 'flex-start',
        background: 'rgba(10,10,10,0.8)',
        border: hover ? '1px solid rgba(123,47,190,0.4)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', padding: '24px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover ? '0 8px 32px rgba(123,47,190,0.15)' : 'none',
        animation: `slideUpFade 0.6s ease forwards`,
        animationDelay: '0.3s',
        opacity: 0
      }}
    >
      <div style={{
        width: '160px', minWidth: '160px', height: '120px',
        borderRadius: '8px', overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <img src={image} alt="Certificate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ color: '#7B2FBE', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '6px' }}>CERTIFICATION</div>
            <div style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Licensed Electrical Contractor — Grade A</div>
            <div style={{ color: '#888888', fontSize: '13px' }}>Karnataka State Electrical Board</div>
          </div>
          <div style={{
            background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)',
            borderRadius: '20px', padding: '6px 14px', color: '#00ff88', fontSize: '12px', fontWeight: 600
          }}>
            ✓ Verified
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '16px 0' }} />

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Issue Date</div>
            <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>15 June 2022</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Valid Until</div>
            <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>15 June 2027</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Certificate ID</div>
            <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>KSB-2022-4471</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Blockchain Hash</div>
            <div style={{ color: '#00ff88', fontSize: '11px', fontFamily: 'monospace' }}>0x7f3a...9d2c</div>
          </div>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
          <button
            onMouseEnter={() => setBtn1Hover(true)}
            onMouseLeave={() => setBtn1Hover(false)}
            style={{
              background: btn1Hover ? 'rgba(123,47,190,0.25)' : 'rgba(123,47,190,0.15)',
              border: '1px solid rgba(123,47,190,0.3)',
              color: '#7B2FBE', borderRadius: '6px',
              padding: '10px 20px', fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.3s ease'
            }}
          >
            View Full Certificate
          </button>
          <button
            onMouseEnter={() => setBtn2Hover(true)}
            onMouseLeave={() => setBtn2Hover(false)}
            style={{
              background: btn2Hover ? 'rgba(0,255,136,0.15)' : 'rgba(0,255,136,0.08)',
              border: '1px solid rgba(0,255,136,0.2)',
              color: '#00ff88', borderRadius: '6px',
              padding: '10px 20px', fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.3s ease'
            }}
          >
            Verify on Blockchain
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactPhoneCard = ({ delay }) => {
  const [cardHover, setCardHover] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("+91 98765 43210");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      style={{
        background: 'rgba(10,10,10,0.8)',
        border: cardHover ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '28px 32px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        transform: cardHover ? 'translateX(6px)' : 'translateX(0)',
        boxShadow: cardHover ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        animation: `slideUpFade 0.6s ease forwards`,
        animationDelay: delay,
        opacity: 0
      }}
    >
      <div style={{
        width: '52px', height: '52px', borderRadius: '12px',
        background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Phone size={22} color="#0a0a0a" />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '6px' }}>PHONE NUMBER</div>
        <div style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>+91 98765 43210</div>
        <div style={{ color: '#888888', fontSize: '13px' }}>Available Mon-Sat, 8AM to 8PM</div>
      </div>

      <button
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        onClick={handleCopy}
        style={{
          background: btnHover ? 'rgba(0,255,136,0.15)' : 'rgba(0,255,136,0.08)',
          border: '1px solid rgba(0,255,136,0.15)',
          borderRadius: '8px', padding: '8px 16px',
          color: copied ? '#ffffff' : '#00ff88',
          fontSize: '12px', fontWeight: 600, cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        {copied ? 'Copied ✓' : 'Copy'}
      </button>
    </div>
  );
};

const ContactAddressCard = ({ delay }) => {
  const [cardHover, setCardHover] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const handleMap = () => {
    window.open('https://www.google.com/maps/search/Koramangala+Bengaluru', '_blank');
  };

  return (
    <div
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      style={{
        background: 'rgba(10,10,10,0.8)',
        border: cardHover ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '28px 32px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        transform: cardHover ? 'translateX(6px)' : 'translateX(0)',
        boxShadow: cardHover ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        animation: `slideUpFade 0.6s ease forwards`,
        animationDelay: delay,
        opacity: 0
      }}
    >
      <div style={{
        width: '52px', height: '52px', borderRadius: '12px',
        background: 'linear-gradient(135deg, #7B2FBE, #9B4FDE)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <MapPin size={22} color="#ffffff" />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '6px' }}>SERVICE AREA</div>
        <div style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>Koramangala, Bengaluru</div>
        <div style={{ color: '#888888', fontSize: '13px', lineHeight: 1.5 }}>
          Serving HSR Layout, Indiranagar,<br/>
          Whitefield & surrounding areas
        </div>
      </div>

      <button
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        onClick={handleMap}
        style={{
          background: btnHover ? 'rgba(123,47,190,0.15)' : 'rgba(123,47,190,0.08)',
          border: '1px solid rgba(123,47,190,0.3)',
          borderRadius: '8px', padding: '8px 16px',
          color: '#7B2FBE',
          fontSize: '12px', fontWeight: 600, cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        View Map
      </button>
    </div>
  );
};

const ContactProfileCard = ({ delay, username }) => {
  const [cardHover, setCardHover] = useState(false);
  const [btn1Hover, setBtn1Hover] = useState(false);
  const [btn2Hover, setBtn2Hover] = useState(false);
  const [copied, setCopied] = useState(false);

  const profileUrl = `trustwork.app/worker/${username || 'worker'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVisit = () => {
    window.open(`https://${profileUrl}`, '_blank');
  };

  return (
    <div
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      style={{
        background: 'rgba(10,10,10,0.8)',
        border: cardHover ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '28px 32px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        transform: cardHover ? 'translateX(6px)' : 'translateX(0)',
        boxShadow: cardHover ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        animation: `slideUpFade 0.6s ease forwards`,
        animationDelay: delay,
        opacity: 0
      }}
    >
      <div style={{
        width: '52px', height: '52px', borderRadius: '12px',
        background: 'linear-gradient(135deg, #00B4D8, #0077B6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Share2 size={22} color="#ffffff" />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '6px' }}>PUBLIC PROFILE</div>
        <div style={{ color: '#00ff88', fontSize: '18px', fontWeight: 700, marginBottom: '4px', fontFamily: 'monospace' }}>
          {profileUrl}
        </div>
        <div style={{ color: '#888888', fontSize: '13px' }}>
          Share this link with clients<br/>
          to showcase your verified portfolio
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onMouseEnter={() => setBtn1Hover(true)}
          onMouseLeave={() => setBtn1Hover(false)}
          onClick={handleCopy}
          style={{
            background: btn1Hover ? 'rgba(0,180,216,0.15)' : 'rgba(0,180,216,0.08)',
            border: '1px solid rgba(0,180,216,0.3)',
            borderRadius: '8px', padding: '8px 16px',
            color: copied ? '#ffffff' : '#00B4D8',
            fontSize: '12px', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {copied ? 'Copied ✓' : 'Copy Link'}
        </button>
        <button
          onMouseEnter={() => setBtn2Hover(true)}
          onMouseLeave={() => setBtn2Hover(false)}
          onClick={handleVisit}
          style={{
            background: btn2Hover ? 'rgba(0,180,216,0.25)' : 'rgba(0,180,216,0.15)',
            border: '1px solid rgba(0,180,216,0.4)',
            borderRadius: '8px', padding: '8px 16px',
            color: '#ffffff',
            fontSize: '12px', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Visit Profile
        </button>
      </div>
    </div>
  );
};

const getBadge = (jobs) => {
  if (jobs >= 300) return { 
    label: 'PLATINUM', 
    color: '#E5E4E2', 
    glow: 'rgba(229,228,226,0.4)',
    bg: 'rgba(229,228,226,0.08)',
    border: 'rgba(229,228,226,0.3)',
    emoji: '💎'
  }
  if (jobs >= 151) return { 
    label: 'GOLD', 
    color: '#FFD700', 
    glow: 'rgba(255,215,0,0.4)',
    bg: 'rgba(255,215,0,0.08)',
    border: 'rgba(255,215,0,0.3)',
    emoji: '🥇'
  }
  if (jobs >= 101) return { 
    label: 'SILVER', 
    color: '#C0C0C0', 
    glow: 'rgba(192,192,192,0.4)',
    bg: 'rgba(192,192,192,0.08)',
    border: 'rgba(192,192,192,0.3)',
    emoji: '🥈'
  }
  if (jobs >= 50) return { 
    label: 'BRONZE', 
    color: '#CD7F32', 
    glow: 'rgba(205,127,50,0.4)',
    bg: 'rgba(205,127,50,0.08)',
    border: 'rgba(205,127,50,0.3)',
    emoji: '🥉'
  }
  return null
}

const MilestoneCard = ({ badge, activeSection, jobs, username }) => {
  const [hover, setHover] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (activeSection === 'profile') {
      setTimeout(() => setProgressWidth(Math.min((jobs / 300) * 100, 100)), 100);
    } else {
      setProgressWidth(0);
    }
  }, [activeSection, jobs]);

  const getTierStatus = (min, max) => {
    if (jobs > max) return 'achieved';
    if (jobs >= min && jobs <= max) return 'current';
    return 'locked';
  };

  const bronze = getTierStatus(50, 100);
  const silver = getTierStatus(101, 150);
  const gold = getTierStatus(151, 200);
  const plat = getTierStatus(300, 9999);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        gridColumn: 'span 2',
        background: 'rgba(10,10,10,0.8)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '32px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        borderColor: hover ? 'rgba(192,192,192,0.3)' : 'rgba(255,255,255,0.08)',
        animation: `slideUpFade 0.6s ease forwards`,
        animationDelay: '0.5s',
        opacity: 0
      }}
    >
      {/* CARD TOP */}
      <div style={{ color: '#00ff88', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '16px' }}>
        SKILL MILESTONES
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
        <div style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700 }}>
          Your Progress Journey
        </div>
        {badge && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: badge.bg, border: `1px solid ${badge.border}`,
            borderRadius: '20px', padding: '8px 20px',
            boxShadow: `0 0 12px ${badge.glow}`
          }}>
            <span style={{ fontSize: '14px' }}>{badge.emoji}</span>
            <span style={{ color: badge.color, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em' }}>
              {username || 'Worker'} is {badge.label}
            </span>
          </div>
        )}
      </div>

      {/* PROGRESS BAR SECTION */}
      <div style={{ marginTop: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ color: '#888888', fontSize: '13px' }}>{jobs} / 300 jobs to Platinum</div>
          <div style={{ color: '#00ff88', fontSize: '13px', fontWeight: 600 }}>{Math.round(Math.min((jobs / 300) * 100, 100))}% Complete</div>
        </div>
        <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
          <div style={{
            width: `${progressWidth}%`, height: '100%', borderRadius: '999px',
            background: 'linear-gradient(90deg, #CD7F32, #C0C0C0, #FFD700)',
            boxShadow: '0 0 12px rgba(192,192,192,0.3)',
            transition: 'width 1.5s ease'
          }} />
        </div>
      </div>

      {/* MILESTONE STEPS ROW */}
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {/* Tier 1: Bronze */}
        <div style={{
          padding: '20px', borderRadius: '10px', textAlign: 'center', transition: 'all 0.3s ease',
          background: bronze === 'current' ? 'rgba(205,127,50,0.1)' : 'rgba(205,127,50,0.06)', 
          border: bronze === 'current' ? '2px solid #CD7F32' : '1px solid rgba(205,127,50,0.2)',
          opacity: bronze === 'locked' ? 0.5 : 1
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🥉</div>
          <div style={{ color: '#CD7F32', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>BRONZE</div>
          <div style={{ color: '#888888', fontSize: '11px' }}>50 — 100 jobs</div>
          <div style={{ color: bronze === 'achieved' ? '#00ff88' : bronze === 'current' ? '#CD7F32' : '#555555', fontSize: '11px', marginTop: '8px', fontWeight: 600 }}>
            {bronze === 'achieved' ? '✓ Achieved' : bronze === 'current' ? '⚡ Current Tier' : `🔒 ${50 - jobs > 0 ? 50 - jobs : 0} jobs away`}
          </div>
          {bronze === 'current' && (
            <>
              <div style={{ color: '#888888', fontSize: '11px', marginTop: '12px', marginBottom: '4px' }}>{jobs} / 100 jobs</div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${(jobs/100)*100}%`, height: '100%', background: '#CD7F32', borderRadius: '999px' }} />
              </div>
            </>
          )}
        </div>

        {/* Tier 2: Silver */}
        <div style={{
          padding: '20px', borderRadius: '10px', textAlign: 'center', transition: 'all 0.3s ease',
          background: silver === 'current' ? 'rgba(192,192,192,0.1)' : 'rgba(192,192,192,0.04)', 
          border: silver === 'current' ? '2px solid #C0C0C0' : '1px solid rgba(192,192,192,0.2)',
          opacity: silver === 'locked' ? 0.5 : 1
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🥈</div>
          <div style={{ color: '#C0C0C0', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>SILVER</div>
          <div style={{ color: '#888888', fontSize: '11px' }}>101 — 150 jobs</div>
          <div style={{ color: silver === 'achieved' ? '#00ff88' : silver === 'current' ? '#C0C0C0' : '#555555', fontSize: '11px', marginTop: '8px', fontWeight: 600 }}>
            {silver === 'achieved' ? '✓ Achieved' : silver === 'current' ? '⚡ Current Tier' : `🔒 ${101 - jobs > 0 ? 101 - jobs : 0} jobs away`}
          </div>
          {silver === 'current' && (
            <>
              <div style={{ color: '#888888', fontSize: '11px', marginTop: '12px', marginBottom: '4px' }}>{jobs - 100} / 50 jobs</div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${((jobs-100)/50)*100}%`, height: '100%', background: '#C0C0C0', borderRadius: '999px' }} />
              </div>
            </>
          )}
        </div>

        {/* Tier 3: Gold */}
        <div style={{
          padding: '20px', borderRadius: '10px', textAlign: 'center', transition: 'all 0.3s ease',
          background: gold === 'current' ? 'rgba(255,215,0,0.1)' : 'rgba(255,215,0,0.04)', 
          border: gold === 'current' ? '2px solid #FFD700' : '1px solid rgba(255,215,0,0.2)',
          opacity: gold === 'locked' ? 0.5 : 1
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🥇</div>
          <div style={{ color: '#FFD700', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>GOLD</div>
          <div style={{ color: '#888888', fontSize: '11px' }}>151 — 200 jobs</div>
          <div style={{ color: gold === 'achieved' ? '#00ff88' : gold === 'current' ? '#FFD700' : '#555555', fontSize: '11px', marginTop: '8px', fontWeight: 600 }}>
            {gold === 'achieved' ? '✓ Achieved' : gold === 'current' ? '⚡ Current Tier' : `🔒 ${151 - jobs > 0 ? 151 - jobs : 0} jobs away`}
          </div>
          {gold === 'current' && (
            <>
              <div style={{ color: '#888888', fontSize: '11px', marginTop: '12px', marginBottom: '4px' }}>{jobs - 150} / 50 jobs</div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${((jobs-150)/50)*100}%`, height: '100%', background: '#FFD700', borderRadius: '999px' }} />
              </div>
            </>
          )}
        </div>

        {/* Tier 4: Platinum */}
        <div style={{
          padding: '20px', borderRadius: '10px', textAlign: 'center', transition: 'all 0.3s ease',
          background: plat === 'current' ? 'rgba(229,228,226,0.1)' : 'rgba(229,228,226,0.04)', 
          border: plat === 'current' ? '2px solid #E5E4E2' : '1px solid rgba(229,228,226,0.2)',
          opacity: plat === 'locked' ? 0.5 : 1
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>💎</div>
          <div style={{ color: '#E5E4E2', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>PLATINUM</div>
          <div style={{ color: '#888888', fontSize: '11px' }}>300+ jobs</div>
          <div style={{ color: plat === 'achieved' ? '#00ff88' : plat === 'current' ? '#E5E4E2' : '#555555', fontSize: '11px', marginTop: '8px', fontWeight: 600 }}>
            {plat === 'achieved' ? '✓ Achieved' : plat === 'current' ? '⚡ Max Tier' : `🔒 ${300 - jobs > 0 ? 300 - jobs : 0} jobs away`}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  
  const [activeSection, setActiveSection] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [logoutHovered, setLogoutHovered] = useState(false);
  
  const [jobTitle, setJobTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [jobDate, setJobDate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [generatingJob, setGeneratingJob] = useState(false);
  const [generatedJob, setGeneratedJob] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Notification states
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const res = await axios.get(
        'http://localhost:5000/api/appointments/notifications',
        { headers: { Authorization: `Bearer ${token}` }}
      )
      const data = res.data || []
      setNotifications(data)
      setUnreadCount(data.filter(n => !n.read).length)
    } catch (err) {
      console.error('Fetch notifications error:', err)
      setNotifications([])
      setUnreadCount(0)
    }
  }

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])


  const [verifyData, setVerifyData] = useState(null);
  const [aadhaarNum, setAadhaarNum] = useState('');
  const [fullName, setFullName] = useState('');
  const [licenseNum, setLicenseNum] = useState('');
  const [policeRef, setPoliceRef] = useState('');
  const [loadingAadhaar, setLoadingAadhaar] = useState(false);
  const [loadingLicense, setLoadingLicense] = useState(false);
  const [loadingPolice, setLoadingPolice] = useState(false);
  const [aadhaarMsg, setAadhaarMsg] = useState('');
  const [licenseMsg, setLicenseMsg] = useState('');
  const [policeMsg, setPoliceMsg] = useState('');

  const [reviewsList, setReviewsList] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [reviewStats, setReviewStats] = useState({
    average: 0,
    total: 0,
    distribution: [
      { label: '5★', width: '0%', count: 0 },
      { label: '4★', width: '0%', count: 0 },
      { label: '3★', width: '0%', count: 0 },
      { label: '2★', width: '0%', count: 0 },
      { label: '1★', width: '0%', count: 0 }
    ]
  });

  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://10.11.242.44:5000/api/jobs/myjobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAllJobs(res.data);
      const jobsWithReviews = res.data.filter(job => job.tokenUsed && job.review);
      
      let totalRating = 0;
      let counts = [0, 0, 0, 0, 0];
      
      const mappedReviews = jobsWithReviews.map(job => {
        const rating = job.review.rating || 0;
        totalRating += rating;
        if(rating >= 1 && rating <= 5) counts[rating - 1]++;
        
        return {
          id: job._id,
          name: job.review.reviewerName,
          location: "Verified Client",
          rating: rating,
          date: new Date(job.review.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
          job: job.jobTitle,
          review: job.review.comment,
          avatar: job.review.reviewerName.charAt(0).toUpperCase(),
          hash: job.review.blockchainHash
        };
      });
      
      setReviewsList(mappedReviews);
      
      const total = mappedReviews.length;
      const average = total > 0 ? (totalRating / total).toFixed(1) : 0;
      
      setReviewStats({
        average,
        total,
        distribution: [
          { label: '5★', width: total > 0 ? `${(counts[4]/total)*100}%` : '0%' },
          { label: '4★', width: total > 0 ? `${(counts[3]/total)*100}%` : '0%' },
          { label: '3★', width: total > 0 ? `${(counts[2]/total)*100}%` : '0%' },
          { label: '2★', width: total > 0 ? `${(counts[1]/total)*100}%` : '0%' },
          { label: '1★', width: total > 0 ? `${(counts[0]/total)*100}%` : '0%' }
        ]
      });
      
    } catch (err) {
      console.error('Error fetching jobs for reviews', err);
    }
  };

  useEffect(() => {
    if (activeSection === 'reviews' || activeSection === 'profile') {
      fetchMyJobs();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === 'verification' || activeSection === 'profile') {
      const fetchVerificationStatus = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get('http://10.11.242.44:5000/api/verify/status', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setVerifyData(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchVerificationStatus();
    }
  }, [activeSection]);

  const handleVerifyAadhaar = async () => {
    setLoadingAadhaar(true);
    setAadhaarMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://10.11.242.44:5000/api/verify/aadhaar', 
        { aadhaarNumber: aadhaarNum, fullName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVerifyData(res.data);
      setAadhaarMsg('Aadhaar verification successful');
    } catch (err) {
      setAadhaarMsg(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoadingAadhaar(false);
    }
  };

  const handleVerifyLicense = async () => {
    setLoadingLicense(true);
    setLicenseMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://10.11.242.44:5000/api/verify/license', 
        { licenseNumber: licenseNum },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVerifyData(res.data);
      setLicenseMsg('Driving License verified');
    } catch (err) {
      setLicenseMsg(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoadingLicense(false);
    }
  };

  const handleVerifyPolice = async () => {
    setLoadingPolice(true);
    setPoliceMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://10.11.242.44:5000/api/verify/police', 
        { reportNumber: policeRef || 'AUTO' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVerifyData(res.data);
      setPoliceMsg('Police record check clear');
    } catch (err) {
      setPoliceMsg(err.response?.data?.message || 'Record flagged');
    } finally {
      setLoadingPolice(false);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setGeneratingJob(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/jobs/create', {
        jobTitle, clientName, jobDate, amount, description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGeneratedJob(res.data);
    } catch (err) {
      alert('Error creating job');
    } finally {
      setGeneratingJob(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://10.11.242.44:5173/review/${generatedJob.reviewToken}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddAnother = () => {
    setJobTitle(''); setClientName(''); setJobDate(''); setAmount(''); setDescription('');
    setGeneratedJob(null);
  };
  
  const username = localStorage.getItem('username');
  
  // Calculate dynamic mock base jobs for this user (99-301)
  let hash = 0;
  if (username) {
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
  }
  const baseJobs = 99 + (Math.abs(hash) % 203);
  const totalJobsCompleted = baseJobs + allJobs.length;
  const badge = getBadge(totalJobsCompleted);
  const thisYearJobs = Math.floor(totalJobsCompleted * 0.2) + allJobs.length;
  const thisMonthJobs = Math.floor(thisYearJobs * 0.3) + (allJobs.length > 0 ? 1 : 0);
  const completionRate = (95 + (Math.abs(hash) % 5) + (allJobs.length > 0 ? 0.2 : 0)).toFixed(1);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x00ff88,
          color2: 0x7b2fbe,
          backgroundColor: 0x0a0a0a,
          points: 9.00,
          maxDistance: 25.00,
          spacing: 20.00,
          showDots: true
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const navItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'addjob', label: 'New Job', icon: Plus },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'contact', label: 'Contact Details', icon: Phone },
    { id: 'certificates', label: 'Certificates & Gallery', icon: Award },
    { id: 'verification', label: 'ID Verification', icon: Shield },
    { id: 'home', label: 'Back to Home', icon: Home },
  ];





  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#0a0a0a',
      position: 'relative'
    }}>
      
      {/* Vanta background */}
      <div 
        ref={vantaRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }} 
      />
      
      {/* Dark overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          background: 'rgba(0,0,0,0.75)',
          pointerEvents: 'none'
        }} 
      />

      {/* SIDEBAR */}
      <div style={{
        width: '260px',
        minHeight: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        background: 'rgba(10,10,10,0.9)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 16px'
      }}>
        
        {/* TOP - Logo */}
        <div style={{
          color: '#00ff88',
          fontSize: '22px',
          fontWeight: 800,
          paddingLeft: '12px',
          marginBottom: '40px'
        }}>
          GigFolio
        </div>

        {/* NAV ITEMS */}
        <div style={{ flex: 1 }}>
          {navItems.map((item) => {
            const isHome = item.id === 'home';
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;

            let backgroundColor = 'transparent';
            let color = '#888888';
            let borderLeft = '3px solid transparent';
            let fontWeight = 500;

            if (isHome) {
              if (isHovered) {
                color = '#ffffff';
              }
            } else {
              if (isActive) {
                backgroundColor = 'rgba(0,255,136,0.12)';
                color = '#00ff88';
                borderLeft = '3px solid #00ff88';
                fontWeight = 600;
              } else if (isHovered) {
                backgroundColor = 'rgba(0,255,136,0.08)';
                color = '#ffffff';
              }
            }

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  if (isHome) {
                    navigate('/');
                  } else {
                    setActiveSection(item.id);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '4px',
                  cursor: 'pointer',
                  color: color,
                  fontSize: '14px',
                  fontWeight: fontWeight,
                  transition: 'all 0.3s ease',
                  border: 'none',
                  background: backgroundColor,
                  borderLeft: borderLeft
                }}
              >
                <div style={{ position: 'relative' }}>
                  <item.icon size={20} />
                  {item.id === 'notifications' && unreadCount > 0 && (
                    <div style={{
                      position: 'absolute', top: '-2px', right: '-2px',
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: '#ff4444', border: '2px solid rgba(10,10,10,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '6px', color: '#fff', fontWeight: 800
                    }}></div>
                  )}
                </div>
                {item.label}
                {item.id === 'notifications' && unreadCount > 0 && (
                  <span style={{ 
                    marginLeft: 'auto', background: 'rgba(255,68,68,0.15)', 
                    color: '#ff4444', padding: '2px 8px', borderRadius: '10px', 
                    fontSize: '10px', fontWeight: 700 
                  }}>
                    {unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* SIDEBAR BOTTOM */}
        <div style={{
          marginTop: 'auto',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* Profile avatar */}
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00ff88, #7B2FBE)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0a0a0a',
            fontWeight: 700,
            fontSize: '16px'
          }}>
            {username ? username.charAt(0).toUpperCase() : 'W'}
          </div>

          {/* Username + Logout */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600
            }}>
              {username || 'Worker'}
            </div>
            <button
              onMouseEnter={() => setLogoutHovered(true)}
              onMouseLeave={() => setLogoutHovered(false)}
              onClick={handleLogout}
              style={{
                color: '#ff4444',
                fontSize: '12px',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
                textAlign: 'left',
                textDecoration: logoutHovered ? 'underline' : 'none',
                marginTop: '2px'
              }}
            >
              Logout
            </button>
          </div>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div style={{
        marginLeft: '260px',
        flex: 1,
        position: 'relative',
        zIndex: 2,
        padding: '48px',
        minHeight: '100vh',
        display: (activeSection === 'profile' || activeSection === 'reviews' || activeSection === 'certificates' || activeSection === 'contact' || activeSection === 'addjob' || activeSection === 'verification' || activeSection === 'notifications') ? 'block' : 'flex',
        alignItems: (activeSection === 'profile' || activeSection === 'reviews' || activeSection === 'certificates' || activeSection === 'contact' || activeSection === 'addjob' || activeSection === 'verification' || activeSection === 'notifications') ? 'flex-start' : 'center',
        justifyContent: (activeSection === 'profile' || activeSection === 'reviews' || activeSection === 'certificates' || activeSection === 'contact' || activeSection === 'addjob' || activeSection === 'verification' || activeSection === 'notifications') ? 'flex-start' : 'center'
      }}>
        <style>
        {`
          @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .profile-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            max-width: 900px;
          }
          @media (max-width: 768px) {
            .profile-grid {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
        </style>
        
        {activeSection === 'notifications' && (
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
              <div>
                <div style={{ color: '#00ff88', letterSpacing: '0.3em', fontSize: '11px', marginBottom: '8px' }}>APPOINTMENTS</div>
                <div style={{
                  fontSize: '42px', fontWeight: 800,
                  background: 'linear-gradient(90deg, #ff4444, #ffffff)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  marginBottom: '8px'
                }}>Notifications</div>
                <div style={{ color: '#888', fontSize: '15px' }}>Appointment requests from clients</div>
              </div>
              
              {unreadCount > 0 && (
                <button 
                  onClick={async () => {
                    const token = localStorage.getItem('token')
                    await Promise.all(notifications.filter(n => !n.read).map(n => 
                      axios.put(`http://localhost:5000/api/appointments/read/${n._id}`, {}, {
                        headers: { Authorization: `Bearer ${token}` }
                      })
                    ))
                    fetchNotifications()
                  }}
                  style={{
                    background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.15)',
                    color: '#00ff88', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', cursor: 'pointer'
                  }}
                >Mark all read</button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
              {notifications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>
                  <Bell size={48} color="#333" style={{ marginBottom: '16px' }} />
                  <div style={{ color: '#555', fontSize: '16px' }}>No appointment requests yet</div>
                  <div style={{ color: '#444', fontSize: '13px' }}>When clients book you, they'll appear here</div>
                </div>
              ) : (
                notifications.map((n, i) => (
                  <div key={n._id} style={{
                    background: 'rgba(10,10,10,0.8)',
                    border: n.read ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,255,136,0.2)',
                    borderRadius: '12px', padding: '24px 28px', backdropFilter: 'blur(12px)',
                    transition: 'all 0.3s ease', position: 'relative',
                    animation: `slideUpFade 0.6s ease forwards`,
                    animationDelay: `${i * 0.1}s`, opacity: 0,
                    boxShadow: !n.read ? '0 0 20px rgba(0,255,136,0.05)' : 'none'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,255,136,0.25)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = n.read ? 'rgba(255,255,255,0.08)' : 'rgba(0,255,136,0.2)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}>
                    {!n.read && (
                      <div style={{
                        position: 'absolute', top: '20px', right: '20px',
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: '#00ff88', boxShadow: '0 0 8px rgba(0,255,136,0.5)'
                      }}></div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{
                          width: '44px', height: '44px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, #00B4D8, #0077B6)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '18px', fontWeight: 700, color: '#fff'
                        }}>
                          {n.clientUsername[0].toUpperCase()}
                        </div>
                        <div>
                          <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700, marginBottom: '2px' }}>New Appointment Request</div>
                          <div style={{ color: '#00B4D8', fontSize: '13px' }}>from {n.clientUsername}</div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#555', fontSize: '12px', marginBottom: '8px' }}>
                          {new Date(n.createdAt).toLocaleDateString()} {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                        <div style={{
                          background: n.status === 'pending' ? 'rgba(255,184,0,0.08)' : n.status === 'accepted' ? 'rgba(0,255,136,0.08)' : 'rgba(255,68,68,0.08)',
                          border: n.status === 'pending' ? '1px solid rgba(255,184,0,0.2)' : n.status === 'accepted' ? '1px solid rgba(0,255,136,0.2)' : '1px solid rgba(255,68,68,0.2)',
                          color: n.status === 'pending' ? '#FFB800' : n.status === 'accepted' ? '#00ff88' : '#ff4444',
                          borderRadius: '20px', padding: '4px 14px', fontSize: '12px', fontWeight: 600
                        }}>
                          {n.status === 'pending' ? '⏳ Pending' : n.status === 'accepted' ? '✓ Accepted' : '✗ Rejected'}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px',
                      marginTop: '4px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px'
                    }}>
                      <div>
                        <div style={{ color: '#555', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2px' }}>Job</div>
                        <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>{n.jobDescription.substring(0, 50)}{n.jobDescription.length > 50 ? '...' : ''}</div>
                      </div>
                      <div>
                        <div style={{ color: '#555', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2px' }}>Date</div>
                        <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>{n.preferredDate}</div>
                      </div>
                      <div>
                        <div style={{ color: '#555', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2px' }}>Time</div>
                        <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>{n.preferredTime}</div>
                      </div>
                      <div>
                        <div style={{ color: '#555', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2px' }}>Address</div>
                        <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>{n.address.substring(0, 40)}{n.address.length > 40 ? '...' : ''}</div>
                      </div>
                    </div>

                    {n.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button 
                          onClick={async () => {
                            const token = localStorage.getItem('token')
                            await axios.put(`http://localhost:5000/api/appointments/status/${n._id}`, { status: 'accepted' }, {
                              headers: { Authorization: `Bearer ${token}` }
                            })
                            await axios.put(`http://localhost:5000/api/appointments/read/${n._id}`, {}, {
                              headers: { Authorization: `Bearer ${token}` }
                            })
                            fetchNotifications()
                          }}
                          style={{
                            background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)',
                            color: '#00ff88', borderRadius: '8px', padding: '10px 24px', fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,136,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,255,136,0.1)'}
                        >✓ Accept</button>
                        <button 
                          onClick={async () => {
                            const token = localStorage.getItem('token')
                            await axios.put(`http://localhost:5000/api/appointments/status/${n._id}`, { status: 'rejected' }, {
                              headers: { Authorization: `Bearer ${token}` }
                            })
                            await axios.put(`http://localhost:5000/api/appointments/read/${n._id}`, {}, {
                              headers: { Authorization: `Bearer ${token}` }
                            })
                            fetchNotifications()
                          }}
                          style={{
                            background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.2)',
                            color: '#ff4444', borderRadius: '8px', padding: '10px 24px', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,68,68,0.15)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,68,68,0.08)'}
                        >✗ Decline</button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {activeSection === 'profile' ? (
          <div>
            <div style={{
              color: '#00ff88',
              letterSpacing: '0.3em',
              fontSize: '11px',
              marginBottom: '8px'
            }}>
              MY PROFILE
            </div>
            <div style={{
              fontSize: '42px',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #ff4444, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              My Profile
            </div>
            <div style={{
              color: '#888888',
              fontSize: '15px',
              marginBottom: '40px'
            }}>
              Your professional identity on GigFolio
            </div>

            <div className="profile-grid">
              {/* CARD 1 */}
              <ProfileCard delay="0.1s">
                <div style={{ overflow: 'hidden' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00ff88, #7B2FBE)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', fontWeight: 800, color: '#0a0a0a',
                    float: 'left', marginRight: '16px'
                  }}>
                    {username ? username.charAt(0).toUpperCase() : 'W'}
                  </div>
                  <div style={{ color: '#00ff88', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '4px' }}>
                    WORKER
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                    {username || 'Worker'}
                    {badge && (
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: badge.bg, border: `1px solid ${badge.border}`,
                        borderRadius: '20px', padding: '4px 12px', marginLeft: '12px',
                        boxShadow: `0 0 12px ${badge.glow}`
                      }}>
                        <span style={{ fontSize: '14px' }}>{badge.emoji}</span>
                        <span style={{ color: badge.color, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>{badge.label}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ color: '#888888', fontSize: '13px', marginTop: '4px' }}>
                    Licensed Electrician & Wiring Specialist
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '20px 0' }} />

                <div>
                  <div style={{ color: '#888888', fontSize: '13px', marginBottom: '8px', display: 'flex', gap: '8px' }}>
                    <span>📍</span> Bengaluru, Karnataka
                  </div>
                  <div style={{ color: '#888888', fontSize: '13px', marginBottom: '8px', display: 'flex', gap: '8px' }}>
                    <span>🛠</span> Electrical • Wiring • Panel Installation
                  </div>
                  <div style={{ color: '#888888', fontSize: '13px', marginBottom: '8px', display: 'flex', gap: '8px' }}>
                    <span>📅</span> Member since 2023
                  </div>
                </div>
              </ProfileCard>

              {/* CARD 2 */}
              <ProfileCard delay="0.2s">
                <div style={{ color: '#00ff88', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '16px' }}>
                  CLIENT RATING
                </div>
                <div style={{ fontSize: '64px', fontWeight: 800, color: '#ffffff', lineHeight: 1, marginBottom: '8px' }}>
                  {reviewStats.average}
                </div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < Math.round(reviewStats.average) ? '#FFB800' : '#333333', fontSize: '24px' }}>★</span>
                  ))}
                </div>
                <div style={{ color: '#888888', fontSize: '13px' }}>
                  Based on {reviewStats.total} client reviews
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '20px 0' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {reviewStats.distribution.filter((_, i) => i < 3).map((bar, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#888888', fontSize: '12px', width: '20px' }}>{bar.label}</span>
                      <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '4px', height: '4px' }}>
                        <div style={{ background: '#FFB800', borderRadius: '4px', height: '100%', width: bar.width }} />
                      </div>
                      <span style={{ color: '#888888', fontSize: '12px', width: '30px', textAlign: 'right' }}>{Math.round(parseFloat(bar.width) || 0)}%</span>
                    </div>
                  ))}
                </div>
              </ProfileCard>

              {/* CARD 3 */}
              <ProfileCard delay="0.3s">
                <div style={{ color: '#00ff88', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '16px' }}>
                  WORK HISTORY
                </div>
                <div style={{ fontSize: '64px', fontWeight: 800, color: '#ffffff', lineHeight: 1, marginBottom: '8px' }}>
                  {totalJobsCompleted}
                </div>
                <div style={{ color: '#888888', fontSize: '13px', marginBottom: '24px' }}>
                  Jobs completed successfully
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '20px 0' }} />

                <div style={{ color: '#ffffff', fontSize: '13px', marginBottom: '8px' }}>
                  {thisYearJobs} — This year
                </div>
                <div style={{ color: '#ffffff', fontSize: '13px', marginBottom: '8px' }}>
                  {thisMonthJobs} — This month
                </div>
                <div style={{ color: '#00ff88', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                  {completionRate}% — Completion rate
                </div>
              </ProfileCard>

              {/* CARD 4 */}
              <ProfileCard delay="0.4s">
                <div style={{ color: '#00ff88', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '16px' }}>
                  TRUST ORB
                </div>
                
                <TrustOrb status={verifyData?.overallStatus || 'none'} />
                
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <div style={{
                    color: verifyData?.overallStatus === 'verified' ? '#00ff88' : verifyData?.overallStatus === 'partial' ? '#FFB800' : '#ff4444',
                    fontSize: '20px', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '8px', textTransform: 'uppercase'
                  }}>
                    {verifyData?.overallStatus === 'verified' ? 'FULLY VERIFIED' : verifyData?.overallStatus === 'partial' ? 'PARTIALLY VERIFIED' : 'NOT VERIFIED'}
                  </div>
                  <div style={{ color: '#888888', fontSize: '13px' }}>
                    {verifyData?.overallStatus === 'verified' ? 'Identity verified & blockchain secured' : 'Complete verification to build trust'}
                  </div>
                </div>

                {verifyData?.overallStatus === 'verified' && (
                  <div style={{ marginTop: '24px' }}>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '20px 0' }} />
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ color: '#00ff88' }}>✓</span>
                      <span style={{ color: '#ffffff', fontSize: '13px' }}>Government ID Verified</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ color: '#00ff88' }}>✓</span>
                      <span style={{ color: '#ffffff', fontSize: '13px' }}>Police Verification Clear</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ color: '#00ff88' }}>✓</span>
                      <span style={{ color: '#ffffff', fontSize: '13px' }}>Blockchain Hash Stored</span>
                    </div>
                  </div>
                )}
              </ProfileCard>
              
              <MilestoneCard badge={badge} activeSection={activeSection} jobs={totalJobsCompleted} username={username} />
            </div>

            <div style={{ marginTop: '32px' }}>
              <GigGraph jobs={allJobs} />
            </div>
          </div>
        ) : activeSection === 'reviews' ? (
          <div>
            <div style={{
              color: '#00ff88',
              letterSpacing: '0.3em',
              fontSize: '11px',
              marginBottom: '8px'
            }}>
              CLIENT FEEDBACK
            </div>
            <div style={{
              fontSize: '42px',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #ff4444, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              Reviews
            </div>
            <div style={{
              color: '#888888',
              fontSize: '15px',
              marginBottom: '40px'
            }}>
              What your clients say about your work
            </div>

            {/* OVERALL RATING SUMMARY BAR */}
            <div style={{
              background: 'rgba(10,10,10,0.8)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '24px 32px',
              backdropFilter: 'blur(12px)',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              maxWidth: '900px'
            }}>
              {/* Left side */}
              <div>
                <div style={{ fontSize: '56px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                  {reviewStats.average}
                </div>
                <div style={{ color: '#FFB800', fontSize: '20px', marginTop: '8px' }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < Math.round(reviewStats.average) ? '#FFB800' : '#333333' }}>★</span>
                  ))}
                </div>
                <div style={{ color: '#888888', fontSize: '13px', marginTop: '4px' }}>
                  {reviewStats.total} total reviews
                </div>
              </div>

              {/* Right side (rating bars) */}
              <div style={{ flex: 1 }}>
                {reviewStats.distribution.map((bar, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ color: '#888888', fontSize: '12px', width: '24px' }}>{bar.label}</div>
                    <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>
                      <div style={{ background: '#FFB800', borderRadius: '4px', height: '6px', width: bar.width }} />
                    </div>
                    <div style={{ color: '#888888', fontSize: '12px', width: '32px' }}>{Math.round(parseFloat(bar.width) || 0)}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 REVIEW CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
              {reviewsList.length === 0 && (
                <div style={{ textAlign: 'center', color: '#888888', padding: '40px', background: 'rgba(10,10,10,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  No reviews found yet. Generate a QR code for your completed jobs to collect verified reviews.
                </div>
              )}
              {reviewsList.map((review, index) => (
                <ReviewCard key={review.id} delay={`${0.1 * (index + 1)}s`}>
                  
                  {/* CARD TOP ROW */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    
                    {/* Left side */}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div style={{
                        width: '46px', height: '46px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1a1a2e, #7B2FBE)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px', fontWeight: 700, color: '#ffffff'
                      }}>
                        {review.avatar}
                      </div>
                      <div>
                        <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>
                          {review.name}
                        </div>
                        <div style={{ color: '#888888', fontSize: '12px' }}>
                          {review.location}
                        </div>
                      </div>
                    </div>

                    {/* Right side */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#555555', fontSize: '12px', marginBottom: '6px' }}>
                        {review.date}
                      </div>
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: i < review.rating ? '#FFB800' : '#333333', fontSize: '16px' }}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* JOB TAG */}
                  <div style={{
                    display: 'inline-flex', marginBottom: '12px',
                    background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.15)',
                    borderRadius: '20px', padding: '4px 12px',
                    fontSize: '12px', color: '#00ff88'
                  }}>
                    🔧 {review.job}
                  </div>

                  {/* REVIEW TEXT */}
                  <div style={{ color: '#cccccc', fontSize: '14px', lineHeight: 1.7, fontStyle: 'italic' }}>
                    "{review.review}"
                  </div>

                  {/* BOTTOM ROW */}
                  <div style={{
                    marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span style={{ color: '#00ff88', fontSize: '12px' }}>✓</span>
                      <span style={{ color: '#888888', fontSize: '12px' }}>Verified Client</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#555555', letterSpacing: '0.05em' }}>
                      Blockchain Verified
                    </div>
                  </div>

                </ReviewCard>
              ))}
            </div>
          </div>
        ) : activeSection === 'certificates' ? (
          <div style={{ animation: 'slideUpFade 0.6s ease forwards', opacity: 0 }}>
            <div style={{
              color: '#00ff88',
              letterSpacing: '0.3em',
              fontSize: '11px',
              marginBottom: '8px'
            }}>
              PORTFOLIO & CREDENTIALS
            </div>
            <div style={{
              fontSize: '42px',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #ff4444, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              Certificates & Gallery
            </div>
            <div style={{
              color: '#888888',
              fontSize: '15px',
              marginBottom: '40px'
            }}>
              Your work portfolio and verified credentials
            </div>

            {/* GALLERY SECTION */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700 }}>
                GALLERY
              </div>
              <div style={{
                background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)',
                borderRadius: '20px', padding: '4px 12px', color: '#00ff88', fontSize: '12px'
              }}>
                2 Photos
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '48px', maxWidth: '900px' }}>
              <GalleryCard 
                image={anti1} 
                title="Electrical Panel Installation" 
                subtitle="Completed — March 2024" 
                delay="0.1s" 
              />
              <GalleryCard 
                image={anti2} 
                title="Full House Wiring Project" 
                subtitle="Completed — January 2024" 
                delay="0.2s" 
              />
            </div>

            {/* DIVIDER */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '40px', maxWidth: '900px' }} />

            {/* CERTIFICATES SECTION */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700 }}>
                CERTIFICATES
              </div>
              <div style={{
                background: 'rgba(123,47,190,0.1)', border: '1px solid rgba(123,47,190,0.3)',
                borderRadius: '20px', padding: '4px 12px', color: '#7B2FBE', fontSize: '12px'
              }}>
                1 Certificate
              </div>
            </div>

            <div style={{ maxWidth: '900px' }}>
              <CertificateCard image={anti3} />
            </div>
          </div>
        ) : activeSection === 'contact' ? (
          <div>
            <div style={{
              color: '#00ff88',
              letterSpacing: '0.3em',
              fontSize: '11px',
              marginBottom: '8px'
            }}>
              GET IN TOUCH
            </div>
            <div style={{
              fontSize: '42px',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #ff4444, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              Contact Details
            </div>
            <div style={{
              color: '#888888',
              fontSize: '15px',
              marginBottom: '40px'
            }}>
              How clients can reach you
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px' }}>
              <ContactPhoneCard delay="0.15s" />
              <ContactAddressCard delay="0.30s" />
              <ContactProfileCard delay="0.45s" username={username} />
            </div>

            <div style={{
              marginTop: '24px',
              background: 'rgba(0,255,136,0.04)',
              border: '1px solid rgba(0,255,136,0.1)',
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              maxWidth: '700px'
            }}>
              <Info color="#00ff88" size={20} />
              <div style={{ color: '#888888', fontSize: '13px', lineHeight: 1.6 }}>
                Your contact details are only visible to verified clients who have completed a job with you.
              </div>
            </div>
          </div>
        ) : activeSection === 'addjob' ? (
          <div>
            <div style={{ color: '#00ff88', letterSpacing: '0.3em', fontSize: '11px', marginBottom: '8px' }}>JOB MANAGEMENT</div>
            <div style={{ fontSize: '42px', fontWeight: 800, background: 'linear-gradient(90deg, #ff4444, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>New Job</div>
            <div style={{ color: '#888888', fontSize: '15px', marginBottom: '40px' }}>Add a completed job and generate a verified review QR code</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '1000px' }}>
              {/* LEFT COLUMN - Job Form Card */}
              <div style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', backdropFilter: 'blur(12px)' }}>
                <div style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Job Details</div>
                <form onSubmit={handleCreateJob}>
                  <label style={{ color: '#888888', fontSize: '12px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>JOB TITLE</label>
                  <input type="text" required placeholder="e.g. Full House Rewiring" value={jobTitle} onChange={e => setJobTitle(e.target.value)} style={{ width: '100%', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '14px', outline: 'none', transition: 'all 0.3s ease' }} onFocus={e => { e.currentTarget.style.borderColor = '#00ff88'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,255,136,0.1)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }} />

                  <label style={{ color: '#888888', fontSize: '12px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>CLIENT NAME</label>
                  <input type="text" required placeholder="Name of the client" value={clientName} onChange={e => setClientName(e.target.value)} style={{ width: '100%', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '14px', outline: 'none', transition: 'all 0.3s ease' }} onFocus={e => { e.currentTarget.style.borderColor = '#00ff88'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,255,136,0.1)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }} />

                  <label style={{ color: '#888888', fontSize: '12px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>JOB DATE</label>
                  <input type="date" required value={jobDate} onChange={e => setJobDate(e.target.value)} style={{ width: '100%', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '14px', outline: 'none', transition: 'all 0.3s ease' }} onFocus={e => { e.currentTarget.style.borderColor = '#00ff88'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,255,136,0.1)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }} />

                  <label style={{ color: '#888888', fontSize: '12px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>AMOUNT CHARGED</label>
                  <input type="text" required placeholder="e.g. ₹4,500" value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '14px', outline: 'none', transition: 'all 0.3s ease' }} onFocus={e => { e.currentTarget.style.borderColor = '#00ff88'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,255,136,0.1)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }} />

                  <label style={{ color: '#888888', fontSize: '12px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>JOB DESCRIPTION</label>
                  <textarea required placeholder="Brief description of work done..." value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '14px', outline: 'none', transition: 'all 0.3s ease', height: '80px', resize: 'vertical' }} onFocus={e => { e.currentTarget.style.borderColor = '#00ff88'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,255,136,0.1)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }} />

                  <button type="submit" disabled={generatingJob || generatedJob} style={{ width: '100%', background: '#00ff88', color: '#0a0a0a', fontWeight: 700, fontSize: '15px', padding: '14px', borderRadius: '8px', border: 'none', cursor: (generatingJob || generatedJob) ? 'default' : 'pointer', transition: 'all 0.3s ease', opacity: generatingJob ? 0.7 : 1 }} onMouseEnter={e => { if(!generatingJob && !generatedJob) { e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,136,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }} onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    {generatingJob ? 'Generating QR Code...' : 'Generate QR Code'}
                  </button>
                </form>
              </div>

              {/* RIGHT COLUMN - QR Code Card */}
              <div style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', backdropFilter: 'blur(12px)' }}>
                {!generatedJob ? (
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '200px', height: '200px', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <QrCode size={48} color="#333333" />
                    </div>
                    <div style={{ color: '#555555', fontSize: '13px', textAlign: 'center' }}>Fill in job details to generate QR code</div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#00ff88', fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>QR Code Generated! 🎉</div>
                    <div style={{ color: '#888888', fontSize: '13px', marginBottom: '24px' }}>Share this QR with your client to collect a verified review</div>
                    
                    <div style={{ padding: '20px', background: '#ffffff', borderRadius: '12px', display: 'inline-block', boxShadow: '0 0 40px rgba(0,255,136,0.2)' }}>
                      <QRCodeSVG value={`http://10.11.242.44:5173/review/${generatedJob.reviewToken}`} size={200} bgColor="#ffffff" fgColor="#0a0a0a" level="H" />
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
                      <div style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.15)', borderRadius: '20px', padding: '4px 12px', color: '#00ff88', fontSize: '12px' }}>{generatedJob.jobTitle}</div>
                      <div style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.15)', borderRadius: '20px', padding: '4px 12px', color: '#00ff88', fontSize: '12px' }}>{generatedJob.clientName}</div>
                      <div style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.15)', borderRadius: '20px', padding: '4px 12px', color: '#00ff88', fontSize: '12px' }}>{generatedJob.amount}</div>
                    </div>

                    <div style={{ marginTop: '16px', color: '#555555', fontSize: '11px', fontFamily: 'monospace', textAlign: 'center', wordBreak: 'break-all' }}>
                      10.11.242.44:5173/review/{generatedJob.reviewToken}
                    </div>

                    <button onClick={handleCopyLink} style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', color: '#00ff88', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: '12px', transition: 'all 0.3s ease' }}>
                      {copiedLink ? 'Copied! ✓' : 'Copy Review Link'}
                    </button>

                    <button onClick={handleAddAnother} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#888888', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', cursor: 'pointer', width: '100%', marginTop: '8px', transition: 'all 0.3s ease' }}>
                      Add Another Job
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : activeSection === 'verification' ? (
          <div style={{ animation: 'slideUpFade 0.6s ease forwards', opacity: 0, width: '100%', maxWidth: '900px' }}>
            <div style={{ color: '#00ff88', letterSpacing: '0.3em', fontSize: '11px', marginBottom: '8px' }}>
              GOVERNMENT VERIFICATION
            </div>
            <div style={{ fontSize: '42px', fontWeight: 800, background: 'linear-gradient(90deg, #ff4444, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
              ID Verification
            </div>
            <div style={{ color: '#888888', fontSize: '15px', marginBottom: '40px' }}>
              Verify your identity through DigiLocker and government databases
            </div>

            {verifyData && (
              <>
                {/* OVERALL STATUS BANNER */}
                <div style={{
                  marginBottom: '32px',
                  padding: '24px 32px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(12px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: verifyData.overallStatus === 'verified' ? 'rgba(0,255,136,0.06)' : verifyData.overallStatus === 'partial' ? 'rgba(255,184,0,0.06)' : 'rgba(255,68,68,0.06)',
                  border: verifyData.overallStatus === 'verified' ? '1px solid rgba(0,255,136,0.2)' : verifyData.overallStatus === 'partial' ? '1px solid rgba(255,184,0,0.2)' : '1px solid rgba(255,68,68,0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {verifyData.overallStatus === 'verified' && (
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#00ff88', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontSize: '24px' }}>✓</div>
                    )}
                    <div>
                      <div style={{
                        fontSize: '20px', fontWeight: 800,
                        color: verifyData.overallStatus === 'verified' ? '#00ff88' : verifyData.overallStatus === 'partial' ? '#FFB800' : '#ff4444'
                      }}>
                        {verifyData.overallStatus === 'verified' ? 'Fully Verified' : verifyData.overallStatus === 'partial' ? 'Partially Verified' : 'Not Verified'}
                      </div>
                      <div style={{ color: '#888888', fontSize: '13px', marginTop: '4px' }}>
                        {verifyData.overallStatus === 'verified' ? 'All documents verified • Blockchain secured' : verifyData.overallStatus === 'partial' ? 'Complete all verifications below' : 'Complete identity verification to build client trust'}
                      </div>
                    </div>
                  </div>
                  {verifyData.overallStatus === 'verified' && verifyData.blockchainHash && (
                    <div style={{ color: '#00ff88', fontSize: '11px', fontFamily: 'monospace', textAlign: 'right' }}>
                      Hash: {verifyData.blockchainHash.substring(0, 20)}...
                    </div>
                  )}
                </div>

                {/* DIGILOCKER BRANDING BAR */}
                <div style={{
                  marginBottom: '32px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px',
                      background: 'linear-gradient(135deg, #003087, #0066CC)',
                      borderRadius: '6px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#ffffff', fontSize: '10px', fontWeight: 800, letterSpacing: '-0.5px'
                    }}>
                      DL
                    </div>
                    <div>
                      <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600 }}>DigiLocker Integration</div>
                      <div style={{ color: '#888888', fontSize: '12px' }}>Government of India • Mock Sandbox Mode</div>
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.3)',
                    borderRadius: '20px', padding: '4px 14px',
                    color: '#FFB800', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em'
                  }}>
                    SANDBOX MODE
                  </div>
                </div>

                {/* 3 VERIFICATION CARDS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* CARD 1 — Aadhaar */}
                  <div style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '28px 32px', backdropFilter: 'blur(12px)', transition: 'all 0.3s ease', animation: 'slideUpFade 0.6s ease forwards', animationDelay: '0.1s', opacity: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'linear-gradient(135deg, #003087, #0066CC)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CreditCard size={20} color="#ffffff" />
                        </div>
                        <div>
                          <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700 }}>Aadhaar Card Verification</div>
                          <div style={{ color: '#888888', fontSize: '12px' }}>12-digit Aadhaar number</div>
                        </div>
                      </div>
                      <div style={{
                        borderRadius: '20px', padding: '6px 14px', fontSize: '12px', fontWeight: 600,
                        background: verifyData.aadhaar.status === 'verified' ? 'rgba(0,255,136,0.08)' : verifyData.aadhaar.status === 'failed' ? 'rgba(255,68,68,0.08)' : 'rgba(255,255,255,0.04)',
                        border: verifyData.aadhaar.status === 'verified' ? '1px solid rgba(0,255,136,0.2)' : verifyData.aadhaar.status === 'failed' ? '1px solid rgba(255,68,68,0.2)' : '1px solid rgba(255,255,255,0.1)',
                        color: verifyData.aadhaar.status === 'verified' ? '#00ff88' : verifyData.aadhaar.status === 'failed' ? '#ff4444' : '#888888'
                      }}>
                        {verifyData.aadhaar.status === 'verified' ? '✓ Verified' : verifyData.aadhaar.status === 'failed' ? '✗ Failed' : '○ Pending'}
                      </div>
                    </div>

                    {verifyData.aadhaar.status === 'verified' ? (
                      <div>
                        <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>XXXX-XXXX-{verifyData.aadhaar.number}</div>
                        <div style={{ color: '#888888', fontSize: '13px', marginBottom: '4px' }}>{verifyData.aadhaar.name}</div>
                        <div style={{ color: '#555555', fontSize: '11px' }}>Verified on {new Date(verifyData.aadhaar.verifiedAt).toLocaleDateString()}</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                          <input type="text" maxLength={12} placeholder="Enter 12-digit Aadhaar number" value={aadhaarNum} onChange={e => setAadhaarNum(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '14px', outline: 'none' }} />
                          <input type="text" placeholder="Name as on Aadhaar" value={fullName} onChange={e => setFullName(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '14px', outline: 'none' }} />
                        </div>
                        <button disabled={loadingAadhaar} onClick={handleVerifyAadhaar} style={{ background: 'linear-gradient(135deg, #003087, #0066CC)', color: '#ffffff', fontWeight: 700, padding: '12px 28px', borderRadius: '8px', border: 'none', cursor: loadingAadhaar ? 'not-allowed' : 'pointer', fontSize: '14px', opacity: loadingAadhaar ? 0.8 : 1, transition: 'all 0.3s ease' }}>
                          {loadingAadhaar ? (
                            <><div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.1)', borderTop: '2px solid #00ff88', borderRadius: '50%', display: 'inline-block', marginRight: '8px', verticalAlign: 'middle', animation: 'spin 1s linear infinite' }}></div> Verifying with DigiLocker...</>
                          ) : 'Verify Aadhaar'}
                        </button>
                        {loadingAadhaar && <div style={{ color: '#888888', fontSize: '12px', marginTop: '12px' }}>Connecting to DigiLocker servers...</div>}
                        {aadhaarMsg && <div style={{ fontSize: '13px', marginTop: '8px', color: aadhaarMsg.includes('successful') ? '#00ff88' : '#ff4444' }}>{aadhaarMsg}</div>}
                        <div style={{ background: 'rgba(255,184,0,0.04)', border: '1px solid rgba(255,184,0,0.1)', borderRadius: '8px', padding: '10px 14px', marginTop: '12px', color: '#FFB800', fontSize: '11px' }}>
                          💡 Sandbox: Any 12-digit number works (except starting with 9)
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CARD 2 — License */}
                  <div style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '28px 32px', backdropFilter: 'blur(12px)', transition: 'all 0.3s ease', animation: 'slideUpFade 0.6s ease forwards', animationDelay: '0.2s', opacity: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'linear-gradient(135deg, #7B2FBE, #9B4FDE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText size={20} color="#ffffff" />
                        </div>
                        <div>
                          <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700 }}>Driving License Verification</div>
                          <div style={{ color: '#888888', fontSize: '12px' }}>State-issued driving license</div>
                        </div>
                      </div>
                      <div style={{
                        borderRadius: '20px', padding: '6px 14px', fontSize: '12px', fontWeight: 600,
                        background: verifyData.drivingLicense.status === 'verified' ? 'rgba(0,255,136,0.08)' : verifyData.drivingLicense.status === 'failed' ? 'rgba(255,68,68,0.08)' : 'rgba(255,255,255,0.04)',
                        border: verifyData.drivingLicense.status === 'verified' ? '1px solid rgba(0,255,136,0.2)' : verifyData.drivingLicense.status === 'failed' ? '1px solid rgba(255,68,68,0.2)' : '1px solid rgba(255,255,255,0.1)',
                        color: verifyData.drivingLicense.status === 'verified' ? '#00ff88' : verifyData.drivingLicense.status === 'failed' ? '#ff4444' : '#888888'
                      }}>
                        {verifyData.drivingLicense.status === 'verified' ? '✓ Verified' : verifyData.drivingLicense.status === 'failed' ? '✗ Failed' : '○ Pending'}
                      </div>
                    </div>

                    {verifyData.drivingLicense.status === 'verified' ? (
                      <div>
                        <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{verifyData.drivingLicense.number}</div>
                        <div style={{ color: '#555555', fontSize: '11px' }}>Verified on {new Date(verifyData.drivingLicense.verifiedAt).toLocaleDateString()}</div>
                      </div>
                    ) : (
                      <div>
                        <input type="text" placeholder="e.g. KA-01-20190012345" value={licenseNum} onChange={e => setLicenseNum(e.target.value)} style={{ width: '100%', marginBottom: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '14px', outline: 'none' }} />
                        <button disabled={loadingLicense} onClick={handleVerifyLicense} style={{ background: 'linear-gradient(135deg, #7B2FBE, #9B4FDE)', color: '#ffffff', fontWeight: 700, padding: '12px 28px', borderRadius: '8px', border: 'none', cursor: loadingLicense ? 'not-allowed' : 'pointer', fontSize: '14px', opacity: loadingLicense ? 0.8 : 1, transition: 'all 0.3s ease' }}>
                          {loadingLicense ? (
                            <><div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.1)', borderTop: '2px solid #00ff88', borderRadius: '50%', display: 'inline-block', marginRight: '8px', verticalAlign: 'middle', animation: 'spin 1s linear infinite' }}></div> Verifying with RTO database...</>
                          ) : 'Verify License'}
                        </button>
                        {licenseMsg && <div style={{ fontSize: '13px', marginTop: '8px', color: licenseMsg.includes('verified') ? '#00ff88' : '#ff4444' }}>{licenseMsg}</div>}
                        <div style={{ background: 'rgba(255,184,0,0.04)', border: '1px solid rgba(255,184,0,0.1)', borderRadius: '8px', padding: '10px 14px', marginTop: '12px', color: '#FFB800', fontSize: '11px' }}>
                          💡 Sandbox: Any license number works (except starting with X)
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CARD 3 — Police */}
                  <div style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '28px 32px', backdropFilter: 'blur(12px)', transition: 'all 0.3s ease', animation: 'slideUpFade 0.6s ease forwards', animationDelay: '0.3s', opacity: 0 }}>
                    <div style={{ background: 'rgba(255,184,0,0.04)', border: '1px solid rgba(255,184,0,0.1)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', color: '#FFB800', fontSize: '12px', lineHeight: 1.5 }}>
                      ⚠️ This check searches national crime and verification databases. Results are mock data in sandbox mode.
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'linear-gradient(135deg, #1a1a2e, #16213e)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Shield size={20} color="#ffffff" />
                        </div>
                        <div>
                          <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700 }}>Police Verification Check</div>
                          <div style={{ color: '#888888', fontSize: '12px' }}>Background check via local police records</div>
                        </div>
                      </div>
                      <div style={{
                        borderRadius: '20px', padding: '6px 14px', fontSize: '12px', fontWeight: 600,
                        background: verifyData.policeVerification.status === 'clear' ? 'rgba(0,255,136,0.08)' : verifyData.policeVerification.status === 'flagged' ? 'rgba(255,68,68,0.08)' : 'rgba(255,255,255,0.04)',
                        border: verifyData.policeVerification.status === 'clear' ? '1px solid rgba(0,255,136,0.2)' : verifyData.policeVerification.status === 'flagged' ? '1px solid rgba(255,68,68,0.2)' : '1px solid rgba(255,255,255,0.1)',
                        color: verifyData.policeVerification.status === 'clear' ? '#00ff88' : verifyData.policeVerification.status === 'flagged' ? '#ff4444' : '#888888'
                      }}>
                        {verifyData.policeVerification.status === 'clear' ? '✓ Clear' : verifyData.policeVerification.status === 'flagged' ? '✗ Flagged' : '○ Pending'}
                      </div>
                    </div>

                    {verifyData.policeVerification.status === 'clear' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Shield size={32} color="#00ff88" />
                        <div>
                          <div style={{ color: '#00ff88', fontSize: '20px', fontWeight: 800 }}>CLEAR</div>
                          <div style={{ color: '#888888', fontSize: '13px' }}>Ref: {verifyData.policeVerification.reportNumber}</div>
                          <div style={{ color: '#555555', fontSize: '11px' }}>Checked on {new Date(verifyData.policeVerification.verifiedAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ) : verifyData.policeVerification.status === 'flagged' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Shield size={32} color="#ff4444" />
                        <div style={{ color: '#ff4444', fontSize: '18px', fontWeight: 800 }}>FLAGGED - Manual Review Required</div>
                      </div>
                    ) : (
                      <div>
                        <input type="text" placeholder="Enter application reference (optional)" value={policeRef} onChange={e => setPoliceRef(e.target.value)} style={{ width: '100%', marginBottom: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '14px', outline: 'none' }} />
                        <button disabled={loadingPolice} onClick={handleVerifyPolice} style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontWeight: 700, padding: '12px 28px', borderRadius: '8px', cursor: loadingPolice ? 'not-allowed' : 'pointer', fontSize: '14px', opacity: loadingPolice ? 0.8 : 1, transition: 'all 0.3s ease' }}>
                          {loadingPolice ? (
                            <><div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.1)', borderTop: '2px solid #00ff88', borderRadius: '50%', display: 'inline-block', marginRight: '8px', verticalAlign: 'middle', animation: 'spin 1s linear infinite' }}></div> Running background check... (3s)</>
                          ) : 'Run Background Check'}
                        </button>
                        {policeMsg && <div style={{ fontSize: '13px', marginTop: '8px', color: policeMsg.includes('clear') ? '#00ff88' : '#ff4444' }}>{policeMsg}</div>}
                        <div style={{ background: 'rgba(255,184,0,0.04)', border: '1px solid rgba(255,184,0,0.1)', borderRadius: '8px', padding: '10px 14px', marginTop: '12px', color: '#FFB800', fontSize: '11px' }}>
                          💡 Sandbox: Clears automatically (use reference starting with F to simulate flag)
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* PROGRESS TRACKER */}
                <div style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px 32px', marginTop: '24px' }}>
                  <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>Verification Progress</div>
                  
                  {(() => {
                    let completedCount = 0;
                    if (verifyData.aadhaar.status === 'verified') completedCount++;
                    if (verifyData.drivingLicense.status === 'verified') completedCount++;
                    if (verifyData.policeVerification.status === 'clear') completedCount++;
                    
                    return (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {/* Step 1 */}
                          <div>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: verifyData.aadhaar.status === 'verified' ? '#00ff88' : 'rgba(0,255,136,0.1)', border: verifyData.aadhaar.status === 'verified' ? 'none' : '2px solid #00ff88', display: 'flex', alignItems: 'center', justifyContent: 'center', color: verifyData.aadhaar.status === 'verified' ? '#0a0a0a' : '#00ff88', fontSize: '14px', fontWeight: 700, margin: '0 auto' }}>
                              {verifyData.aadhaar.status === 'verified' ? '✓' : '1'}
                            </div>
                            <div style={{ fontSize: '12px', color: '#888888', marginTop: '6px', textAlign: 'center' }}>Aadhaar</div>
                          </div>

                          <div style={{ flex: 1, height: '1px', background: verifyData.aadhaar.status === 'verified' ? '#00ff88' : 'rgba(255,255,255,0.06)', margin: '0 8px', marginBottom: '20px' }}></div>

                          {/* Step 2 */}
                          <div>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: verifyData.drivingLicense.status === 'verified' ? '#00ff88' : verifyData.aadhaar.status === 'verified' ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.04)', border: verifyData.drivingLicense.status === 'verified' ? 'none' : verifyData.aadhaar.status === 'verified' ? '2px solid #00ff88' : '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: verifyData.drivingLicense.status === 'verified' ? '#0a0a0a' : verifyData.aadhaar.status === 'verified' ? '#00ff88' : '#555555', fontSize: '14px', fontWeight: 700, margin: '0 auto' }}>
                              {verifyData.drivingLicense.status === 'verified' ? '✓' : '2'}
                            </div>
                            <div style={{ fontSize: '12px', color: '#888888', marginTop: '6px', textAlign: 'center' }}>License</div>
                          </div>

                          <div style={{ flex: 1, height: '1px', background: verifyData.drivingLicense.status === 'verified' ? '#00ff88' : 'rgba(255,255,255,0.06)', margin: '0 8px', marginBottom: '20px' }}></div>

                          {/* Step 3 */}
                          <div>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: verifyData.policeVerification.status === 'clear' ? '#00ff88' : verifyData.drivingLicense.status === 'verified' ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.04)', border: verifyData.policeVerification.status === 'clear' ? 'none' : verifyData.drivingLicense.status === 'verified' ? '2px solid #00ff88' : '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: verifyData.policeVerification.status === 'clear' ? '#0a0a0a' : verifyData.drivingLicense.status === 'verified' ? '#00ff88' : '#555555', fontSize: '14px', fontWeight: 700, margin: '0 auto' }}>
                              {verifyData.policeVerification.status === 'clear' ? '✓' : '3'}
                            </div>
                            <div style={{ fontSize: '12px', color: '#888888', marginTop: '6px', textAlign: 'center' }}>Police Check</div>
                          </div>
                        </div>

                        <div style={{ color: '#888888', fontSize: '13px', marginTop: '24px', marginBottom: '8px' }}>
                          {completedCount}/3 verifications complete
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ width: `${(completedCount/3)*100}%`, height: '100%', background: 'linear-gradient(90deg, #00ff88, #7B2FBE)', borderRadius: '999px', transition: 'width 1s ease' }}></div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </>
            )}
            
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        ) : (
          <div style={{
            color: '#444444',
            fontSize: '16px'
          }}>
            Select a section from the sidebar
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
