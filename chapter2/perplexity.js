function findRectangles(inputArray) {
  const rectangles = [];
  const rows = inputArray.length;
  const cols = inputArray[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (inputArray[i][j] === 0) {
        let x1 = j;
        let y1 = i;
        let x2 = j;
        let y2 = i;

        while (x2 + 1 < cols && inputArray[i][x2 + 1] === 0) {
          x2++;
        }

        let isRectangle = true;
        for (let y = y1; y <= y2; y++) {
          for (let x = x1; x <= x2; x++) {
            if (inputArray[y][x] !== 0) {
              isRectangle = false;
              break;
            }
          }
          if (!isRectangle) {
            break;
          }
        }

        if (isRectangle) {
          rectangles.push([x1, y1, x2, y2]);
          for (let y = y1; y <= y2; y++) {
            for (let x = x1; x <= x2; x++) {
              inputArray[y][x] = 1;
            }
          }
        }
      }
    }
  }

  return rectangles;
}

// Example usage
const input1 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const input2 = [
   [0,   ,   ,   ,   ,   ,   ],
   [   ,   ,   ,   ,   ,   ,   ],
   [   ,   ,   ,   ,   ,   ,   ],
   [   ,   ,   ,   ,   ,   ,   ],
];

console.log(findRectangles(inputArray));
