export function parseRle(input) {
  const liveCells = new Set();
  const lines = input.split("\n");

  let patternData = "";
  for (const line of lines) {
    if (line.startsWith("#")) continue;
    if (line.includes("=")) continue;
    patternData += line;
  }

  let x = 0;
  let y = 0;
  let number = "";

  for (const character of patternData) {
    if (character >= "0" && character <= "9") {
      number += character;
    } else {
      let numberLength;
      if (number === "") {
        numberLength = 1;
      } else {
        numberLength = parseInt(number);
      }
      number = "";

      if (character === "o") {
        for (let i = 0; i < numberLength; i++) {
          liveCells.add(`${x},${y}`);
          x++;
        }
      } else if (character === "b") {
        x++;
      } else if (character === "$") {
        x = 0;
        y++;
      }
    }
  }

  return liveCells;
}
