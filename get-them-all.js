// get all architects (<a>) and non-architects
export const getArchitects = () => {
  const architects = Array.from(document.querySelectorAll("a"));
  const nonArchitects = Array.from(document.querySelectorAll("span"));
  return [architects, nonArchitects];
};

// split architects into classical and non-classical
export const getClassical = () => {
  const [architects] = getArchitects();
  const classical = architects.filter(el => el.classList.contains("classical"));
  const nonClassical = architects.filter(el => !el.classList.contains("classical"));
  return [classical, nonClassical];
};

// split classical architects into active and non-active
export const getActive = () => {
  const [classical] = getClassical();
  const active = classical.filter(el => el.classList.contains("active"));
  const nonActive = classical.filter(el => !el.classList.contains("active"));
  return [active, nonActive];
};

// get Bonanno Pisano and the rest of the active classical architects
export const getBonannoPisano = () => {
  const [active] = getActive();
  const bonanno = active.find(el => el.id === "BonannoPisano");
  const others = active.filter(el => el.id !== "BonannoPisano");
  return [bonanno, others];
};
