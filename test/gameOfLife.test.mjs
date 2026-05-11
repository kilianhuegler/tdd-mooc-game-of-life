import { describe, test } from "vitest";
import { expect } from "chai";
import { nextGeneration } from "../src/gameOfLife.mjs";

describe("Game of Life - Overpopulation", () => {
  test("live cell with no live neighbour dies", () => {
    const before = new Set(["0,0"]);
    const after = nextGeneration(before);

    expect(after).to.deep.equal(new Set());
  });

  test.skip("live cell with 1 live neighbour dies", () => {
    const before = new Set(["0,0", "0,1"]);
    const after = nextGeneration(before);

    expect(after).to.deep.equal(new Set());
  });
});
