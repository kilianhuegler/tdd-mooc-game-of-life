export function parseRle(input) {
  const liveCells = new Set();
  const line = input.split("\n")[1];

  let x = 0;
  let y = 0;
  for (const character of line) {
    if (character === "o") {
      liveCells.add(`${x},${y}`);
      x++;
    } else if (character === "b") {
      x++;
    } else if (character === "$") {
      x = 0;
      y++;
    }
  }

  return liveCells;
}
