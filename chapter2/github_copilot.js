function findRectangles(matrix) {
   const rectangles = [];
   const rows = matrix.length;
   const cols = matrix[0].length;

   for (let i = 0; i < rows; i++) {
       for (let j = 0; j < cols; j++) {
           if (matrix[i][j] === 0) {
               let topLeftX = j;
               let topLeftY = i;
               let bottomRightX = j;
               let bottomRightY = i;

               // Find the bottom right corner of the rectangle
               while (bottomRightX + 1 < cols && matrix[i][bottomRightX + 1] === 0) {
                   bottomRightX++;
               }
               while (bottomRightY + 1 < rows && matrix[bottomRightY + 1][j] === 0) {
                   bottomRightY++;
               }

               rectangles.push([topLeftX, topLeftY, bottomRightX, bottomRightY]);
           }
       }
   }

   return rectangles;
}

const input1 = [
   [1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 0, 0, 0, 1],
   [1, 1, 1, 0, 0, 0, 1],
   [1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1]
];

const input2 = [
   [0, 1, 1, 1, 1, 1, 0],
   [1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 0, 0, 0, 1],
   [1, 1, 1, 0, 0, 0, 1],
   [1, 1, 1, 1, 1, 1, 1],
   [1, 0, 0, 1, 1, 1, 1],
   [1, 0, 0, 1, 1, 0, 0],
   [1, 0, 0, 1, 1, 0, 0]
];

const rectangles1 = findRectangles(input1);
const rectangles2 = findRectangles(input2);

console.log(rectangles1);
console.log(rectangles2);
