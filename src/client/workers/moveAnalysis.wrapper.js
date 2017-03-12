const MoveAnalysisWorker = require('worker-loader?name=moveAnalysis.worker.js!./moveAnalysis.worker');

export function getBoardOperationsWorker(board, validWords) {
  // Build a worker
  const worker = new MoveAnalysisWorker;

  // Listen for incoming messages
  worker.onmessage = (e) => {
    const [message, data] = e.data.split(' ');
    console.log(message);
    console.log(data);
  };

  // Start the worker
  worker.postMessage(`${board} ${validWords.join(',')}`);
}
