import { colors } from './fifty-shades-of-cold.data.js';

export const generateClasses = () => {
  const style = document.createElement('style');
  style.textContent = colors
    .map(color => `.${color} { background: ${color}; }`)
    .join('\n');
  document.head.appendChild(style);
};

export const generateColdShades = () => {
  const coldKeywords = ['aqua', 'blue', 'turquoise', 'green', 'cyan', 'navy', 'purple'];
  
  colors.forEach(color => {
    if (coldKeywords.some(keyword => color.includes(keyword))) {
      const div = document.createElement('div');
      div.className = color;
      div.textContent = color;
      div.addEventListener('click', () => choseShade(color));
      document.body.appendChild(div);
    }
  });
};

export const choseShade = (shade) => {
  const divs = document.querySelectorAll('div');
  divs.forEach(div => {
    div.className = shade; // update all divs regardless
  });
};
