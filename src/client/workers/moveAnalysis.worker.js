import { isGameOver, boardAnalysis, applyMoveToBoard, getValidMovesFromWord, StartingBoardState } from '../../common/boardOperations';
import { range } from '../../common/util';

function start(board, validMoves) {
  postMessage(`${board} ${validMoves[0]}`);
}

self.onmessage = (e) => {
  const [board, validMoves] = e.data.split(' ');
  if (board && validMoves) {
    start(board, validMoves.split(','));
  }
};
