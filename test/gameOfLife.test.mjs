import { describe, test } from "vitest";
import { expect } from "chai";
import { nextGeneration } from "../src/gameOfLife.mjs";

describe("Game of Life - Underpopulation", () => {
  test("live cell with no live neighbour dies", () => {
    const before = new Set(["0,0"]);
    const after = nextGeneration(before);

    expect(after).to.deep.equal(new Set());
  });

  test("live cell with 1 live neighbour dies", () => {
    const before = new Set(["0,0", "0,1"]);
    const after = nextGeneration(before);

    expect(after.has("0,0")).to.be.false;
    expect(after.has("0,1")).to.be.false;
  });
});

describe("Game of Life - Survival", () => {
  test("live cell with 2 live neighbours survives", () => {
    const before = new Set(["0,0", "0,1", "0,2"]);
    const after = nextGeneration(before);

    expect(after.has("0,1")).to.be.true;
  });

  test("live cell with 3 live neighbours survives", () => {
    const before = new Set(["0,0", "0,1", "1,0", "1,1"]);
    const after = nextGeneration(before);

    expect(after.has("0,0")).to.be.true;
  });
});

describe("Game of Life - Overpopulation", () => {
  test("live cell with 4 live neighbours dies", () => {
    const before = new Set(["1,0", "0,1", "1,1", "2,1", "1,2"]);
    const after = nextGeneration(before);

    expect(after.has("1,1")).to.be.false;
  });

  test("live cell with 8 live neighbours dies", () => {
    const before = new Set(["0,0", "1,0", "2,0", "0,1", "1,1", "2,1", "0,2", "1,2", "2,2"]);
    const after = nextGeneration(before);

    expect(after.has("1,1")).to.be.false;

    expect(after.has("1,0")).to.be.false;
    expect(after.has("0,1")).to.be.false;
    expect(after.has("2,1")).to.be.false;
    expect(after.has("1,2")).to.be.false;

    expect(after.has("0,0")).to.be.true;
    expect(after.has("2,0")).to.be.true;
    expect(after.has("0,2")).to.be.true;
    expect(after.has("2,2")).to.be.true;
  });
});

describe("Game of Life - Reproduction", () => {
  test("dead cell with 3 live neighbours becomes live", () => {
    const before = new Set(["0,0", "0,1", "1,0"]);
    const after = nextGeneration(before);

    expect(after.has("1,1")).to.be.true;
  });

  test("dead cell with 2 live neighbours stays dead", () => {
    const before = new Set(["0,0", "0,1"]);
    const after = nextGeneration(before);

    expect(after.has("1,0")).to.be.false;
    }
  )
});

describe("Game of Life - Integration test", () => {
  test("Blinker test", () => {
    const horizontal = new Set(["0,1", "1,1", "2,1"]);
    const vertical = new Set(["1,0", "1,1", "1,2"]);

    expect(nextGeneration(horizontal)).to.deep.equal(vertical);
    expect(nextGeneration(vertical)).to.deep.equal(horizontal);
  });
});
