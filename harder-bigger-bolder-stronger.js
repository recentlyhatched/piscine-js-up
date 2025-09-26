export const generateLetters = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const total = 120;
  const minSize = 11;
  const maxSize = 130;

  for (let i = 0; i < total; i++) {
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const div = document.createElement("div");
    div.textContent = letter;

    // font size: scale linearly from minSize → maxSize
    const fontSize = minSize + (i / (total - 1)) * (maxSize - minSize);
    div.style.fontSize = `${fontSize}px`;

    // font weight: 300 for first 1/3, 400 for second 1/3, 600 for last 1/3
    if (i < total / 3) {
      div.style.fontWeight = "300";
    } else if (i < (2 * total) / 3) {
      div.style.fontWeight = "400";
    } else {
      div.style.fontWeight = "600";
    }

    document.body.appendChild(div);
  }
};
