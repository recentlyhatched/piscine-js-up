export const compose = () => {
  document.addEventListener('keydown', (event) => {
    const body = document.body;

    // Lowercase letter: create a note
    if (event.key >= 'a' && event.key <= 'z') {
      const div = document.createElement('div');
      div.className = 'note';
      div.textContent = event.key;

      // Unique background color based on key code
      const code = event.key.charCodeAt(0);
      const hue = (code * 137) % 360; // generate hue from key
      div.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;

      body.appendChild(div);
    }

    // Backspace: remove last note
    if (event.key === 'Backspace') {
      const notes = document.querySelectorAll('.note');
      const last = notes[notes.length - 1];
      if (last) last.remove();
    }

    // Escape: clear all notes
    if (event.key === 'Escape') {
      const notes = document.querySelectorAll('.note');
      notes.forEach(note => note.remove());
    }
  });
};
