import { isGameOver, boardAnalysis, applyMoveToBoard, getValidMovesFromWord, StartingBoardState } from './boardOperations';
import { range } from './util';

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

function getBestMovesToWin(board, validWords, moveHashtable) {
  const movesForWords = {};
  const sortWords = ({ move: moveA }, { move: moveB }) => {
    const moveAScore = boardAnalysis(applyMoveToBoard(StartingBoardState, moveA));
    const moveBScore = boardAnalysis(applyMoveToBoard(StartingBoardState, moveB));
    return moveAScore > moveBScore ? -1 : 1;
  };

  validWords.map((word) => {
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
  // console.log('Getting best moves to win');
  const bestMovesToWin = getBestMovesToWin(board, validWords, moveHashtable);
  // console.log(bestMovesToWin);
  // console.log(moveHashtable);

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
  // console.log(wordStream);
  // console.log('done');
  return moveStream;
}
