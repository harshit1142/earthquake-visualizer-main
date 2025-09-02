import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

// Marker color by magnitude
const getColor = (mag) => {
  if (mag <= 3) return "green";
  if (mag <= 5) return "orange";
  return "red";
};

// Marker style
const getMarkerIcon = (magnitude) => {
  const size = Math.max(8, magnitude * 5);
  const color = getColor(magnitude);
  return L.divIcon({
    html: `<div style="
        background: ${color};
        opacity: 0.6;
        border-radius: 50%;
        width:${size}px;
        height:${size}px;
        border:2px solid ${color === "red" ? "#900" : "#333"};
      "></div>`,
    className: "",
  });
};

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("all_day"); // all_day | all_week | all_hour
  const [minMag, setMinMag] = useState(0);

  const fetchEarthquakes = async () => {
    try {
      const res = await axios.get(
        `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${timeRange}.geojson`
      );
      setEarthquakes(res.data.features);
    } catch (err) {
      setError("Failed to load earthquake data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchEarthquakes();
  }, [timeRange]);

  if (loading) return <p className="status">Loading earthquakes...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="app">
      <header className="header">
        <h1>🌍 Earthquake Visualizer</h1>
      </header>

      {/* Controls */}
      <div className="controls">
        <div>
          <label>Time Range: </label>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="all_hour">Past Hour</option>
            <option value="all_day">Past Day</option>
            <option value="all_week">Past Week</option>
          </select>
        </div>
        <div>
          <label>Min Magnitude: </label>
          <select value={minMag} onChange={(e) => setMinMag(Number(e.target.value))}>
            <option value={0}>All</option>
            <option value={2.5}>≥ 2.5</option>
            <option value={4.5}>≥ 4.5</option>
            <option value={6}>≥ 6.0</option>
          </select>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={8}
        scrollWheelZoom
        className="map-container"
        worldCopyJump={false}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />

        {earthquakes
          .filter((eq) => eq.properties.mag >= minMag)
          .map((eq) => {
            const [lng, lat, depth] = eq.geometry.coordinates;
            const { mag, place, time } = eq.properties;
            return (
              <Marker
                key={eq.id}
                position={[lat, lng]}
                icon={getMarkerIcon(mag)}
              >
                <Popup>
                  <div>
                    <p><strong>Location:</strong> {place}</p>
                    <p><strong>Magnitude:</strong> {mag}</p>
                    <p><strong>Depth:</strong> {depth} km</p>
                    <p><strong>Time:</strong> {new Date(time).toLocaleString()}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>

      {/* Legend */}
      <div className="legend">
        <h4>Magnitude</h4>
        <p><span className="dot green"></span> ≤ 3.0</p>
        <p><span className="dot orange"></span> 3.1 – 5.0</p>
        <p><span className="dot red"></span> 5.0</p>
      </div>
    </div>
  );
}

export default App;
