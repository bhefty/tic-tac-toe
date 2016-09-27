'use strict';

// Initialize variables
var gamePlay = document.getElementById('number-players');
var pvc = document.getElementById('pvc');
var pvp = document.getElementById('pvp');
var isAI = false;
var aiBoard = document.getElementById('ai-board');
var pvpBoard = document.getElementById('pvp-board');
var playingTable = document.getElementById('playing-table');
var startContainer = document.getElementById('start-container');
var messageContainer = document.getElementById('message-container');
var message = document.getElementById('message');
var playAgainButton = document.getElementById('play-again');
var scorecard = document.getElementById('scorecard-container');
var resetContainer = document.getElementById('reset-container');
var resetButton = document.getElementById('reset');
var player1Turn = document.getElementById('player1-container');
var player2Turn = document.getElementById('player2-container');
var player1Score = document.getElementById('player1-score');
var player2Score = document.getElementById('player2-score');
var player1Name = document.getElementById('player1-name');
var player2Name = document.getElementById('player2-name');
var player2TurnTag = document.getElementById('player2-turn');
var tieGames = document.getElementById('tie-games')
var player1Wins = 0;
var player2Wins = 0;
var tieNum = 0;
var players = [null, null];
var whoseTurn;
var winner;
var x = document.getElementById('playerX');
var o = document.getElementById('playerO');
// For toggling player turns
var click_track = 1;

// Initialize grid secions
var s1 = document.getElementById('s1'),
  s2 = document.getElementById('s2'),
  s3 = document.getElementById('s3'),
  s4 = document.getElementById('s4'),
  s5 = document.getElementById('s5'),
  s6 = document.getElementById('s6'),
  s7 = document.getElementById('s7'),
  s8 = document.getElementById('s8'),
  s9 = document.getElementById('s9');
var squares = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
];

// Choose gameplay style
pvc.onclick = function() {
  hideGameplay();
  isAI = true;
  hidePVPBoard();
  showAIBoard();
  showStartScreen();
}

pvp.onclick = function() {
  hideGameplay();
  isAI = false;
  hideAIBoard();
  showPVPBoard();
  showStartScreen();
}

// Assign players based on first mark clicked
x.onclick = function() {
  if (players[0] === null) {
    players[0] = 'x';
    players[1] = 'o';
    whoseTurn = players[0];
    hideStartScreen();
    showGameBoard();
    showScorecard();
    if (!isAI) {
      player2TurnTag.innerHTML = "Player 2";
      player2Name.innerHTML = "Player 2";
      playGame();
    } else {
      player2TurnTag.innerHTML = "Computer";
      player2Name.innerHTML = "Computer";
      playAI();
    }
  }
};

// Assign players based on first mark clicked
o.onclick = function() {
  if (players[0] === null) {
    players[0] = 'o';
    players[1] = 'x';
    whoseTurn = players[0];
    hideStartScreen();
    showGameBoard();
    showScorecard();
    if (!isAI) {
      player2TurnTag.innerHTML = "Player 2";
      player2Name.innerHTML = "Player 2";
      playGame();
    } else {
      player2TurnTag.innerHTML = "Computer";
      player2Name.innerHTML = "Computer";
      playAI();
    }
  }
}

// Show and Hide functions for sections of the gameboard
// Show gameplay selection
function showGameplay() {
  Velocity(gamePlay, 'fadeIn', {
    duration: 750
  });
}

// Hide gameplay selection
function hideGameplay() {
  Velocity(gamePlay, 'fadeOut', {
    duration: 750
  });
}

// Show gameboard
function showGameBoard() {
  Velocity(playingTable, 'fadeIn', {
    duration: 1500
  });
}

// Show start screen
function showStartScreen() {
  startContainer.style.visibility = "visible";
  Velocity(startContainer, 'fadeIn', {
    duration: 100
  });
}

// Hide start screen
function hideStartScreen() {
  Velocity(startContainer, 'fadeOut', {
    duration: 500
  });
}

// Show AI Gameboard
function showAIBoard() {
  aiBoard.style.visibility = "visible";
  Velocity(aiBoard, 'fadeIn', {
    duration: 100
  });
}

// Hide AI Gameboard
function hideAIBoard() {
  Velocity(aiBoard, 'fadeOut', {
    duration: 500
  });
  aiBoard.style.visibility = "hidden";
}

