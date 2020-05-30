import {
  isGameOver, boardAnalysis, applyMoveToBoard, getValidMovesFromWord, StartingBoardState,
} from './boardOperations';
import { range } from './util';

const maxDepth = 20;
const sign = [1, -1];
function negaMax(currentBoard, depth, color, alpha, beta, playedWords, getMoves, lastPlayedWord, validWords, moveHashtable, noticeCurrentMaxScore) {
  const indent = range(depth).map(() => ' ');

  if (isGameOver(currentBoard) || depth > maxDepth) {
    // console.log(`${indent} Found a leaf: ${JSON.stringify(playedWords)} ${JSON.stringify(sign[color] * boardAnalysis(currentBoard))} `);
    return sign[color] * Math.floor(boardAnalysis(currentBoard) * 100);
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
    const bestNextScore = -negaMax(
      boardAfterMove,
      depth + 1,
      1 - color,
      -beta,
      -alpha,
      playedWords.slice(0),
      getMoves,
      currentWord,
      remainingValidWords,
      currentWordScorekeeper.moves,
      noticeCurrentMaxScore,
    );

    lastFive.unshift(bestNextScore);
    if (lastFive.length > 2) {
      lastFive.pop();
    }
    if (lastFive.every((score) => score < currentMax)) {
      return true;
    }
    // store this move and score
    currentWordScorekeeper.score = sign[color] * bestNextScore;
    moveHashtable.push(currentWordScorekeeper);

    playedWords.pop();

    if (bestNextScore > currentMax) {
      currentMax = bestNextScore;
      // noticeCurrentMaxScore(currentWordScorekeeper.score, moveHashtable);
    }
    if (bestNextScore > alpha) {
      alpha = bestNextScore;
      // noticeCurrentMaxScore(currentWordScorekeeper.score, moveHashtable);
    }
    if (alpha >= beta) {
      currentMax = alpha;
      noticeCurrentMaxScore(currentWordScorekeeper.score, moveHashtable, depth);
      // console.log(`Found some phat alpha meat at depth ${depth}: ${currentWord} ${alpha}`);
      return true;
    }
    return false;
  });

  // console.log(currentMax);
  noticeCurrentMaxScore(currentMax, moveHashtable, depth);
  return currentMax;
}

function getBestMovesToWin(board, validWords, moveHashtable, noticeCurrentMaxScore) {
  const movesForWords = {};
  const sortWords = ({ move: moveA }, { move: moveB }) => {
    const moveAScore = boardAnalysis(applyMoveToBoard(StartingBoardState, moveA));
    const moveBScore = boardAnalysis(applyMoveToBoard(StartingBoardState, moveB));
    return moveAScore > moveBScore ? -1 : 1;
  };

  validWords.map((word) => {
    movesForWords[word] = getValidMovesFromWord(board, word)
      .map((move) => ({ word, move }))
      .sort(sortWords);
  });

  const sortedValidWords = validWords.slice(0).sort((wordA, wordB) => (wordA.length > wordB.length ? -1 : 1));

  const getMoves = (lastPlayedWord, remainingValidWords = sortedValidWords) => {
    const returningValidWords = remainingValidWords.slice(0);
    const lastPlayedWordIndex = returningValidWords.indexOf(lastPlayedWord);
    if (lastPlayedWordIndex >= 0) {
      returningValidWords.splice(returningValidWords, 1);
    }


    // TODO: check for duplicates here
    const returningMoves = returningValidWords
      .slice(0, 20)
      // Return valid moves
      .map((word) => movesForWords[word].slice(0, 1))
      // Flatten moves down
      .reduce((a, b) => a.concat(b), []);

    if (returningMoves.length === 0) {
      throw new Error('no words left');
    }

    return { moves: returningMoves, remainingValidWords: returningValidWords };
  };


  return negaMax(StartingBoardState, 0, 0, -Infinity, Infinity, [], getMoves, undefined, undefined, moveHashtable, noticeCurrentMaxScore);
}

function getScoreThreadFromMoveHashtable(bestScore, moveHashtable) {
  const moveStream = [];
  const addBestMoveToMoveStream = ({ move, moves } = {}) => {
    if (!move) {
      return;
    }
    moveStream.push(move);
    const nextMove = moves.find(({ score }) => score === bestScore);
    if (nextMove) {
      addBestMoveToMoveStream(nextMove);
    }
  };
  addBestMoveToMoveStream(moveHashtable.find(({ score }) => score === bestScore));

  const wordStream = [];
  const addBestMoveToWordStream = ({ word, moves } = {}) => {
    if (!word) {
      return;
    }
    wordStream.push(word);
    const nextMove = moves.find(({ score }) => score === bestScore);
    if (nextMove) {
      addBestMoveToWordStream(nextMove);
    }
  };

  addBestMoveToWordStream(moveHashtable.find(({ score }) => score === bestScore));

  return moveStream;
}

export function getWinningMoves(board, validWords, noticeBetterMove) {
  const moveHashtable = [];
  // console.log('Getting best moves to win');
  const bestMaxYet = {};

  const noticeCurrentMaxScore = (score, currentMoveHashtable, depth) => {
    // console.log('noticing current max');
    // console.log(score);
    // console.log(moveHashtable);
    if (score < bestMaxYet[depth]) {
      return;
    }
    const tempMoveHashTable = [].concat(moveHashtable, currentMoveHashtable);
    if (tempMoveHashTable.length === 0) {
      return;
    }
    // getScoreThreadFromMoveHashtable(score, filledMoveHashtable).map(thing => console.log(thing));

    bestMaxYet[depth] = score;
    console.log(`Noticing better move thread for ${score}`);
    getScoreThreadFromMoveHashtable(score, tempMoveHashTable).map((move, index) => noticeBetterMove(index, move));
  };
  const bestMovesToWin = getBestMovesToWin(board, validWords, moveHashtable, noticeCurrentMaxScore);

  // console.log('found moves');
  // console.log(bestMovesToWin);
  // console.log(moveHashtable);


  const moveStream = getScoreThreadFromMoveHashtable(bestMovesToWin, moveHashtable);

  // console.log(wordStream);
  // console.log('done');
  return moveStream;
}
