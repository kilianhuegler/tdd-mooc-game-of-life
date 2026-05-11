import { describe, test } from "vitest";
import { expect } from "chai";
import { parseRle } from "../src/rle.mjs";

describe("rle", () => {
  test("single live cell", () => {
    const rle = "x = 1, y = 1\no!";

    expect(parseRle(rle)).to.deep.equal(new Set(["0,0"]));
  });
});
