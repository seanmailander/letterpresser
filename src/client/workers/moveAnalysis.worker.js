import { isGameOver, boardAnalysis, applyMoveToBoard, getValidMovesFromWord, StartingBoardState } from '../../common/boardOperations';
import { getWinningMoves } from '../../common/moveAnalysis';
import { range } from '../../common/util';

function start(board, words) {
  console.log(board);
  console.log(words);
  
  const moveStream = getWinningMoves(board, words);
  console.log(JSON.stringify(moveStream));
  postMessage(JSON.stringify({ board, moveStream }));
}

self.onmessage = (e) => {
  const { board, validWords } = JSON.parse(e.data);
  if (board && validWords) {
    start(board, validWords);
  }
};
