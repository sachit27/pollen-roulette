import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ScaleControl,
  useMap,
} from "react-leaflet";

import { HexLayer } from "./HexLayer";
import { TreeLayer } from "./TreeLayer";
import { RoutePlanner } from "./RoutePlanner";
import { ChillSpotsLayer } from "./ChillSpotsLayer";

function ForceMapResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
}

export function MapContainerComponent({ sneezeLevel }) {
  return (
    <MapContainer
      center={[47.3769, 8.5417]}
      zoom={13}
      scrollWheelZoom={true}
      className="leaflet-container"
    >
      <ForceMapResize />
      <ScaleControl position="bottomleft" />

      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="CartoDB Positron">
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="CartoDB Dark">
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="🌲 Pollen Hotspots">
          <HexLayer sneezeLevel={sneezeLevel} />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="📍 Individual Trees">
          <TreeLayer />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="🧊 Chill Spots">
          <ChillSpotsLayer />
        </LayersControl.Overlay>
      </LayersControl>

      <RoutePlanner />
    </MapContainer>
  );
}
