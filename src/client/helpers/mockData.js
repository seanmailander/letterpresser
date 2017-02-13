export function range(size) { return [...Array(size).keys()]; }

export function randBetween(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

export function randomMoves() {
  const numberOfMoves = 10;
  const minLetters = 3;
  const maxLetters = 12;

  return range(numberOfMoves).map(() => {
    const lettersInThisMove = randBetween(minLetters, maxLetters);
    return range(lettersInThisMove).map(() => randBetween(0, 25)).join(',');
  });
}

export function randomizeGameBoard() {
  const boardSize = 25;
  return range(boardSize).map(() => String.fromCharCode(randBetween(65, 90))).join('');
}

export function randomMovesFromWords(board, words) {
  const numberOfMoves = 6;

  return range(numberOfMoves)
    .map(() => words[randBetween(0, words.length)].split('')
      .map(letter => board.indexOf(letter)).join(','));
}
