import { places } from './where-do-we-go.data.js';

export const explore = () => {
  // Sort places north to south
  const sortedPlaces = [...places].sort((a, b) => b.latitude - a.latitude);

  // Create sections for each place with proper public image URL
  sortedPlaces.forEach(place => {
    const section = document.createElement('section');
    section.style.height = '100vh';
    section.style.backgroundImage = `url(https://public.01-edu.org/subjects/where-do-we-go/where-do-we-go_images/${place.name.toLowerCase()}.jpg)`;
    section.style.backgroundSize = 'cover';
    section.style.backgroundPosition = 'center';
    document.body.appendChild(section);
  });

  // Location indicator
  const locationIndicator = document.createElement('a');
  locationIndicator.className = 'location';
  locationIndicator.style.position = 'fixed';
  locationIndicator.style.top = '50%';
  locationIndicator.style.left = '50%';
  locationIndicator.style.transform = 'translate(-50%, -50%)';
  locationIndicator.style.whiteSpace = 'pre';
  locationIndicator.style.textAlign = 'center';
  locationIndicator.style.zIndex = '10';
  locationIndicator.style.fontSize = '1.2rem';
  locationIndicator.style.background = 'rgba(0,0,0,0.4)';
  locationIndicator.style.padding = '0.5em 1em';
  locationIndicator.style.borderRadius = '0.5em';
  locationIndicator.style.color = sortedPlaces[0].color;
  locationIndicator.href = `https://www.google.com/maps?q=${sortedPlaces[0].latitude},${sortedPlaces[0].longitude}`;
  locationIndicator.target = '_blank';
  locationIndicator.textContent = `${sortedPlaces[0].name}\n${sortedPlaces[0].latitude}, ${sortedPlaces[0].longitude}`;
  document.body.appendChild(locationIndicator);

  // Compass
  const compass = document.createElement('div');
  compass.className = 'direction';
  compass.style.position = 'fixed';
  compass.style.top = '1em';
  compass.style.left = '50%';
  compass.style.transform = 'translateX(-50%)';
  compass.style.fontSize = '2rem';
  compass.style.zIndex = '10';
  compass.style.background = 'rgba(0,0,0,0.3)';
  compass.style.padding = '0.2em 0.5em';
  compass.style.borderRadius = '0.3em';
  document.body.appendChild(compass);

  // Scroll tracking
  let lastScrollY = window.scrollY;

  const updateLocation = () => {
    const midY = window.innerHeight / 2 + window.scrollY;

    let currentPlace = sortedPlaces[0];
    const sections = document.querySelectorAll('section');
    sections.forEach((sec, i) => {
      if (midY >= sec.offsetTop) {
        currentPlace = sortedPlaces[i];
      }
    });

    // Update location indicator
    locationIndicator.textContent = `${currentPlace.name}\n${currentPlace.latitude}, ${currentPlace.longitude}`;
    locationIndicator.style.color = currentPlace.color;
    locationIndicator.href = `https://www.google.com/maps?q=${currentPlace.latitude},${currentPlace.longitude}`;

    // Update compass
    if (window.scrollY > lastScrollY) {
      compass.textContent = 'S';
    } else if (window.scrollY < lastScrollY) {
      compass.textContent = 'N';
    }
    lastScrollY = window.scrollY;
  };

  window.addEventListener('scroll', updateLocation);
  updateLocation();
};