// Show PVP Gameboard
function showPVPBoard() {
  pvpBoard.style.visibility = "visible";
  Velocity(pvpBoard, 'fadeIn', {
    duration: 100
  });
}

// Hide PVP Gameboard
function hidePVPBoard() {
  Velocity(pvpBoard, 'fadeOut', {
    duration: 500
  });
  pvpBoard.style.visibility = "hidden";
}

// Show scorecard
function showScorecard() {
  scorecard.style.visibility = "visible";
  Velocity(scorecard, {
    top: ['35%', 'easeInSine', '100%']
  }, {
    duration: 500
  });
  showReset();
}

// Hide scorecard
function hideScorecard() {
  Velocity(scorecard, {
    top: ['100%', 'easeInSine', '35%']
  }, {
    duration: 500
  });
  hideReset();
}

// Show reset
function showReset() {
  resetContainer.style.visibility = "visible";
  Velocity(resetContainer, {
    top: ['35%', 'easeInSine', '100%']
  }, {
    duration: 500
  });
}

// Hide reset
function hideReset() {
  Velocity(resetContainer, {
    top: ['100%', 'easeInSine', '35%']
  }, {
    duration: 500
  });
}

// Reset game on click
function reset() {
  // Reset initial values
  player1Wins = 0;
  player2Wins = 0;
  tieNum = 0;
  player1Score.innerHTML = 0;
  player2Score.innerHTML = 0;
  tieGames.innerHTML = 0;
  players = [null, null];
  whoseTurn = "";
  winner = "";
  isAI = false;
  click_track = 1;

  squares = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ];

  // Blank the squares
  s1.innerHTML = "";
  s2.innerHTML = "";
  s3.innerHTML = "";
  s4.innerHTML = "";
  s5.innerHTML = "";
  s6.innerHTML = "";
  s7.innerHTML = "";
  s8.innerHTML = "";
  s9.innerHTML = "";

  // Start game from beginning
  hidePlayer1Turn();
  hidePlayer2Turn();
  hideStartScreen();
  hideMessage();
  showGameplay();
}

resetButton.onclick = function() {
  reset();
};

// Play again after win
function playAgain() {
  // Reset initial values
  if (!isAI) {
    players = [null, null];
    whoseTurn = "";
    winner = "";

    squares = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ];

    // Blank the squares
    s1.innerHTML = "";
    s2.innerHTML = "";
    s3.innerHTML = "";
    s4.innerHTML = "";
    s5.innerHTML = "";
    s6.innerHTML = "";
    s7.innerHTML = "";
    s8.innerHTML = "";
    s9.innerHTML = "";
  } else {
    players = [null, null];
    winner = "";
  }
  // Start game from beginning
  click_track = 1;
  hideMessage();
  showStartScreen();
}

playAgainButton.onclick = function() {
  playAgain();
}

// Show player 1 turn flag
function showPlayer1Turn() {
  player1Turn.style.visibility = "visible";
  Velocity(player1Turn, {
    left: ['50%', 'easeInSine', '0%']
  }, {
    duration: 500
  });
}

// Hide player 1 turn flag
function hidePlayer1Turn() {
  Velocity(player1Turn, {
    left: ['0%', 'easeInSine', '50%']
  }, {
    duration: 500
  });
}

// Show player 2 turn flag
function showPlayer2Turn() {
  player2Turn.style.visibility = "visible";
  Velocity(player2Turn, {
    left: ['50%', 'easeInSine', '100%']
  }, {
    duration: 500
  });
}

// Hide player 2 turn flag
function hidePlayer2Turn() {
  Velocity(player2Turn, {
    left: ['100%', 'easeInSine', '50%']
  }, {
    duration: 500
  });
}

// Show game over message
function showMessage() {
  player1Turn.style.visibility = "hidden";
  player2Turn.style.visibility = "hidden";
  messageContainer.style.visibility = "visible";
  Velocity(messageContainer, 'fadeIn', {
    duration: 500
  });
  if (winner !== "Draw") {
    message.innerHTML = winner + " wins!";
  } else if (winner === "Draw") {
    message.innerHTML = winner;
  }
}

// Hide game over message
function hideMessage() {
  Velocity(messageContainer, 'fadeOut', {
    duration: 500
  });
}

