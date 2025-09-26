import { styles } from "./pimp-my-style.data.js";

let step = 0;
let removing = false;

export const pimp = () => {
  const btn = document.querySelector(".button");
  if (!btn) return;

  if (!removing) {
    // ADDING phase
    btn.classList.add(styles[step]);
    step++;

    if (step === styles.length) {
      // next click will start removing
      removing = true;
    }
  } else {
    // REMOVING phase
    if (step === styles.length) {
      // first removal: toggle unpimp on
      btn.classList.add("unpimp");
    }

    step--;
    btn.classList.remove(styles[step]);

    if (step === 0) {
      // finished removing: toggle unpimp off and reset
      btn.classList.remove("unpimp");
      removing = false;
    }
  }
};
