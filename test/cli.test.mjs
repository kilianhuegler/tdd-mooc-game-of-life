import { describe, test } from "vitest";
import { expect } from "chai";
import { cliSimulate } from "../src/cli.mjs";

describe("CLI simulation", () => {
  test("pattern with zero generations", () => {
    const pattern = "x = 1, y = 1, rule = B3/S23\no!";

    expect(cliSimulate(pattern, 0)).equal("x = 1, y = 1, rule = B3/S23\no!");
  })
})