import React, { useState, useRef } from 'react';
import { ShieldCheck, Database, Zap } from 'lucide-react';

const TrustProtocolCard = ({ title, description, Icon }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: 'rgba(12, 12, 14, 0.92)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        padding: '40px 32px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.35s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,255,136,0.15)'
          : '0 4px 24px rgba(0,0,0,0.4)',
        border: isHovered ? '1px solid rgba(0,255,136,0.5)' : '1px solid rgba(255,255,255,0.15)',
      }}
    >
      {/* Spotlight effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 136, 0.15) 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'rgba(0, 255, 136, 0.05)',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: isHovered ? '0 0 20px rgba(0, 255, 136, 0.4), inset 0 0 10px rgba(0, 255, 136, 0.2)' : 'none',
          transition: 'all 0.3s ease'
        }}>
          <Icon 
            size={32} 
            color="#00ff88" 
            style={{ 
              filter: isHovered ? 'drop-shadow(0 0 8px rgba(0,255,136,0.8))' : 'none',
              transition: 'all 0.3s ease'
            }} 
          />
        </div>
        
        <h3 style={{
          color: '#ffffff',
          fontSize: '22px',
          fontWeight: 700,
          marginBottom: '12px',
          letterSpacing: '-0.02em',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {title}
        </h3>
        
        <p style={{
          color: '#c0c0c0',
          fontSize: '15px',
          lineHeight: 1.65,
          fontWeight: 400,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {description}
        </p>
      </div>
    </div>
  );
};

const TrustProtocol = () => {
  return (
    <section style={{
      background: 'transparent',
      padding: '120px 24px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      zIndex: 10,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
          padding: '40px 48px',
          background: 'rgba(10,10,12,0.88)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{
            color: '#00ff88',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.3em',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            Verification Layer
          </div>
          <h2 style={{
            color: '#ffffff',
            fontSize: '48px',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            marginBottom: '24px'
          }}>
            The <span style={{ background: 'linear-gradient(90deg, #00ff88, #00cc6a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Trust Protocol</span>
          </h2>
          <p style={{
            color: '#888888',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            We've engineered a cryptographic layer of truth. Every worker profile is mathematically anchored, ensuring absolute integrity across the gig economy.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          <TrustProtocolCard 
            title="DigiLocker Integration"
            description="Our identity layer hooks directly into Aadhaar and state-level registries. Background checks are cryptographically signed at the source, eliminating fraudulent worker profiles instantly."
            Icon={ShieldCheck}
          />
          <TrustProtocolCard 
            title="Portable Reputation"
            description="Workers own their trust score. Through our dynamic, verified QR system, a worker can instantly prove their complete 5-star history anywhere, without relying on central authorities."
            Icon={Zap}
          />
        </div>
      </div>
    </section>
  );
};

export default TrustProtocol;
