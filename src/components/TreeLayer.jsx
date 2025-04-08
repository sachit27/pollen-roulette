import React, { useEffect, useState } from "react";
import { CircleMarker, Tooltip, LayerGroup } from "react-leaflet";

export function TreeLayer() {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    fetch("/data/trees.geojson")
      .then((res) => res.json())
      .then(setTreeData);
  }, []);

  // A single color for all trees, or you can do a color scale if you prefer
  const markerColor = "#388e3c";

  return treeData ? (
    <LayerGroup>
      {treeData.features.map((feature, i) => {
        const [lon, lat] = feature.geometry.coordinates;
        const potential = feature.properties.pollen_potential || 0;
        const genus = feature.properties.genus || "Unknown";

        return (
          <CircleMarker
            key={i}
            center={[lat, lon]}
            radius={3.5}
            fillColor={markerColor}
            fillOpacity={0.8}
            stroke={false}
          >
            <Tooltip>
              <div>
                <strong>{genus}</strong>
                <br />
                Pollen Potential: {potential.toFixed(2)}
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </LayerGroup>
  ) : null;
}
