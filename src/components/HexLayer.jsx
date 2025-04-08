import React, { useEffect, useState, useRef } from "react";
import { GeoJSON } from "react-leaflet";
import chroma from "chroma-js";

export function HexLayer({ sneezeLevel }) {
  const [hexData, setHexData] = useState(null);
  const geoJsonRef = useRef();

  const getColor = (score) =>
    chroma
      .scale(["#e0f3db", "#a8ddb5", "#43a2ca", "#0868ac"])
      .domain([0, 1])(score)
      .hex();

  // Load hex data once
  useEffect(() => {
    fetch("/data/hexes.geojson")
      .then((res) => res.json())
      .then(setHexData);
  }, []);

  // Dynamically update style based on sneezeLevel
  useEffect(() => {
    if (!geoJsonRef.current) return;

    geoJsonRef.current.eachLayer((layer) => {
      const score = layer.feature?.properties?.score_scaled ?? 0;
      const show = score >= sneezeLevel;

      layer.setStyle({
        fillColor: getColor(score),
        color: "#000",
        weight: 0.5,
        fillOpacity: show ? 0.75 : 0.1,
      });
    });
  }, [sneezeLevel]);

  return hexData ? (
    <GeoJSON
      data={hexData}
      ref={geoJsonRef}
      style={(feature) => ({
        fillColor: getColor(feature.properties.score_scaled),
        color: "#000",
        weight: 0.5,
        fillOpacity:
          feature.properties.score_scaled >= sneezeLevel ? 0.75 : 0.1,
      })}
      onEachFeature={(feature, layer) => {
        layer.bindTooltip(
          `🔥 Pollen Index: ${feature.properties.score_scaled.toFixed(2)}<br/>
           🌳 Trees: ${feature.properties.total_trees}`,
          { sticky: true }
        );
      }}
    />
  ) : null;
}
