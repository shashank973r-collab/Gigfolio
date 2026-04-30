import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as THREE from 'three';
import NET from 'vanta/src/vanta.net';

const ReviewPage = () => {
  const { token } = useParams();
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [blockchainHash, setBlockchainHash] = useState('');

  useEffect(() => {
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
          color: 0x00ff88,
          color2: 0x7b2fbe,
          backgroundColor: 0x0a0a0a,
          points: 9.0,
          maxDistance: 25.0,
          spacing: 20.0,
          showDots: true
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://10.11.242.44:5000/api/jobs/review/${token}`);
        setJob(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'QR Code Invalid');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return alert('Please select a rating');
    if (!reviewerName) return alert('Please enter your name');
    
    setSubmitting(true);
    try {
      const res = await axios.post(`http://10.11.242.44:5000/api/jobs/review/${token}`, {
        reviewerName,
        rating,
        comment
      });
      setBlockchainHash(res.data.blockchainHash);
      setSuccess(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={vantaRef} style={{ minHeight: '100vh', display: 'flex', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.75)', pointerEvents: 'none', zIndex: 1 }} />
      
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '480px', margin: '0 auto', marginTop: '80px', padding: '16px' }}>
        <div style={{
          background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
          padding: '32px', backdropFilter: 'blur(12px)', transition: 'all 0.3s ease'
        }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
              <div style={{
                border: '2px solid rgba(255,255,255,0.1)', borderTop: '2px solid #00ff88', borderRadius: '50%',
                width: '40px', height: '40px', animation: 'spin 1s linear infinite'
              }} />
              <div style={{ color: '#888888', marginTop: '16px' }}>Validating QR code...</div>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto',
                background: 'rgba(255,68,68,0.12)', border: '2px solid #ff4444',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '32px', color: '#ff4444', boxShadow: '0 0 30px rgba(255,68,68,0.2)'
              }}>✗</div>
              <div style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, marginTop: '16px' }}>{error}</div>
              <div style={{ color: '#888888', marginTop: '8px' }}>Please contact the gig worker if you believe this is an error.</div>
            </div>
          ) : success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto',
                background: 'rgba(0,255,136,0.12)', border: '2px solid #00ff88',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '32px', color: '#00ff88', boxShadow: '0 0 30px rgba(0,255,136,0.2)',
                animation: 'pulseGlow 2s infinite'
              }}>✓</div>
              <div style={{ color: '#ffffff', fontSize: '24px', fontWeight: 800, marginTop: '16px' }}>Review Submitted!</div>
              <div style={{ color: '#888888', fontSize: '14px', marginTop: '8px', textAlign: 'center' }}>
                Your review has been verified and recorded on the blockchain
              </div>
              <div style={{
                marginTop: '24px', background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.1)',
                borderRadius: '10px', padding: '16px', textAlign: 'left'
              }}>
                <div style={{ color: '#555555', fontSize: '11px', letterSpacing: '0.05em', marginBottom: '6px' }}>Blockchain Hash:</div>
                <div style={{ color: '#00ff88', fontSize: '12px', fontFamily: 'monospace', wordBreak: 'break-all' }}>{blockchainHash}</div>
              </div>
              <div style={{ color: '#555555', fontSize: '13px', marginTop: '20px', textAlign: 'center' }}>
                Thank you for helping build trust in the gig economy 🙏
              </div>
              <style>{`@keyframes pulseGlow { 0% { box-shadow: 0 0 30px rgba(0,255,136,0.2); } 50% { box-shadow: 0 0 50px rgba(0,255,136,0.4); } 100% { box-shadow: 0 0 30px rgba(0,255,136,0.2); } }`}</style>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ color: '#00ff88', letterSpacing: '0.3em', fontSize: '11px', marginBottom: '16px' }}>VERIFIED JOB REVIEW</div>
              
              <div style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.1)', borderRadius: '10px', padding: '16px', marginBottom: '24px' }}>
                <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700 }}>👷 {job.workerUsername}</div>
                <div style={{ color: '#888888', fontSize: '13px', marginTop: '4px' }}>📋 {job.jobTitle}</div>
                <div style={{ color: '#888888', fontSize: '13px' }}>📅 {job.jobDate}</div>
              </div>

              <div style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>How was the service?</div>

              <label style={{ color: '#888888', fontSize: '12px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>YOUR NAME</label>
              <input
                type="text" required placeholder="Enter your name" value={reviewerName} onChange={e => setReviewerName(e.target.value)}
                style={{
                  width: '100%', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '14px', outline: 'none', transition: 'all 0.3s ease'
                }}
              />

              <label style={{ color: '#888888', fontSize: '12px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>RATING</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} onClick={() => setRating(star)}
                    style={{ fontSize: '32px', cursor: 'pointer', color: star <= rating ? '#FFB800' : '#333333', transition: 'color 0.2s' }}>
                    {star <= rating ? '★' : '☆'}
                  </span>
                ))}
              </div>

              <label style={{ color: '#888888', fontSize: '12px', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>YOUR REVIEW</label>
              <textarea
                required placeholder="Tell others about your experience..." value={comment} onChange={e => setComment(e.target.value)}
                style={{
                  width: '100%', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '14px', outline: 'none', transition: 'all 0.3s ease',
                  height: '100px', resize: 'vertical'
                }}
              />

              <button disabled={submitting} type="submit" style={{
                width: '100%', background: '#00ff88', color: '#0a0a0a', fontWeight: 700, fontSize: '15px', padding: '14px',
                borderRadius: '8px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', opacity: submitting ? 0.7 : 1
              }}>
                {submitting ? 'Submitting...' : 'Submit Verified Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
