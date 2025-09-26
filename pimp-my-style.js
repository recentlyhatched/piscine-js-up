import { styles } from "./pimp-my-style.data.js";

let step = 0;
let removing = false;

export const pimp = () => {
  const btn = document.querySelector(".button");

  if (!btn) return;

  // start removing when we've added all styles
  if (step === styles.length) {
    removing = true;
    btn.classList.toggle("unpimp", true); // turn unpimp on
  }

  // finished removing, reset
  if (removing && step === 0) {
    removing = false;
    btn.classList.toggle("unpimp", false); // turn unpimp off
  }

  if (!removing) {
    // add next style
    btn.classList.add(styles[step]);
    step++;
  } else {
    // remove last style (LIFO)
    step--;
    btn.classList.remove(styles[step]);
  }
};
