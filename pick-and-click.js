export const pick = () => {
  // Create display elements
  const hslDiv = document.createElement('div');
  hslDiv.className = 'hsl';
  hslDiv.style.position = 'absolute';
  hslDiv.style.top = '50%';
  hslDiv.style.left = '50%';
  hslDiv.style.transform = 'translate(-50%, -50%)';
  document.body.appendChild(hslDiv);

  const hueDiv = document.createElement('div');
  hueDiv.className = 'hue';
  hueDiv.style.position = 'absolute';
  hueDiv.style.top = '10px';
  hueDiv.style.right = '10px';
  document.body.appendChild(hueDiv);

  const luminosityDiv = document.createElement('div');
  luminosityDiv.className = 'luminosity';
  luminosityDiv.style.position = 'absolute';
  luminosityDiv.style.bottom = '10px';
  luminosityDiv.style.left = '10px';
  document.body.appendChild(luminosityDiv);

  // Create SVG for crosshairs
  let svg = document.querySelector('svg#crosshair');
  if (!svg) {
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', 'crosshair');
    svg.setAttribute('style', 'position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;');
    document.body.appendChild(svg);

    const axisX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axisX.setAttribute('id', 'axisX');
    axisX.setAttribute('stroke', 'black');
    axisX.setAttribute('stroke-width', '1');
    svg.appendChild(axisX);

    const axisY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axisY.setAttribute('id', 'axisY');
    axisY.setAttribute('stroke', 'black');
    axisY.setAttribute('stroke-width', '1');
    svg.appendChild(axisY);
  }

  const axisX = document.getElementById('axisX');
  const axisY = document.getElementById('axisY');

  const updateColor = (e) => {
    const { clientX: x, clientY: y } = e;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const hue = Math.round((x / width) * 360);
    const luminosity = Math.round(100 - (y / height) * 100); // top is 100% lum, bottom 0%

    const hsl = `hsl(${hue}, 50%, ${luminosity}%)`;

    // Update body background
    document.body.style.backgroundColor = hsl;

    // Update displays
    hslDiv.textContent = hsl;
    hueDiv.textContent = `Hue: ${hue}`;
    luminosityDiv.textContent = `Lum: ${luminosity}`;

    // Update SVG crosshairs
    axisX.setAttribute('x1', x);
    axisX.setAttribute('x2', x);
    axisX.setAttribute('y1', 0);
    axisX.setAttribute('y2', height);

    axisY.setAttribute('x1', 0);
    axisY.setAttribute('x2', width);
    axisY.setAttribute('y1', y);
    axisY.setAttribute('y2', y);
  };

  document.addEventListener('mousemove', updateColor);

  document.addEventListener('click', () => {
    const text = hslDiv.textContent;
    navigator.clipboard.writeText(text).then(() => {
      console.log(`Copied to clipboard: ${text}`);
    });
  });
};
