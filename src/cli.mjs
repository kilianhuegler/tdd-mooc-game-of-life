import { parseRle, toRle } from "./rle.mjs";
import { nextGeneration} from "./gameOfLife.mjs";

export function cliSimulate(input, generation) {
  let cells = parseRle(input);
  for (let i = 0; i < generation; i++) {
    cells = nextGeneration(cells);
  }
  return toRle(cells);
}