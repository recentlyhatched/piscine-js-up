import { gossips } from './gossip-grid.data.js';

export const grid = () => {
  // --- RANGES UI (top) ---
  const rangesDiv = document.createElement('div');
  rangesDiv.className = 'ranges';
  document.body.appendChild(rangesDiv);

  const makeLabeledRange = (id, min, max, initial, unit, labelText) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'range-wrapper';

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = `${labelText}: `;

    const spanVal = document.createElement('span');
    spanVal.className = 'range-value';
    spanVal.textContent = `${initial}${unit}`;
    label.appendChild(spanVal);

    const input = document.createElement('input');
    input.type = 'range';
    input.id = id;
    input.className = 'range';
    input.min = min;
    input.max = max;
    input.value = initial;

    input.addEventListener('input', () => {
      spanVal.textContent = `${input.value}${unit}`;
      applyStyles();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return { wrapper, input, spanVal };
  };

  const widthCtrl = makeLabeledRange('width', 200, 800, 600, 'px', 'Width');
  const fontSizeCtrl = makeLabeledRange('fontSize', 20, 40, 20, 'px', 'Text size');
  const bgCtrl = makeLabeledRange('background', 20, 75, 75, '%', 'Background');

  rangesDiv.append(widthCtrl.wrapper, fontSizeCtrl.wrapper, bgCtrl.wrapper);

  // --- GOSSIP CONTAINER ---
  const container = document.createElement('div');
  container.className = 'gossip-grid';
  document.body.appendChild(container);

  // --- FORM CARD (first .gossip) ---
  const formCard = document.createElement('div');
  formCard.className = 'gossip';

  const form = document.createElement('form');
  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Share your gossip...';
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Share gossip!';

  form.append(textarea, submitBtn);
  formCard.appendChild(form);
  container.appendChild(formCard); // form is first child

  // --- helper to create a gossip card ---
  const createGossipCard = (text) => {
    const card = document.createElement('div');
    card.className = 'gossip';
    card.textContent = text;
    return card;
  };

  // --- Add initial gossips AFTER the form, keeping order ---
  gossips.forEach((g) => container.appendChild(createGossipCard(g)));

  // --- function to insert a new gossip BEFORE the form (becomes first) ---
  const addNewGossipAtTop = (text) => {
    const newCard = createGossipCard(text);
    container.insertBefore(newCard, container.firstChild);
    applyStyles();
  };

  // --- Form submit handler ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const txt = textarea.value.trim();
    if (!txt) return;
    addNewGossipAtTop(txt);
    textarea.value = '';
  });

  // --- apply styles ---
  function applyStyles() {
    const cards = container.querySelectorAll('.gossip');
    cards.forEach((card) => {
      // Ensure computed width matches slider exactly
      card.style.boxSizing = 'border-box';
      card.style.display = 'block';
      card.style.width = `${widthCtrl.input.value}px`;

      // Font size and background only for gossip posts (skip form internals)
      if (!card.querySelector('form')) {
        card.style.fontSize = `${fontSizeCtrl.input.value}px`;
        card.style.background = `hsl(280, 50%, ${bgCtrl.input.value}%)`;
      }
    });
  }

  // Initialize visuals
  applyStyles();
};
