import { describe, test } from "vitest";
import { expect } from "chai";
import { parseRle, toRle } from "../src/rle.mjs";
import { readFileSync } from "fs";

function cellsToAscii(cells, widthX, heightY) {
  const rows = [];
  for (let y = 0; y < heightY; y++) {
    let row = "";
    for (let x = 0; x < widthX; x++) {
      row += cells.has(`${x},${y}`) ? "O" : ".";
    }
    rows.push(row);
  }
  return rows.join("\n");
}

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
  });

  test("read rle pattern from file and parse it", () => {
    const rle = readFileSync("rle-patterns/2enginecordership.rle", "utf8");
    const cells = parseRle(rle);

    const expected =
      "...................OO....................\n" +
      "...................OOOO..................\n" +
      "...................O.OO..................\n" +
      ".........................................\n" +
      "....................O....................\n" +
      "...................OO....................\n" +
      "...................OOO...................\n" +
      ".....................O...................\n" +
      ".................................OO......\n" +
      ".................................OO......\n" +
      ".........................................\n" +
      ".........................................\n" +
      ".........................................\n" +
      ".........................................\n" +
      ".........................................\n" +
      ".........................................\n" +
      "....................................O....\n" +
      "...................................OO....\n" +
      "..................................O...O..\n" +
      "...................................OO..O.\n" +
      "........................................O\n" +
      ".....................................O.O.\n" +
      "......................................O..\n" +
      "......................................O..\n" +
      "......................................OO.\n" +
      "......................................OO.\n" +
      ".........................................\n" +
      ".........................................\n" +
      ".............O..........O................\n" +
      "............OOOOO.....O.OO...........O...\n" +
      "...........O..........O...O.........O....\n" +
      "............OO........OOO.O.........OO...\n" +
      ".............OO.........OO............O..\n" +
      "OO.............O.....................OOO.\n" +
      "OO...................................OOO.\n" +
      ".........................................\n" +
      ".........................................\n" +
      ".........................................\n" +
      ".........................................\n" +
      ".........................................\n" +
      ".........................................\n" +
      "........OO...............................\n" +
      "........OO...........OO..................\n" +
      "...................OO..O.................\n" +
      "........................O...O............\n" +
      "..................O.....O...O............\n" +
      "...................O..OO...O.O...........\n" +
      "....................OOO.....O............\n" +
      "............................O............";

    expect(cellsToAscii(cells, 41, 49)).to.equal(expected);
  });
});

describe("RLE Generator", () => {
  test("single live cell", () => {
    const cells = new Set(["0,0"]);

    expect(toRle(cells)).to.equal("x = 1, y = 1, rule = B3/S23\no!");
  });

  test("two live cells in one row", () => {
    const cells = new Set(["0,0", "1,0"]);

    expect(toRle(cells)).to.equal("x = 2, y = 1, rule = B3/S23\n2o!");
  });

  test("two live cells in multiple rows", () => {
    const cells = new Set(["0,0", "1,0", "0,1", "1,1"]);

    expect(toRle(cells)).to.equal("x = 2, y = 2, rule = B3/S23\n2o$2o!");
  });

  test("dead cells between live cells", () => {
    const cells = new Set(["0,0", "2,0"]);

    expect(toRle(cells)).to.equal("x = 3, y = 1, rule = B3/S23\nobo!");
  });

  test("multiple consecutive live cells", () => {
    const cells = new Set(["0,0", "1,0", "2,0", "3,0"]);

    expect(toRle(cells)).to.equal("x = 4, y = 1, rule = B3/S23\n4o!");
  });

  test("trailing dead cells are skipped", () => {
    const cells = new Set(["0,0", "0,1", "1,1"]);

    expect(toRle(cells)).to.equal("x = 2, y = 2, rule = B3/S23\no$2o!");
  });

  test("compress empty rows", () => {
    const cells = new Set(["0,0", "0,3"]);

    expect(toRle(cells)).to.equal("x = 1, y = 4, rule = B3/S23\no3$o!");
  });
});
