import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import L from "leaflet";

export function ChillSpotsLayer() {
  const [spots, setSpots] = useState(null);

  useEffect(() => {
    fetch("/data/chill_spots.geojson")
      .then((res) => res.json())
      .then(setSpots);
  }, []);

  // Filter to display only features whose category is "park" or "garden"
  const filteredSpots = spots
    ? {
        ...spots,
        features: spots.features.filter((feature) => {
          const category = feature.properties?.category?.toLowerCase() || "";
          return category === "park" || category === "garden";
        }),
      }
    : null;

  // Assign emoji based on category
  const getEmojiForCategory = (category) => {
    switch (category) {
      case "garden":
        return "🌼";
      case "park":
      default:
        return "🌳";
    }
  };

  const pointToLayer = (feature, latlng) => {
    const category = feature.properties?.category?.toLowerCase() || "";
    const emoji = getEmojiForCategory(category);
    return L.marker(latlng, {
      icon: new L.DivIcon({
        html: `<div class="chill-icon">${emoji}</div>`,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
    });
  };

  const onEachFeature = (feature, layer) => {
    const category = feature.properties?.category || "Chill Spot";
    const label = feature.properties.label || `${category}`;
    layer.bindPopup(label);
  };

  return filteredSpots ? (
    <GeoJSON
      data={filteredSpots}
      pointToLayer={pointToLayer}
      onEachFeature={onEachFeature}
    />
  ) : null;
}
