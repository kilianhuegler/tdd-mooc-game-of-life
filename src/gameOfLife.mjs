export function nextGeneration(liveCells) {
  const neighborhood = new Set();
  for (const cell of liveCells) {
    const [x, y] = cell.split(",").map(Number);
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        neighborhood.add(`${i},${j}`);
      }
    }
  }

  const nextGen = new Set();
  for (const cell of neighborhood) {
    let neighbour_count = 0;
    const [x, y] = cell.split(",").map(Number);
    for (const otherCells of liveCells) {
      if (otherCells === cell) {
        continue;
      }
      const [otherX, otherY] = otherCells.split(",").map(Number);
      if (Math.abs(x - otherX) <= 1 && Math.abs(y - otherY) <= 1) {
        neighbour_count++;
      }
    }
    const cellIsAlive = liveCells.has(cell);
    if ((neighbour_count === 2 || neighbour_count === 3) && cellIsAlive) {
      nextGen.add(cell);
    } else if (!cellIsAlive && neighbour_count === 3) {
      nextGen.add(cell);
    }
  }
  return nextGen;
}
