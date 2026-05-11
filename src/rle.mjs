export function parseRle(input) {
  const liveCells = new Set();
  const lines = input.split("\n")[1];

  let x = 0;
  for (const line of lines) {
    if (line === "o") {
      liveCells.add(`${x},0`);
      x++;
    } else if (line === "b") {
      x++;
    }
  }

  return liveCells;
}
