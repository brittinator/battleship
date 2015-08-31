$(document).ready(function(){

  /* Stores the board info
    0 for empty
    1 for ship
    H  when hit
    M for miss
  */
  var board = [];

  // Stores the locations of the ships
  var ships = [];

  // Current number of ships
  var shipNum = 2;

  // Size of the board
  var boardSize = 10;

  // Bool indicating whether or not game is over
  var gameOver = false;

  // Number of ship hits
  var hits = 0;

  // Number of guesses
  var guesses = 0;

  initializeGame();

  function initializeGame(){
    generateRandomBoard();
    printBoard();
  }

  function generateRandomBoard(){
    // Add some random ships
    var shipsAdded = 0;
    while (shipsAdded < shipNum) {
      var randomVal = Math.floor(Math.random() * (boardSize - 1));
      if (ships.indexOf(randomVal) < 0) { // Not already one of the ships
        ships.push(randomVal);
        shipsAdded++;
      }
    }

    // Set the board values based on ships added
    for(var j = 0; j < boardSize; j++) {
      if (ships.indexOf(j) < 0) { // This location not a ship
        board[j] = 0;   // Empty
      } else {
        board[j] = 1;   // Ship!
      }
    }
  }

  function printBoard() {
    var boardOut = "";
    for(var i = 0; i < boardSize; i++) {
      boardOut += board[i];
    }
    $("#board").text(boardOut);
  }

  function endGame(type) {
    gameOver = true;
    var endGame = $('#end-game');
    if (type == 'win') {
      endGame.text("!!!!!! Congratulations!");
    } else if (type == 'lose') {
      endGame.text("You Lose. Try Again Soon!");
    } else {
      endGame.text("How Did you get here??");
    }
    // ADDED FUN: Disable submit button
    console.log("End game");
  }

  // CLICK HANDLERS
  $("#submit").click(userGuess);

  function userGuess(){
    // Retrieve the guess from the input box
    var guess = $('#guess').val();
    var feedback = $('#guess-result')
    console.log(guess);
    // Reset the guess input box
    $('#guess').val('');
    // Verify the guess is in a valid range
    guess < boardSize ? console.log('ok') :  alert("Please enter a valid number");
    // Check if the guess matches one of our ships locations
    if (board[guess] == 1) {
    // If it does, mark is as a HIT
      console.log("HIT!!");
      feedback.text('Hit!');
      hits += 1;
      board[guess] = 'H';
    } else {
    // If it doesn't, mark it as a MISS
      console.log("TRY AGAIN!");
      feedback.text("Miss");
      board[guess] = 'M';
    }

    guesses += 1;
    // Continue gameplay
    // Redraw the board if it has changed
    printBoard();
    // Tell the user how many guesses they've made
    $('#guess-count').text("Num guesses: " + guesses);
    // NOTE: How does the game end?
    if (ships.length == hits) {
      endGame('win');
    }
    if ((boardSize - shipNum) == guesses) {
      endGame('lose');
    }
  }
});
