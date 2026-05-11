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
        x += numberLength;
      } else if (character === "$") {
        x = 0;
        y += numberLength;
      }
    }
  }

  return liveCells;
}

export function toRle(liveCells) {
  let maxX = 0;
  let maxY = 0;

  for (const cell of liveCells) {
    const [x, y] = cell.split(",").map(Number);
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  const rows = [];

  for (let y = 0; y <= maxY; y++) {
    let row = "";
    for (let x = 0; x <= maxX; x++) {
      if (liveCells.has(`${x},${y}`)) {
        row += "o";
      } else {
        row += "b";
      }
    }
    rows.push(row);
  }

  return `x = ${maxX + 1}, y = ${maxY + 1}, rule = B3/S23\n${rows.join("\n")}!`;
}
