import { cartesianProductWithoutDuplicates, getCanonicalFromMove, range } from './util.js';

export const LetterState = {
  Unclaimed: 1,
  Player1: 2,
  Player2: 4,
  Locked: 8,
};

export const StartingBoardState = range(25).map(() => LetterState.Unclaimed);

export function getWordFromBoardPositions(board, positions) {
  return positions.map(boardPosition => board[boardPosition]).join('');
}

export function getValidMovesFromWord(board, word) {
  // board is a string of 25 characters
  // word is a string of 3-25 characters
  // return a complete list of unique ways of playing word on board
  const boardArray = board.split('');

  const getBoardIndexesOfLetter = wordLetter =>
    boardArray
      .map((boardLetter, index) => [boardLetter, index])
      .filter(([boardLetter, index]) => boardLetter === wordLetter)
      .map(([boardLetter, index]) => index);

  const boardPositionsWithMatchingLetters = word.split('')
    .map(letter => getBoardIndexesOfLetter(letter));

  const moves = cartesianProductWithoutDuplicates(boardPositionsWithMatchingLetters, getCanonicalFromMove);

  return moves;
}

export function rankMoves(board, moves) {
  // TODO: add ranking

  return moves;
}

export function applyMoveToBoard(boardState, currentMove, isPlayer1) {
    // Map this move onto board positions
  return boardState.map((currentPositionValue, currentPosition) => {
      // Current move contains this board position
    const isPartOfCurrentMove = currentMove.includes(currentPosition);
      // Apply new owner of board position
    return !isPartOfCurrentMove ? currentPositionValue :
          isPlayer1 ? LetterState.Player1 :
            LetterState.Player2;
  });
}

export function applyMovesToBoard(startingBoardState, moveStream) {
  return moveStream.reduce((boardState, currentMove, currentIndex) => {
    // First move is player 1
    const isPlayer1 = currentIndex % 2 === 0;

    // Map this move onto board positions
    return applyMoveToBoard(boardState, currentMove, isPlayer1);
  }, startingBoardState);
}


export function applyLockingToBoard(boardState) {
  // for each known adjactent
  //  if
  const adjacents = [
    [1, 5],         // 0:0
    [0, 2, 6],       // 0:1
    [1, 3, 7],       // 0:2
    [2, 4, 8],       // 0:3
    [3, 9],         // 0:4
    [0, 6, 10],      // 1:0
    [1, 5, 7, 11],    // 1:1
    [2, 6, 8, 12],    // 1:2
    [3, 7, 9, 13],    // 1:3
    [4, 8, 14],      // 1:4
    [5, 11, 15],     // 2:0
    [6, 10, 12, 16],  // 2:1
    [7, 11, 13, 17],  // 2:2
    [8, 12, 14, 18],  // 2:3
    [9, 13, 19],     // 2:4
    [10, 16, 20],    // 3:0
    [11, 15, 17, 21], // 3:1
    [12, 16, 18, 22], // 3:2
    [13, 17, 19, 23], // 3:3
    [14, 18, 24],    // 3:4
    [15, 21],       // 4:0
    [16, 20, 22],    // 4:1
    [17, 21, 23],    // 4:2
    [18, 22, 24],    // 4:3
    [19, 23],       //4:4
  ];
  return adjacents.map((adjacentPositions, currentPosition) => {
    const isLocked = adjacentPositions.every(position => (boardState[position] | boardState[currentPosition]) === boardState[currentPosition]);
    return boardState[currentPosition] | (isLocked ? LetterState.Locked : null);
  });
}

export function isGameOver(board) {
  // If every position is claimed, game is over
  return board.every(position => (position | LetterState.Unclaimed) !== LetterState.Unclaimed);
}

export function boardAnalysis(board) {
  const lockedBoard = applyLockingToBoard(board);
  const numberOfPlayer1Squares = board.filter(position => (position | LetterState.Player1) === LetterState.Player1).length;
  const numberOfPlayer1Locks = lockedBoard.filter(position => (position | LetterState.Player1 | LetterState.Locked) === (LetterState.Player1 | LetterState.Locked)).length;
  const numberOfPlayer2Squares = board.filter(position => (position | LetterState.Player2) === LetterState.Player2).length;
  const numberOfPlayer2Locks = lockedBoard.filter(position => (position | LetterState.Player2 | LetterState.Locked) === (LetterState.Player2 | LetterState.Locked)).length;
  const numberOfUnclaimedSquares = board.filter(position => (position | LetterState.Unclaimed) === LetterState.Unclaimed).length;
  if (numberOfUnclaimedSquares === 0) {
    // Endgame, all squares claimed, count whomever has more
    console.error('WTFMATE, found a winner');
    return numberOfPlayer1Squares > numberOfPlayer2Squares ? Infinity : -Infinity;
  }
  // TODO: build board analysis
  return (((numberOfPlayer1Locks * 10) + numberOfPlayer1Squares) - ((numberOfPlayer2Locks * 10) + numberOfPlayer2Squares)) + Math.random();
}
