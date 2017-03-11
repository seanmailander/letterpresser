import { cartesianProductWithoutDuplicates, getCanonicalFromMove, range } from './util';

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

function applyMoveToBoard(boardState, currentMove, isPlayer1) {
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

function isGameOver(board) {
  // If every position is claimed, game is over
  return board.every(position => (position | LetterState.Unclaimed) !== LetterState.Unclaimed);
}

function boardAnalysis(board) {
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
  return ((numberOfPlayer1Locks * 10) + numberOfPlayer1Squares) - ((numberOfPlayer2Locks * 10) + numberOfPlayer2Squares);
}

const maxDepth = 4;
const sign = [1, -1];
function negaMax(currentBoard, depth, color, alpha, beta, playedWords, getMoves, lastPlayedWord, validWords, moveHashtable) {
  const indent = range(depth).map(() => ' ');

  if (isGameOver(currentBoard) || depth > maxDepth) {
    // console.log(`${indent} Found a leaf: ${JSON.stringify(playedWords)} ${JSON.stringify(sign[color] * boardAnalysis(currentBoard))} `);
    return sign[color] * Math.floor(boardAnalysis(currentBoard) / 10);
  }

  let currentMax = -Infinity;
  const { moves, remainingValidWords } = getMoves(lastPlayedWord, validWords);

  const lastFive = [];
  const foundAlpha = moves.find(({ word: currentWord, move: currentMove }) => {
    const boardAfterMove = applyMoveToBoard(currentBoard.slice(0), currentMove, color === 0);

    playedWords.push(currentWord);
    const currentWordScorekeeper = {
      word: currentWord,
      move: currentMove,
      moves: [],
      score: null,
    };
    const bestNextScore = -negaMax(boardAfterMove, depth + 1, 1 - color, -beta, -alpha, playedWords.slice(0), getMoves, currentWord, remainingValidWords,
    currentWordScorekeeper.moves);

    lastFive.unshift(bestNextScore);
    if (lastFive.length > 2) {
      lastFive.pop();
    }
    if (lastFive.every(score => score < currentMax)) {
      return true;
    }
    // store this move and score
    currentWordScorekeeper.score = sign[color] * bestNextScore;
    moveHashtable.push(currentWordScorekeeper);

    playedWords.pop();

    if (bestNextScore > currentMax) {
      currentMax = bestNextScore;
    }
    if (bestNextScore > alpha) {
      alpha = bestNextScore;
    }
    if (alpha >= beta) {
      currentMax = alpha;
      // console.log(`Found some phat alpha meat at depth ${depth}: ${currentWord} ${alpha}`);
      return true;
    }
    return false;
  });

  return currentMax;
}

export function getBestMovesToWin(board, validWords, moveHashtable) {
  const movesForWords = {};
  const sortWords = ({ move: moveA }, { move: moveB }) => {
    const moveAScore = boardAnalysis(applyMoveToBoard(StartingBoardState, moveA));
    const moveBScore = boardAnalysis(applyMoveToBoard(StartingBoardState, moveB));
    return moveAScore > moveBScore ? -1 : 1;
  };

  validWords.foreach((word) => {
    movesForWords[word] = getValidMovesFromWord(board, word)
      .map(move => ({ word, move }))
      .sort(sortWords);
  });

  const sortedValidWords = validWords.slice(0).sort((wordA, wordB) => (wordA.length > wordB.length ? -1 : 1));

  const getMoves = (lastPlayedWord, remainingValidWords = sortedValidWords) => {
    const returningValidWords = remainingValidWords.slice(0);
    const lastPlayedWordIndex = returningValidWords.indexOf(lastPlayedWord);
    if (lastPlayedWordIndex >= 0) {
      returningValidWords.splice(returningValidWords, 1);
    }

    const returningMoves = returningValidWords
      .slice(0, 20)
      // Return valid moves
      .map(word => movesForWords[word].slice(0, 1))
      // Flatten moves down
      .reduce((a, b) => a.concat(b), []);

    if (returningMoves.length === 0) {
      throw new Error('no words left');
    }

    return { moves: returningMoves, remainingValidWords: returningValidWords };
  };


  return negaMax(StartingBoardState, 0, 0, -Infinity, Infinity, [], getMoves, undefined, undefined, moveHashtable);
}

export function getWinningMoves(board, validWords) {
  const moveHashtable = [];
  console.log('Getting best moves to win');
  const bestMovesToWin = getBestMovesToWin(board, validWords, moveHashtable);
  console.log(bestMovesToWin);
  console.log(moveHashtable);

  const moveStream = [];
  const addBestMoveToMoveStream = ({ move, moves }) => {
    moveStream.push(move);
    const nextMove = moves.find(({ score }) => score === bestMovesToWin);
    if (nextMove) {
      addBestMoveToMoveStream(nextMove);
    }
  };
  addBestMoveToMoveStream(moveHashtable.find(({ score }) => score === bestMovesToWin));

  const wordStream = [];
  const addBestMoveToWordStream = ({ word, moves }) => {
    wordStream.push(word);
    const nextMove = moves.find(({ score }) => score === bestMovesToWin);
    if (nextMove) {
      addBestMoveToWordStream(nextMove);
    }
  };
  addBestMoveToWordStream(moveHashtable.find(({ score }) => score === bestMovesToWin));
  console.log(wordStream);
  return moveStream;
}
