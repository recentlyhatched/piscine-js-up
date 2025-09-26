import { styles } from "./pimp-my-style.data.js"

export const pimp = () => {
  const button = document.querySelector(".button");
  const applied = styles.filter(cls => button.classList.contains(cls));
  const nextIndex = applied.length;

  // If still adding styles
  if (nextIndex < styles.length) {
    button.classList.add(styles[nextIndex]);
    button.classList.remove("unpimp"); // stop unpimping while adding
  } else {
    // LIFO: remove last added class
    button.classList.remove(applied[applied.length - 1]);
    button.classList.add("unpimp");
  }
};
