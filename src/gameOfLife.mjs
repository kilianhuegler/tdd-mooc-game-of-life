export function nextGeneration(liveCells) {
  const nextGen = new Set();
  for (const cell of liveCells) {
    let count = 0;
    const [x, y] = cell.split(",").map(Number);
    for (const otherCells of liveCells) {
      if (otherCells === cell) {
        continue;
      }
      const [otherX, otherY] = otherCells.split(",").map(Number);
      if (Math.abs(x - otherX) <= 1 && Math.abs(y - otherY) <= 1) {
        count++;
      }
    }
    if (count === 2 || count === 3) {
      nextGen.add(cell);
    }
  }
  return nextGen;
}
