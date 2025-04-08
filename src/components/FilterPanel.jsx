import React from "react";
import "./FilterPanel.css";

export function FilterPanel({
  sliderIndex,
  setSliderIndex,
  sneezeLevels,
}) {
  const handleSliderChange = (e) => {
    const index = parseInt(e.target.value, 10);
    setSliderIndex(index); // App handles sneezeLevel from this
  };

  return (
    <div className="filter-panel-inner">
      <h3>🧪 Filter Your Exposure</h3>

      <div className="slider-section">
        <label className="slider-label">Choose Your Sneeze Level:</label>
        <input
          type="range"
          min="0"
          max={sneezeLevels.length - 1}
          step="1"
          value={sliderIndex}
          onChange={handleSliderChange}
        />
        <div className="slider-label">{sneezeLevels[sliderIndex].label}</div>
        <div
          className={`sneeze-interpretation ${
            sneezeLevels[sliderIndex].value >= 0.6
              ? "red"
              : sneezeLevels[sliderIndex].value >= 0.3
              ? "orange"
              : ""
          }`}
        >
          {sneezeLevels[sliderIndex].tip}
        </div>
      </div>

      <div className="legend-section">
        <h4>🌡️ Pollen Index Scale</h4>
        <ul className="legend-list">
          <li>0.00 - 0.10 → 🟢 Low</li>
          <li>0.11 - 0.30 → 🟡 Moderate</li>
          <li>0.31 - 0.70 → 🟠 High</li>
          <li>0.71 - 1.00 → 🔴 Extreme</li>
        </ul>
      </div>

      <div className="legend-section">
        <h4>🌿 Low Pollen Chill Spot</h4>
        <ul className="legend-list">
          <li>🌳 Park</li>
          <li>🌼 Garden</li>
        </ul>
      </div>

      <div className="legend-section attribution">
        <p>
          📊 Based on open-source data from{" "}
          <a href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">
            OpenStreetMap
          </a>{" "}
          and{" "}
          <a href="https://data.stadt-zuerich.ch/" target="_blank" rel="noreferrer">
            Open Data Zurich
          </a>.
        </p>
        <p>
          🎓 Developed for educational purposes by{" "}
          <a href="https://www.linkedin.com/in/sachit-mahajan-9052b745/" target="_blank" rel="noreferrer">
            Sachit Mahajan
          </a>.
        </p>
      </div>
    </div>
  );
}
