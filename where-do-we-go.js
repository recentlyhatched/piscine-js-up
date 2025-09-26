import { places } from "./where-do-we-go.data.js";

let previousScroll = window.scrollY;

// Create location indicator
const location = document.createElement("a");
location.className = "location";
document.body.appendChild(location);

// Create compass
const compass = document.createElement("div");
compass.className = "direction";
document.body.appendChild(compass);

// Main function
function explore() {
  // Sort places from north to south
  places.sort(compareCoordinates);

  // Create full-screen sections
  places.forEach((place) => {
    const section = document.createElement("section");
    const imageName = place.name.toLowerCase().replace(/ /g, "-").split(",")[0];
    section.style.background = `url('./where-do-we-go_images/${imageName}.jpg') center/cover no-repeat`;
    section.style.width = "100%";
    section.style.height = "100vh";
    document.body.appendChild(section);
  });

  // Initial location update
  updateLocation();
}

// Scroll listener
document.addEventListener("scroll", () => {
  updateLocation();
  compass.textContent = previousScroll > window.scrollY ? "N" : "S";
  previousScroll = window.scrollY;
});

// Update location indicator
function updateLocation() {
  const midScroll = window.scrollY + window.innerHeight / 2;
  const index = Math.floor(midScroll / window.innerHeight);
  const place = places[index];

  location.textContent = `${place.name}\n${place.coordinates}`;
  location.style.color = place.color;
  location.href = `https://www.google.com/maps/place/${encodeCoordinates(place.coordinates)}/`;
  location.target = "_blank";
}

// Encode coordinates for Google Maps
function encodeCoordinates(coords) {
  return coords.replace(/ /g, "%20").replace(/°/g, "%C2%B0").replace(/"/g, "%22");
}

// Compare latitude for sorting
function compareCoordinates(a, b) {
  const parse = (coord) => {
    const [deg, minSec] = coord.split("°");
    const [min, secDir] = minSec.split("'");
    const [sec, dir] = secDir.split('"');
    const sign = dir === "S" ? -1 : 1;
    return [deg, min, sec].map(Number).map(n => n * sign);
  };

  const [aDeg, aMin, aSec] = parse(a.coordinates.split(" ")[0]);
  const [bDeg, bMin, bSec] = parse(b.coordinates.split(" ")[0]);

  return bDeg - aDeg || bMin - aMin || bSec - aSec;
}

export { explore };

