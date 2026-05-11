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
  });

  test("dead cells", () => {
    const rle = "x = 3, y = 1\nbob!";

    expect(parseRle(rle)).to.deep.equal(new Set(["1,0"]));
  });

  test("$ moves to the next line", () => {
    const rle = "x = 1, y = 2\no$o!";

    expect(parseRle(rle)).to.deep.equal(new Set(["0,0", "0,1"]));
  });

  test("$ moves to the next line (2x2 block)", () => {
    const rle = "x = 2, y = 2\noo$oo!";

    expect(parseRle(rle)).to.deep.equal(new Set(["0,0", "1,0", "0,1", "1,1"]));
  });

  test("read number prefix from pattern multiple rows", () => {
    const rle = "x = 2, y = 2\n2o$2o!";

    expect(parseRle(rle)).to.deep.equal(new Set(["0,0", "1,0", "0,1", "1,1"]));
  });

  test("read number prefix from pattern single row", () => {
    const rle = "x = 2, y = 1\n2o!";

    expect(parseRle(rle)).to.deep.equal(new Set(["0,0", "1,0"]));
  });

  test("ignore # comment lines in rle", () => {
    const rle =
      "#N 2.2.4.rle\n" +
      "#C https://conwaylife.com/wiki/2.2.4\n" +
      "#C https://www.conwaylife.com/patterns/2.2.4.rle\nx =1, y = 1\no!";

    expect(parseRle(rle)).to.deep.equal(new Set(["0,0"]));
  });

  test("rle pattern with multiple lines", () => {
    const rle = "x = 4, y = 1\noo\noo!";

    expect(parseRle(rle)).to.deep.equal(new Set(["0,0", "1,0", "2,0", "3,0"]));
    }
  )
});
