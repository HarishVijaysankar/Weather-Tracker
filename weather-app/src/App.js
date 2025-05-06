import React, { useState } from 'react';
import MapRadarToggle from './components/MapRadarToggle';
import MapRadarView from './components/MapRadarView';
import Weather from './components/Weather';
function App() {
  const [activeView, setActiveView] = useState('map');

  return (
    <div className="App">
      <Weather />
      <MapRadarToggle activeView={activeView} setActiveView={setActiveView} />
      <MapRadarView activeView={activeView} />
    </div>
  );
}

export default App;
