import React, { useState } from "react";
import { MapContainerComponent } from "./components/MapContainer";
import { FilterPanel } from "./components/FilterPanel";
import { RoutePlanner } from "./components/RoutePlanner";
import "./styles.css";

// Sneeze levels and interpretation
const sneezeLevels = [
  {
    label: "🌼 Almost Safe",
    value: 0.0,
    tip: "All areas are clear. Enjoy the fresh air!",
  },
  {
    label: "😬 Risky Sniff Zone",
    value: 0.3,
    tip: "Some moderate pollen detected. Areas below 0.3 are chill.",
  },
  {
    label: "😷 High Alert",
    value: 0.6,
    tip: "Significant pollen detected. Avoid the glowing zones.",
  },
  {
    label: "🤧 Pollenocalypse",
    value: 0.85,
    tip: "Pollen war zone! Sunglasses, masks... whatever helps!",
  },
];

export default function App() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [routeActive, setRouteActive] = useState(false);

  const sneezeLevel = sneezeLevels[sliderIndex].value;

  const handleRoutePlanToggle = () => {
    setRouteActive(!routeActive);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        🤧 <span>Zürich Pollen Roulette</span> — Spring survival starts here — dodge the sneeze zones
      </header>

      <div className="main-layout">
        {/* Sidebar filter panel */}
        <div className="filter-panel">
          <FilterPanel
            sliderIndex={sliderIndex}
            setSliderIndex={setSliderIndex}
            sneezeLevels={sneezeLevels}
            onRoutePlanToggle={handleRoutePlanToggle}
          />

          {/* Route planner displayed inside sidebar when toggled */}
          {routeActive && <RoutePlanner />}
        </div>

        {/* Main map section */}
        <div className="map-container">
          <MapContainerComponent sneezeLevel={sneezeLevel} />
        </div>
      </div>
    </div>
  );
}
