import React from 'react';
import './MapRadarToggle.css';

const MapRadarToggle = ({ activeView, setActiveView }) => {
  return (
    <div className="view-toggle-container">
      <button
        className={`view-toggle-button ${activeView === 'map' ? 'active' : ''}`}
        onClick={() => setActiveView('map')}
      >
        <MapIcon /> Map View
      </button>
      <button
        className={`view-toggle-button ${activeView === 'radar' ? 'active' : ''}`}
        onClick={() => setActiveView('radar')}
      >
        <RadarIcon /> Radar View
      </button>
    </div>
  );
};

// Map Icon
const MapIcon = () => (
  <svg className="feature-icon map-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

// Radar Icon
const RadarIcon = () => (
  <svg className="feature-icon radar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v10" />
    <path d="M12 12l7 5" />
    <path d="M12 12l-7 5" />
    <path d="M2 12h10" />
  </svg>
);

export default MapRadarToggle;