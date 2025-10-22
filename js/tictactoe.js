// JS Port of my C++ Version
// as close to original as JS allows, plus some better additions

let board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];
let playerTurn = "X";
let gameOver = false;

//create game board from above
const boardDiv = document.getElementById("board");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

function renderBoard() {
  boardDiv.innerHTML = "";
  for (let r = 2; r >= 0; r--) { 
    for (let c = 0; c < 3; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = board[r][c];
      cell.onclick = () => makeMove(r, c);
      boardDiv.appendChild(cell);
    }
  }
}

function makeMove(row, col) {
  if (gameOver || board[row][col] !== " ") return;

  board[row][col] = playerTurn;
  if (checkWin(playerTurn)) {
    statusDiv.textContent = playerTurn === "X"
      ? "Congrats man, you got me this time!"
      : "Can't even beat me on an off day, c'mon man.";
    gameOver = true;
  } else if (checkTie()) {
    statusDiv.textContent = "We call this a Cat's game in Kentucky.";
    gameOver = true;
  } else {
    playerTurn = playerTurn === "X" ? "O" : "X";
    if (playerTurn === "O") computerMove();
  }
  renderBoard();
}

function computerMove() {
  // win
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === " ") {
        board[r][c] = "O";
        if (checkWin("O")) return endTurn();
        board[r][c] = " ";
      }
    }
  }

  // block
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === " ") {
        board[r][c] = "X";
        if (checkWin("X")) {
          board[r][c] = "O";
          return endTurn();
        }
        board[r][c] = " ";
      }
    }
  }

  // take center (lesser priority to other two)
  if (board[1][1] === " ") {
    board[1][1] = "O";
    return endTurn();
  }

  //corner, same as above
  const corners = [[0,0],[0,2],[2,0],[2,2]];
  for (const [r, c] of corners) {
    if (board[r][c] === " ") {
      board[r][c] = "O";
      return endTurn();
    }
  }

  // take any open spot, if none loop finishes
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === " ") {
        board[r][c] = "O";
        return endTurn();
      }
    }
  }
}

function endTurn() {
  if (checkWin("O")) {
    statusDiv.textContent = "Can't even beat me on an off day, c'mon man.";
    gameOver = true;
  } else if (checkTie()) {
    statusDiv.textContent = "We call this a Cat's game in Kentucky.";
    gameOver = true;
  } else {
    playerTurn = "X";
  }
  renderBoard();
}

function checkWin(p) {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === p && board[i][1] === p && board[i][2] === p) return true;
    if (board[0][i] === p && board[1][i] === p && board[2][i] === p) return true;
  }
  return (
    (board[0][0] === p && board[1][1] === p && board[2][2] === p) ||
    (board[0][2] === p && board[1][1] === p && board[2][0] === p)
  );
}

function checkTie() {
  return board.every(row => row.every(cell => cell !== " "));
}

resetBtn.onclick = () => {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];
  playerTurn = "X";
  gameOver = false;
  statusDiv.textContent = "";
  renderBoard();
};

renderBoard();
