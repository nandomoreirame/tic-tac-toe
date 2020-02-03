const TicTacToe = {
  winners: [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6]
    [0,4,8],
  ],

  startGame: function() {
    console.info('start the game!');
  },

  endGame: function() {
    console.info('game over!');
  },

  init: function() {
    this.startGame();
    this.endGame();
  },
};
