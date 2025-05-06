import React from 'react';
import './MapRadarView.css';

const MapRadarView = ({ activeView, coordinates }) => {
  // Default coordinates if none are provided
  const lat = coordinates?.lat || 20.5937;
  const lon = coordinates?.lon || 78.9629;
  
  return (
    <div className="map-radar-view">
      {activeView === 'map' && (
        <div className="map-container visible">
          <h4>Location Map</h4>
          <iframe 
            className="map-frame"
            title="Weather Location Map"
            width="100%" 
            height="300" 
            frameBorder="0" 
            src={`https://maps.google.com/maps?q=${lat},${lon}&z=10&output=embed`}
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}
      
      {activeView === 'radar' && (
        <div className="radar-container visible">
          <h4>Weather Radar</h4>
          <iframe
            className="radar-frame"
            title="Weather Radar"
            width="100%"
            height="300"
            frameBorder="0"
            src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=8&level=surface&overlay=radar&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default MapRadarView;