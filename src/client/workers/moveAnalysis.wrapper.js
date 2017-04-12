const MoveAnalysisWorker = require('worker-loader?name=moveAnalysis.worker.js!./moveAnalysis.worker');



export function getBoardOperationsWorker(board, validWords, handleMoveUpdate) {
  // Build a worker
  const worker = new MoveAnalysisWorker;

  // Listen for incoming messages
  worker.onmessage = (e) => {
    const [message, ...words] = e.data.split(' ');
    words.map((word, wordIndex) => {
      // Urgh string back to number
      const wordPositions = word.split(',').map(pos => parseInt(pos, 10));
      handleMoveUpdate(wordIndex, wordPositions);
    });
  };

  // Start the worker
  worker.postMessage(`${board} ${validWords.join(',')}`);

  return worker;
}
