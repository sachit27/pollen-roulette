import React, { useEffect, useState } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";

export function SneezeQuest({ enabled, maxSteps = 10 }) {
  const map = useMap();
  const [hexData, setHexData] = useState(null);
  const [position, setPosition] = useState(null);
  const [stepsLeft, setStepsLeft] = useState(maxSteps);
  const [visitedChillSpots, setVisitedChillSpots] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Load hex grid data
  useEffect(() => {
    if (!enabled) return;
    fetch("/data/hexes_with_chill.geojson")
      .then((res) => res.json())
      .then(setHexData);
  }, [enabled]);

  // Handle hex click to move player
  const onHexClick = (e) => {
    const feature = e.target.feature;
    const coords = e.latlng;
    const pollen = feature.properties.score_scaled || 0;
    const chill = feature.properties.has_chillspot || false;

    // First move: set starting position
    if (!gameStarted) {
      setGameStarted(true);
      setPosition(coords);
      return;
    }

    if (stepsLeft <= 0) return;

    setPosition(coords);
    setStepsLeft((s) => s - 1);

    if (chill) {
      setVisitedChillSpots((prev) => [...prev, coords]);
    }

    if (pollen > 0.7) {
      alert("😱 Oh no! You stepped into a pollen mine!");
      setStepsLeft(0);
    }
  };

  // Style hex based on current position and visited
  const getStyle = (feature) => {
    const pollen = feature.properties.score_scaled || 0;
    const chill = feature.properties.has_chillspot || false;

    let color = "#ccc";
    if (pollen > 0.7) color = "#e57373"; // red = pollen mine
    else if (chill) color = "#aed581"; // green = chill spot
    else color = "#90caf9"; // neutral

    return {
      fillColor: color,
      color: "#555",
      weight: 0.8,
      fillOpacity: 0.6,
    };
  };

  return enabled && hexData ? (
    <>
      <GeoJSON
        data={hexData}
        style={getStyle}
        onEachFeature={(feature, layer) => {
          layer.on({
            click: onHexClick,
          });
        }}
      />
      <div className="sneeze-quest-overlay">
        <p>🎮 <strong>Sneeze Quest</strong></p>
        <p>🦶 Steps Left: {stepsLeft}</p>
        <p>🧊 Chill Spots Visited: {visitedChillSpots.length}</p>
        {stepsLeft === 0 && <p>💀 Game Over</p>}
      </div>
    </>
  ) : null;
}
