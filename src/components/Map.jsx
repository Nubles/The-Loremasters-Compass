import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Coordinates are [y, x] based on the image dimensions (3555, 4800)
const quests = [
  { name: "Cook's Assistant", coords: [1770, 2450] }, // Lumbridge Castle
  { name: 'Dragon Slayer', coords: [1650, 2480] }, // Champions' Guild
  { name: 'The Restless Ghost', coords: [1800, 2420] }, // Lumbridge Swamp
  { name: "Demon Slayer", coords: [1950, 2600] }, // Varrock
];

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const questLayer = useRef(null);
  const [showQuests, setShowQuests] = useState(true);

  const mapUrl = 'https://i.imgur.com/XNJG9Dm.jpeg';
  const mapBounds = [[0, 0], [3555, 4800]];

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = L.map(mapContainer.current, {
      crs: L.CRS.Simple,
      minZoom: -5,
    });

    L.imageOverlay(mapUrl, mapBounds).addTo(map.current);
    map.current.fitBounds(mapBounds);

    questLayer.current = L.layerGroup();
  }, []);

  useEffect(() => {
    if (!map.current || !questLayer.current) return;

    questLayer.current.clearLayers();

    if (showQuests) {
      quests.forEach(quest => {
        L.marker(quest.coords).addTo(questLayer.current)
          .bindPopup(quest.name);
      });
      questLayer.current.addTo(map.current);
    } else {
      questLayer.current.removeFrom(map.current);
    }
  }, [showQuests]);

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000, background: 'white', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
        <h3 style={{margin: '0 0 5px 0'}}>Layers</h3>
        <label>
          <input
            type="checkbox"
            checked={showQuests}
            onChange={() => setShowQuests(!showQuests)}
          />
          Quest Start Points
        </label>
      </div>
    </div>
  );
};

export default Map;
