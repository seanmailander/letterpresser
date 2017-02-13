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

export function randomGameBoard() {
  const boardSize = 25;
  return range(boardSize).map(() => String.fromCharCode(randBetween(65, 90))).join('');
}
