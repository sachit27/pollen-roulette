import React, { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./RoutePlanner.css";

export function RoutePlanner() {
  const map = useMap();
  const [points, setPoints] = useState([]);
  const [routeLine, setRouteLine] = useState(null);
  const [markerStart, setMarkerStart] = useState(null);
  const [markerEnd, setMarkerEnd] = useState(null);
  const [clickMode, setClickMode] = useState(false);

  const handleMapClick = (e) => {
    if (!clickMode) return;

    const clicked = [e.latlng.lat, e.latlng.lng];
    if (points.length < 2) {
      setPoints([...points, clicked]);
    }
  };

  useEffect(() => {
    if (!map) return;
    map.on("click", handleMapClick);
    return () => {
      map.off("click", handleMapClick);
    };
  }, [map, clickMode, points]);

  useEffect(() => {
    if (points.length > 0) {
      if (markerStart) map.removeLayer(markerStart);
      const mStart = L.marker(points[0]).addTo(map);
      setMarkerStart(mStart);
    }
    if (points.length > 1) {
      if (markerEnd) map.removeLayer(markerEnd);
      const mEnd = L.marker(points[1]).addTo(map);
      setMarkerEnd(mEnd);
    }
  }, [points]);

  const getRoute = async () => {
    if (points.length !== 2) return;

    const [start, end] = points;
    const url = `https://routing.openstreetmap.de/routed-foot/route/v1/foot/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();

    const coords = data.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]);
    if (routeLine) map.removeLayer(routeLine);

    const line = L.polyline(coords, {
      color: "blue",
      weight: 4,
      opacity: 0.8,
    }).addTo(map);

    setRouteLine(line);
  };

  const resetRoute = () => {
    setPoints([]);
    if (routeLine) map.removeLayer(routeLine);
    if (markerStart) map.removeLayer(markerStart);
    if (markerEnd) map.removeLayer(markerEnd);
    setRouteLine(null);
    setMarkerStart(null);
    setMarkerEnd(null);
  };

  return (
    <div className="route-planner">
      <h4>🚶 Route Planner</h4>
      <p>
        Click <strong>Start Planning</strong>, then select 2 points on the map.
      </p>
      <button
        type="button"
        onClick={() => {
          resetRoute();
          setClickMode(true);
        }}
      >
        {clickMode ? "Re-select Points" : "Start Planning"}
      </button>

      <button
        type="button"
        onClick={getRoute}
        disabled={points.length !== 2}
        style={{ marginTop: "8px" }}
      >
        Show Shortest Route
      </button>

      <button
        type="button"
        onClick={resetRoute}
        style={{ marginTop: "8px", backgroundColor: "#eee" }}
      >
        Clear
      </button>
    </div>
  );
}
