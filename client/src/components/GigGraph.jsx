import React, { useState, useMemo } from 'react';

const GigGraph = ({ jobs = [] }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Generate the last 365 days
  const days = useMemo(() => {
    const today = new Date();
    // Start from a Sunday to align grid properly if needed, but 365 is standard
    const result = [];
    const counts = {};

    // First map all job dates to counts
    jobs.forEach(job => {
      if (job.jobDate) {
        // jobDate is typically YYYY-MM-DD
        const dateStr = new Date(job.jobDate).toISOString().split('T')[0];
        counts[dateStr] = (counts[dateStr] || 0) + 1;
      }
    });

    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      result.push({
        date: dateStr,
        displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        count: counts[dateStr] || 0
      });
    }

    return result;
  }, [jobs]);

  // Group into weeks (columns)
  const weeks = useMemo(() => {
    const w = [];
    for (let i = 0; i < days.length; i += 7) {
      w.push(days.slice(i, i + 7));
    }
    return w;
  }, [days]);

  const getColor = (count) => {
    if (count === 0) return 'rgba(255,255,255,0.04)';
    if (count === 1) return 'rgba(0, 255, 136, 0.3)';
    if (count === 2) return 'rgba(0, 255, 136, 0.6)';
    return '#00ff88'; // 3+ jobs
  };

  return (
    <div style={{
      background: 'rgba(10,10,10,0.8)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      padding: '32px',
      backdropFilter: 'blur(12px)',
      animation: 'slideUpFade 0.6s ease forwards',
      animationDelay: '0.5s',
      opacity: 0,
      width: '100%'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <div style={{ color: '#00ff88', letterSpacing: '0.3em', fontSize: '11px', marginBottom: '4px' }}>
            ACTIVITY
          </div>
          <div style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700 }}>
            Gig Activity Map
          </div>
        </div>
        <div style={{ color: '#888888', fontSize: '13px' }}>
          {jobs.length} jobs in the last year
        </div>
      </div>

      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '16px' }}>
        {weeks.map((week, wIndex) => (
          <div key={wIndex} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {week.map((day, dIndex) => (
              <div
                key={day.date}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: getColor(day.count),
                  borderRadius: '3px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  transform: hoveredDay?.date === day.date ? 'scale(1.2)' : 'scale(1)',
                  boxShadow: hoveredDay?.date === day.date && day.count > 0 ? '0 0 10px rgba(0,255,136,0.6)' : 'none',
                  position: 'relative'
                }}
              >
                {/* Tooltip */}
                {hoveredDay?.date === day.date && (
                  <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translate(-50%, -8px)',
                    background: '#ffffff',
                    color: '#0a0a0a',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    pointerEvents: 'none'
                  }}>
                    {day.count} {day.count === 1 ? 'job' : 'jobs'} on {day.displayDate}
                    {/* Tooltip triangle */}
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      borderWidth: '6px',
                      borderStyle: 'solid',
                      borderColor: '#ffffff transparent transparent transparent'
                    }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginTop: '8px', fontSize: '11px', color: '#888888' }}>
        <span>Less</span>
        <div style={{ width: '12px', height: '12px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '2px' }} />
        <div style={{ width: '12px', height: '12px', backgroundColor: 'rgba(0, 255, 136, 0.3)', borderRadius: '2px' }} />
        <div style={{ width: '12px', height: '12px', backgroundColor: 'rgba(0, 255, 136, 0.6)', borderRadius: '2px' }} />
        <div style={{ width: '12px', height: '12px', backgroundColor: '#00ff88', borderRadius: '2px' }} />
        <span>More</span>
      </div>
    </div>
  );
};

export default GigGraph;
