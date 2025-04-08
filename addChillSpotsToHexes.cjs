// addChillSpotsToHexes.js
const fs = require("fs");
const turf = require("@turf/turf");

// Load geojsons
const hexes = JSON.parse(fs.readFileSync("./public/data/hexes.geojson"));
const chillSpots = JSON.parse(fs.readFileSync("./public/data/chill_spots.geojson"));

// Mark chill spots (parks/gardens)
const chillPoints = chillSpots.features.map((f) => turf.point(f.geometry.coordinates));

const updatedHexes = {
  ...hexes,
  features: hexes.features.map((hex) => {
    const hexPolygon = turf.feature(hex.geometry);
    const hasChill = chillPoints.some((pt) => turf.booleanPointInPolygon(pt, hexPolygon));
    hex.properties.has_chillspot = hasChill;
    return hex;
  }),
};

// Save new hexes file
fs.writeFileSync("./public/data/hexes_with_chill.geojson", JSON.stringify(updatedHexes, null, 2));
console.log("✅ Chill spot flags added to hexes!");
