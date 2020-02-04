/*
 * Tic Tac Toe the game
 *
 * @author   Fernando Moreira <nandomoreira.me@gmail.com>
 * @license  MIT
 */

window.TicTacToe = {
  $boardElement: null,
  $boardCellsElements: null,
  winnerCombinations: [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8],
  ],
  boardCells: [...Array(9)].fill(''),
  playersMoves: { O: [], X: [] },
  isGameOver: false,
  isFirstMove: true,
  player: 'X',
  restartButton: '<button role="button" class="game__button" onclick="TicTacToe.restart();">Restart game</button>',

  changePlayer() {
    this.player = this.player === 'X' ? 'O' : 'X';
  },

  addPlayerMove(movement) {
    this.playersMoves[this.player].push(Number(movement));
  },

  checkIsGameOver() {
    const currentPlayerMoves = this.playersMoves[this.player];

    if (currentPlayerMoves.length >= 3) {
      this.isGameOver = this.winnerCombinations
        .some((combination) => combination
          .every((moves) => currentPlayerMoves.indexOf(moves) !== -1));

      if (this.isGameOver) this.end(`Player <strong>${this.player}</strong> is winner!!`);
    }
  },

  play({ target }) {
    const { position } = target.dataset;

    if (this.isGameOver || this.boardCells[position] !== '') return;

    this.boardCells[position] = this.player;

    this.isFirstMove = !this.boardCells.filter((e) => e !== '').length;

    this.draw();
    this.addPlayerMove(position);
    this.checkIsGameOver();
    this.changePlayer();
  },

  start() {
    this.draw();
  },

  restart() {
    this.player = 'X';
    this.isFirstMove = true;
    this.isGameOver = false;
    this.playersMoves = { O: [], X: [] };
    this.boardCells = this.boardCells.fill('');
    document.querySelector('.game__over').remove();
    this.draw();
  },

  end(htmlMsg = '') {
    const $elem = document.createElement('div');
    $elem.classList.add('game__over');
    $elem.innerHTML = `<p>GAME OVER!<br/>${htmlMsg}<br/>${this.restartButton}</p>`;
    document.body.appendChild($elem);
  },

  getCellsHtml() {
    const cellClass = this.isFirstMove ? 'x' : `${this.player === 'X' ? 'o' : 'x'}`;

    return this.boardCells
      .map((el, i) => `<span class="${el ? 'active-move' : `${cellClass}-player`}" data-cell data-position="${i}">${el}</span>`)
      .reduce((content, current) => content + current);
  },

  draw() {
    if (this.$boardElement) {
      this.$boardElement.innerHTML = this.getCellsHtml();
      this.$boardCellsElements = document.querySelectorAll('[data-cell]');
      this.$boardCellsElements.forEach((cell) => {
        cell.removeEventListener('click', this.play);
        cell.addEventListener('click', this.play.bind(this), { once: true });
      });
    }
  },

  init(el) {
    this.$boardElement = el;

    if (!this.isGameOver) {
      return this.start();
    }

    return this.end();
  },
};