// Increase win count
function playerWinCount(mark) {
  if (mark === players[0]) {
    player1Wins++;
    player1Score.innerHTML = player1Wins;
  } else if (mark === players[1]) {
    player2Wins++;
    player2Score.innerHTML = player2Wins;
  } else if (mark === "Draw") {
    tieNum++;
    tieGames.innerHTML = tieNum;
  }
}

// Visually toggle between player turns
function togglePlayer() {
  if (click_track == 1) {
    hidePlayer2Turn();
    showPlayer1Turn();
  } else if (click_track == 2) {
    hidePlayer1Turn();
    showPlayer2Turn();
    click_track = 0;
  }
  click_track++;
}

// Gameplay logic
function playGame() {

  togglePlayer(); // Initial trigger to set player 1 as first

  // Check click events
  function clickEvent(area, el) {
    if (area.innerHTML === '') {
      togglePlayer();
      if (whoseTurn === players[0]) {
        area.innerHTML = players[0];
        squares[el] = players[0];
        checkWin();
        whoseTurn = players[1];
      } else if (whoseTurn === players[1]) {
        area.innerHTML = players[1];
        squares[el] = players[1];
        checkWin();
        whoseTurn = players[0];
      }
    }
  }

  // Respond to clicks in squares
  s1.onclick = function() {
    clickEvent(s1, 0);
  };

  s2.onclick = function() {
    clickEvent(s2, 1);
  };

  s3.onclick = function() {
    clickEvent(s3, 2);
  };

  s4.onclick = function() {
    clickEvent(s4, 3);
  };

  s5.onclick = function() {
    clickEvent(s5, 4);
  };

  s6.onclick = function() {
    clickEvent(s6, 5);
  };

  s7.onclick = function() {
    clickEvent(s7, 6);
  };

  s8.onclick = function() {
    clickEvent(s8, 7);
  };

  s9.onclick = function() {
    clickEvent(s9, 8);
  };

  // Check for a winner
  function checkWin() {
    if ((squares[0] == squares[1] && squares[0] == squares[2]) && squares[0] !== null) { // top row
      console.log("top row win");
      winner = squares[0];
      showMessage();
      playerWinCount(winner);
    } else if ((squares[3] == squares[4] && squares[3] == squares[5]) && squares[3] !== null) { // Check mid row
      console.log("mid row win");
      winner = squares[3];
      showMessage();
      playerWinCount(winner);
    } else if ((squares[6] == squares[7] && squares[6] == squares[8]) && squares[6] !== null) { // Check bottom row
      console.log("bottom row win");
      winner = squares[6];
      showMessage();
      playerWinCount(winner);
    } else if ((squares[0] == squares[3] && squares[0] == squares[6]) && squares[0] !== null) { // Check left col
      console.log("left col win");
      winner = squares[0];
      showMessage();
      playerWinCount(winner);
    } else if ((squares[1] == squares[4] && squares[1] == squares[7]) && squares[1] !== null) { // Check mid col
      console.log("mid col win");
      winner = squares[1];
      showMessage();
      playerWinCount(winner);
    } else if ((squares[2] == squares[5] && squares[2] == squares[8]) && squares[2] !== null) { // Check right col
      console.log("right col win");
      winner = squares[2];
      showMessage();
      playerWinCount(winner);
    } else if ((squares[0] == squares[4] && squares[0] == squares[8]) && squares[0] !== null) { // Check left/-right down diag
      console.log("left-right down diag win");
      winner = squares[0];
      showMessage();
      playerWinCount(winner);
    } else if ((squares[6] == squares[4] && squares[6] == squares[2]) && squares[6] !== null) { // Check left/-right up diag
      console.log("left-right up diag win");
      winner = squares[6];
      showMessage();
      playerWinCount(winner);
    } else { // Test for draw
      var count = 0;
      for (var i = 0; i < squares.length; i++) {
        if (squares[i] !== null) {
          count++;
        }
      }
      if (count === 9) {
        winner = "Draw";
        showMessage();
        playerWinCount(winner);
      }
    }
  }

}

