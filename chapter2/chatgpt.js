function findRectangles(input) {
    const rectangles = [];
    const numRows = input.length;
    const numCols = input[0].length;

    // Helper function to check if a cell is within bounds and contains a zero
    function isValidCell(row, col) {
        return row >= 0 && row < numRows && col >= 0 && col < numCols && input[row][col] === 0;
    }

    // Helper function to perform depth-first search to find all cells in a rectangle
    function dfs(row, col, rect) {
        if (!isValidCell(row, col)) return;
        input[row][col] = 1; // Marking cell as visited
        rect[0] = Math.min(rect[0], col); // Update top left X
        rect[1] = Math.min(rect[1], row); // Update top left Y
        rect[2] = Math.max(rect[2], col); // Update bottom right X
        rect[3] = Math.max(rect[3], row); // Update bottom right Y

        // Check adjacent cells
        dfs(row + 1, col, rect); // Down
        dfs(row - 1, col, rect); // Up
        dfs(row, col + 1, rect); // Right
        dfs(row, col - 1, rect); // Left
    }

    // Iterate through each cell
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (input[i][j] === 0) {
                const rectangle = [j, i, j, i]; // Initialize rectangle [top left X, top left Y, bottom right X, bottom right Y]
                dfs(i, j, rectangle); // Perform depth-first search to find all cells in the rectangle
                rectangles.push(rectangle);
            }
        }
    }

    return rectangles;
}

// Example arrays
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

console.log(findRectangles(input1));
console.log(findRectangles(input2));
