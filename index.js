var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var EMPTY_SPACE = "-";

function getMove(player, board, cb) {
  var question = "Player " + player + ", please type a number from 1 to 9 to make your move: ";
  rl.question(question, function(answer) {
    var move = parseInt(answer);
    if (isNaN(move)) {
      console.log("You must enter a number between 1 and 9");
      getMove(player, board, cb);
    } else if (board[move] !== EMPTY_SPACE) {
      console.log("That space is already taken");
      getMove(player, board, cb);
    } else {
      cb(move);
    }
  });
};

function createBoard() {
  var board = [];
  for (var i = 1; i < 10; i++) {
    board[i] = EMPTY_SPACE;
  }

  return board;
};

var otherPlayer = { "x": "o", "o": "x" };
var board = createBoard();
var currentPlayer = "x";
function tick() {
  printBoard(board);

  getMove(currentPlayer, board, function(move) {
    board[move] = currentPlayer;

    var winner = getWinner(board);
    if (winner !== undefined) {
      console.log(winner + " is the winner!");
      printBoard(board);
      process.exit(0);
    } else {
      currentPlayer = otherPlayer[currentPlayer];
      tick();
    }
  });
};

var winningLines = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // horizontal
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // vertical
  [1, 5, 9], [3, 5, 7] // diagonal
];

function printBoard(board) {
  console.log();
  board.forEach(function(move, i) {
    process.stdout.write(move + " ");
    if (i % 3 === 0) {
      console.log();
    }
  });

  console.log();
};

function isLineComplete(player, line, board) {
  return line.map(function(i) { return board[i]; })
    .filter(function(move) { return move === player; })
    .length === line.length;
};

function getWinner(board) {
  for (var i = 0 ; i < winningLines.length; i++) {
    if (isLineComplete("x", winningLines[i], board)) {
      return "x"
    } else if (isLineComplete("o", winningLines[i], board)) {
      return "o";
    }
  };
};

tick();
