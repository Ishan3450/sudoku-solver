const inputFields = document.querySelectorAll("input");
const solveFullBtn = document.getElementById("solve-full-btn");
const solveCellBtn = document.getElementById("solve-cell-btn");
const checkFullBtn = document.getElementById("check-full-btn");
const checkCellBtn = document.getElementById("check-cell-btn");
const resetBtn = document.getElementById("reset-btn");
const instructionsField = document.getElementById("instructions");

// let grid = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [2, 2, 2, 2, 2, 2, 2, 2, 2],
//   [3, 3, 3, 3, 3, 3, 3, 3, 3],
//   [4, 4, 4, 4, 4, 4, 4, 4, 4],
//   [5, 5, 5, 5, 5, 5, 5, 5, 5],
//   [6, 6, 6, 6, 6, 6, 6, 6, 6],
//   [7, 7, 7, 7, 7, 7, 7, 7, 7],
//   [8, 8, 8, 8, 8, 8, 8, 8, 8],
// ];

let grid = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
];

function handleKeyUp(event, i) {
  if (i + 1 <= 81 && event.key >= "0" && event.key <= "9") {
    let destination = inputFields[i].id.split("-");
    let row = destination[1],
      col = destination[2];
    grid[row][col] = inputFields[i].value;

    // after storing the value transfer the focus to the next input field only if it is not the very last cell
    if (i + 1 < 81) {
      inputFields[i + 1].focus();
    }
  } else {
    inputFields[i].value = "";
  }
}

function handleKeyDown(event, i) {
  if (
    event.key >= "0" &&
    event.key <= "9" &&
    inputFields[i].value.length >= 1
  ) {
    inputFields[i].value = "";
  }
}

function init() {
  // * adding event listners to the input fields
  for (let i = 0; i < 81; i++) {
    inputFields[i].addEventListener("keydown", (event) => {
      handleKeyDown(event, i);
    });

    inputFields[i].addEventListener("keyup", (event) => {
      handleKeyUp(event, i);
    });
  }

  // * adding ids corresponding to the row and col
  // format: cell-{row}-{col}
  let idx = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      inputFields[idx++].setAttribute("id", `col-${row}-${col}`);
    }
  }
}

function updateUI() {
  let idx = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      inputFields[idx++].value = grid[row][col] == -1 ? "" : grid[row][col];
    }
  }
}

function resetGrid() {
  let idx = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      grid[row][col] = -1;
      inputFields[idx++].value = "";
    }
  }
}

resetBtn.addEventListener("click", resetGrid);

//
init();

/* Main algorithm code starts here */

function getFocusedField() {
  let idx = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (document.activeElement === inputFields[idx]) {
        const splitted = inputFields[idx].id.split("-");
        return {
          row: splitted[1],
          col: splitted[2],
          value: inputFields[idx].value,
          index: idx,
        };
      }
      idx++;
    }
  }
  return -1;
}

function solveSudoku() {}

function solveCell(row, col, idx) {
  for(let val = 0; val <= 9; val ++){
    if(checkCell(row, col, idx, val)){
      grid[row][col] = val;
      inputFields[idx].value = val;
      instructionsField.textContent = `Cell R${Number(row)+1}-C${Number(col)+1} solved with value ${val}`;
      return;
    }
  }
  instructionsField.textContent = "Cell not solved, change previous cells";
}

solveCellBtn.addEventListener('mousedown', () => {
  const field =  getFocusedField();
  solveCell(field.row, field.col, field.index);
})

function checkSudoku() {}

function checkCell(row, col, value) {
  // check curr row
  for (let c = 0; c < 9; c++) {
    if (c != col && grid[row][c] == value) {
      return false;
    }
  }

  // check curr col
  for (let r = 0; r < 9; r++) {
    if (r != row && grid[r][col] == value) {
      return false;
    }
  }

  // check curr matrix of size 3x3
  let rowStart = row - (row % 3);
  let colStart = col - (col % 3);

  for (let r = rowStart; r < rowStart + 3; r++) {
    for (let c = colStart; c < colStart + 3; c++) {
      if (r != row && c != col && grid[r][c] == value) {
        return false;
      }
    }
  }

  return true;
}

checkCellBtn.addEventListener("mousedown", () => {
  // getFocusedFieldIdx() returns the focused field's object or -1 is not focused any
  const field = getFocusedField();

  if (field !== -1) {
    let ans = checkCell(field.row, field.col, field.value);

    if (ans) {
      instructionsField.textContent = `Cell R${Number(field.row)+1}-C${Number(field.col)+1} contains valid value`
    } else {
      instructionsField.textContent = `Cell R${Number(field.row)+1}-C${Number(field.col)+1} contains an invalid value`
    }
  }
});
