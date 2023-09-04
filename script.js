const inputFields = document.querySelectorAll("input");

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
  [-1, -1, -1, -1, -1, -1, -1, -1, -1]
];

// function init() {
//     let idxForFields = 0
//     for(let row = 0; row < 9; row ++){
//         for(let col = 0; col < 9; col ++){
//             inputFields[idxForFields++].value = grid[row][col];
//         }
//     }
// }
// init();

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

function handleKeyUp(event, i) {
  if (i + 1 <= 81 && (event.key >= "0" && event.key <= "9")) {
    let destination = inputFields[i].id.split("-");
    let row = destination[1], col = destination[2];
    grid[row][col] = inputFields[i].value;
    console.log(grid);

    // after storing the value transfer the focus to the next input field only if it is not the very last cell
    if(i+1 < 81){
        inputFields[i + 1].focus();
    }
  } else{
    inputFields[i].value = "";
  }
}

function handleKeyDown(event, i) {
  // console.log(isKeyDigit(event) + " for " + event.key);
  if ((event.key >= "0" && event.key <= "9") && inputFields[i].value.length >= 1) {
    inputFields[i].value = "";
  }
}

//
init();
