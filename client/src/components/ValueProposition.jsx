import React, { useState, useEffect } from 'react';
import { AlertTriangle, Zap, UserCheck } from 'lucide-react';

const RippleCard = ({ title, description, icon: Icon, align = 'left' }) => {
  const [ripples, setRipples] = useState([]);
  const [hovered, setHovered] = useState(false);

  const createRipple = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    setRipples((prev) => [...prev, { x, y, size, id: Date.now() }]);
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => setRipples((prev) => prev.slice(1)), 1000);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <div
      onClick={createRipple}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        /* Solid opaque background — no bleed-through from the Vanta net */
        background: 'rgba(12, 12, 14, 0.92)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        border: hovered
          ? '1px solid rgba(0, 255, 136, 0.5)'
          : '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '20px',
        padding: '40px 36px',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,255,136,0.15)'
          : '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Ripple rings */}
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            background: 'rgba(0, 255, 136, 0.12)',
            borderRadius: '50%',
            transform: 'scale(0)',
            animation: 'vp-ripple 1s ease-out forwards',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      <style>{`
        @keyframes vp-ripple {
          to { transform: scale(4); opacity: 0; }
        }
      `}</style>

      {/* Icon container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(0, 255, 136, 0.08)',
          border: '1px solid rgba(0, 255, 136, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '28px',
          boxShadow: '0 0 24px rgba(0,255,136,0.25)',
          filter: 'drop-shadow(0 0 6px #00ff88)',
        }}
      >
        <Icon size={24} color="#00ff88" />
      </div>

      {/* Title */}
      <h3
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: '22px',
          fontWeight: 800,
          marginBottom: '14px',
          color: '#ffffff',
          textAlign: align,
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
        }}
      >
        {title}
      </h3>

      {/* Body */}
      <p
        style={{
          position: 'relative',
          zIndex: 1,
          color: '#c0c0c0',
          fontSize: '15px',
          lineHeight: 1.65,
          textAlign: align,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
};

const ValueProposition = () => {
  return (
    <section
      style={{
        /* Transparent so the Vanta net shows through the section itself */
        background: 'transparent',
        padding: '100px 24px 120px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* Section header — backed by a dark pill so lines don't cut through text */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '64px',
            padding: '40px 48px',
            background: 'rgba(10,10,12,0.88)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '14px',
              color: '#ffffff',
              lineHeight: 1.15,
            }}
          >
            Why{' '}
            <span style={{ color: '#00ff88' }}>GigFolio?</span>
          </h2>
          <p
            style={{
              color: '#aaaaaa',
              fontSize: '18px',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            The future of gig work — built on transparency, speed, and absolute security.
          </p>
        </div>

        {/* 3-card grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          <RippleCard
            title="Scam-Free Ecosystem"
            description="Our verification layer ensures every identity is real and every review is earned. We've eliminated the noise to create a marketplace of pure integrity."
            icon={AlertTriangle}
            align="left"
          />
          <RippleCard
            title="Direct Connection"
            description="No gatekeepers, no delays. GigFolio enables a direct meetup between top-tier talent and high-value clients, slashing recruitment time by up to 80%."
            icon={Zap}
            align="center"
          />
          <RippleCard
            title="Zero Middlemen"
            description="Agencies take up to 40%. We take 0%. By removing third-party brokers, we ensure workers earn more and clients pay exactly for the value they receive."
            icon={UserCheck}
            align="right"
          />
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
