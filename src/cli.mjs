import { parseRle, toRle } from "./rle.mjs";
import { nextGeneration } from "./gameOfLife.mjs";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

export function cliSimulate(input, generation) {
  let cells = parseRle(input);
  for (let i = 0; i < generation; i++) {
    cells = nextGeneration(cells);
  }
  return toRle(cells);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const filePath = process.argv[2];
  const generation = parseInt(process.argv[3]);
  const file = readFileSync(filePath, "utf8");
  console.log(cliSimulate(file, generation));
}
