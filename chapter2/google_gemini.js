function findRectangles(matrix) {
  const rectangles = [];
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (matrix[y][x] === 0) {
        let topLeftX = x;
        let topLeftY = y;
        let bottomRightX = x;
        let bottomRightY = y;

        // Find bottom right corner
        while (bottomRightX + 1 < cols && matrix[y][bottomRightX + 1] === 0) {
          bottomRightX++;
        }
        while (bottomRightY + 1 < rows && matrix[bottomRightY + 1][x] === 0) {
          bottomRightY++;
        }

        // Check if it's a rectangle (not a single 0)
        if (bottomRightX > topLeftX && bottomRightY > topLeftY) {
          rectangles.push([topLeftX, topLeftY, bottomRightX, bottomRightY]);
        }

        // Mark visited cells to avoid duplicates
        for (let i = topLeftY; i <= bottomRightY; i++) {
          for (let j = topLeftX; j <= bottomRightX; j++) {
            matrix[i][j] = -1; // Or any other value different from 0 and 1
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
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const input2 = [
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 0, 0],
  [1, 0, 0, 1, 1, 0, 0],
];

console.log(findRectangles(input1)); // [[2, 2, 4, 3]]
console.log(findRectangles(input2)); // [[0, 0, 0, 0], [2, 2, 4, 3], [5, 0, 5, 1], [5, 5, 6, 6]]
