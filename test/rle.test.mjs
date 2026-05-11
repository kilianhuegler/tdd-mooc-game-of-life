import { describe, test } from "vitest";
import { expect } from "chai";
import { parseRle } from "../src/rle.mjs";

describe("RLE Parser", () => {
  test("single live cell", () => {
    const rle = "x = 1, y = 1\no!";

    expect(parseRle(rle)).to.deep.equal(new Set(["0,0"]));
  });

  test("multiple live cells", () => {
    const rle = "x = 3, y = 1\nooo!";

    expect(parseRle(rle)).to.deep.equal(new Set(["0,0", "1,0", "2,0"]));
  })

  test("dead cells", () => {
    const rle = "x = 3, y = 1\nbob!";

    expect(parseRle(rle)).to.deep.equal(new Set(["1,0"]));
  });
});
