// 1. Build the tower
export const build = (count) => {
  let i = 1;
  const interval = setInterval(() => {
    if (i > count) {
      clearInterval(interval);
      return;
    }

    const brick = document.createElement("div");
    brick.id = `brick-${i}`;

    // determine column: 1-left, 2-middle, 3-right
    const column = (i - 1) % 3;
    if (column === 1) {
      brick.dataset.foundation = "true"; // middle column
    }

    document.body.appendChild(brick);
    i++;
  }, 100);
};

// 2. Repair bricks
export const repair = (...ids) => {
  ids.forEach((id) => {
    const brick = document.getElementById(id);
    if (!brick) return;

    if (brick.dataset.foundation === "true") {
      brick.dataset.repaired = "in progress";
    } else {
      brick.dataset.repaired = "true";
    }
  });
};

// 3. Destroy last brick
export const destroy = () => {
  const bricks = document.querySelectorAll("div[id^='brick-']");
  const lastBrick = bricks[bricks.length - 1];
  if (lastBrick) {
    lastBrick.remove();
  }
};
