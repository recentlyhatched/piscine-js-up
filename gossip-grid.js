import { gossips } from './gossip-grid.data.js';

export const grid = () => {
  // --- RANGES UI (top) ---
  const rangesDiv = document.createElement('div');
  rangesDiv.className = 'ranges';

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
  document.body.appendChild(rangesDiv);

  // --- GOSSIP CONTAINER ---
  const container = document.createElement('div');
  container.className = 'gossip-grid';
  container.style.margin = '20px auto';
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
  const addInitialGossips = () => {
    gossips.forEach((g) => {
      const card = createGossipCard(g);
      container.appendChild(card); // append after form
    });
  };

  addInitialGossips();

  // --- function to insert a new gossip BEFORE the form (so it becomes first) ---
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

  // --- apply styles (width, font-size, background) ---
  function applyStyles() {
    // Apply width to all gossip cards (including the form card)
    const cards = container.querySelectorAll('.gossip');
    cards.forEach((card) => {
      card.style.width = `${widthCtrl.input.value}px`;
    });

    // Apply font size and background to gossip posts (skip the form's internal layout)
    cards.forEach((card) => {
      // If this card contains the form element, don't overwrite its internal layout
      if (card.querySelector('form')) {
        // optionally set width only (already set above), skip font/background
        return;
      }
      card.style.fontSize = `${fontSizeCtrl.input.value}px`;
      card.style.background = `hsl(280, 50%, ${bgCtrl.input.value}%)`;
    });

    // Keep the container centered (optional)
    container.style.width = `${widthCtrl.input.value}px`;
    container.style.margin = '0 auto';
  }

  // Initialize visuals
  applyStyles();
};
