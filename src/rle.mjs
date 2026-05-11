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

function compress(row) {
  let result = "";
  let count = 1;

  for (let i = 1; i < row.length; i++) {
    if (row[i] === row[i - 1]) {
      count++;
    } else {
      if (count === 1) {
        result += row[i - 1];
      } else {
        result += count + row[i - 1];
      }
      count = 1;
    }
  }

  if (count === 1) {
    result += row[row.length - 1];
  } else {
    result += count + row[row.length - 1];
  }

  return result;
}

export function toRle(liveCells) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const cell of liveCells) {
    const [x, y] = cell.split(",").map(Number);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  const rows = [];

  for (let y = minY; y <= maxY; y++) {
    let row = "";
    for (let x = minX; x <= maxX; x++) {
      if (liveCells.has(`${x},${y}`)) {
        row += "o";
      } else {
        row += "b";
      }
    }
    rows.push(compress(row));
  }

  return `x = ${maxX - minX + 1}, y = ${maxY - minY + 1}, rule = B3/S23\n${rows.join("\n")}!`;
}
