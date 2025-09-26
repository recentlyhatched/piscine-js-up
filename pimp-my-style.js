import { styles } from "./pimp-my-style.data.js";

let step = 0;
let removing = false;

export const pimp = () => {
  const btn = document.querySelector(".button");

  if (!btn) return;

  if (!removing) {
    // still adding styles
    btn.classList.add(styles[step]);
    step++;

    // when all styles added, next click will start removing
    if (step === styles.length) {
      removing = true;
    }
  } else {
    // first time we remove, turn on unpimp
    if (step === styles.length) {
      btn.classList.toggle("unpimp", true);
    }

    // remove last style
    step--;
    btn.classList.remove(styles[step]);

    // finished removing all styles
    if (step === 0) {
      removing = false;
      btn.classList.toggle("unpimp", false);
    }
  }
};