function playAI() {

  var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  var myMove = false;
  var gameWon = false;

  if (myMove) {
    makeMove();
  }

  var c00 = document.getElementById("c00");
  var c01 = document.getElementById("c01");
  var c02 = document.getElementById("c02");
  var c10 = document.getElementById("c10");
  var c11 = document.getElementById("c11");
  var c12 = document.getElementById("c12");
  var c20 = document.getElementById("c20");
  var c21 = document.getElementById("c21");
  var c22 = document.getElementById("c22");

  c00.onclick = function() {
    clicked(c00);
  }
  c01.onclick = function() {
    clicked(c01);
  }
  c02.onclick = function() {
    clicked(c02);
  }
  c10.onclick = function() {
    clicked(c10);
  }
  c11.onclick = function() {
    clicked(c11);
  }
  c12.onclick = function() {
    clicked(c12);
  }
  c20.onclick = function() {
    clicked(c20);
  }
  c21.onclick = function() {
    clicked(c21);
  }
  c22.onclick = function() {
    clicked(c22);
  }

  function clicked(button) {
    var cell = button.getAttribute('id');
    var row = parseInt(cell[1]);
    var col = parseInt(cell[2]);
    if (board[row][col] == null && (board[row][col] !== true || board[row][col] !== false)){
    togglePlayer();
    if (!myMove) {
      board[row][col] = false;
      myMove = true;
      updateMove();
      if (!gameWon) {
        makeMove();
      }
    }
    }
  }

  function updateMove() {
    updateButtons();
    var winnerVal = getWinner(board);
    if (winnerVal == 1) {
      gameWon = true;
      showMessage();
      message.innerHTML = "Computer<br>Won!";
      playerWinCount(players[1]);
    } else if (winnerVal == 0) {
      gameWon = true;
      showMessage();
      message.innerHTML = "You<br>Won!";
      playerWinCount(players[0]);
    } else if (winnerVal == -1) {
      gameWon = true;
      showMessage();
      message.innerHTML = "Tie!";
      playerWinCount("Draw");
    } else {
      message.innerHTML = "";
    }

  }

  function getWinner(board) {
    // Check if someone won
    var vals = [true, false];
    var allNotNull = true;
    for (var k = 0; k < vals.length; k++) {
      var value = vals[k];

      // Check rows, columns, and diagonals
      var diagonalComplete1 = true;
      var diagonalComplete2 = true;
      for (var i = 0; i < 3; i++) {
        if (board[i][i] != value) {
          diagonalComplete1 = false;
        }
        if (board[2 - i][i] != value) {
          diagonalComplete2 = false;
        }
        var rowComplete = true;
        var colComplete = true;
        for (var j = 0; j < 3; j++) {
          if (board[i][j] != value) {
            rowComplete = false;
          }
          if (board[j][i] != value) {
            colComplete = false;
          }
          if (board[i][j] == null) {
            allNotNull = false;
          }
        }
        if (rowComplete || colComplete) {
          return value ? 1 : 0;
        }
      }
      if (diagonalComplete1 || diagonalComplete2) {
        return value ? 1 : 0;
      }
    }
    if (allNotNull) {
      return -1;
    }
    return null;
  }

  function updateButtons() {
    if (!myMove) {
      togglePlayer();
    }
    var cellEl;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        cellEl = 'c' + i + '' + j;
        var cellButton = document.getElementById(cellEl);
        cellButton.innerHTML = board[i][j] == false ? players[0] : board[i][j] == true ? players[1] : "";
      }
    }
  }

  function makeMove() {
    board = minimaxMove(board);
    console.log('numNodes: ' + numNodes);
    myMove = false;
    updateMove();
  }

  function minimaxMove(board) {
    numNodes = 0;
    return recurseMinimax(board, true)[1];
  }

  var numNodes = 0;

  function recurseMinimax(board, player) {
    numNodes++;
    var winnerVal = getWinner(board);
    if (winnerVal != null) {
      switch (winnerVal) {
        case 1:
          // AI wins
          return [1, board];
        case 0:
          // opponent wins
          return [-1, board];
        case -1:
          // Tie
          return [0, board];
      }

    } else {
      // Next states
      var nextVal = null;
      var nextBoard = null;

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (board[i][j] == null) {
            board[i][j] = player;
            var value = recurseMinimax(board, !player)[0];
            if ((player && (nextVal == null || value > nextVal)) || (!player && (nextVal == null || value < nextVal))) {
              nextBoard = board.map(function(arr) {
                return arr.slice();
              });
              nextVal = value;
            }
            board[i][j] = null;
          }
        }
      }
      return [nextVal, nextBoard];
    }
  }

  updateMove();

}
