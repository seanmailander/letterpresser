import React, { Component, PropTypes } from 'react';

import { range } from '../../common/util';

const LetterState = {
  Unclaimed: 1,
  Player1: 2,
  Player2: 4,
  Locked: 8,
};

class Board extends Component {

  static generateLetter(letterIndex, letterContent, currentLetterState) {
    /* eslint no-bitwise: ["error", { "allow": ["&"] }] */
    /* eslint-disable no-nested-ternary */
    /* eslint-disable no-multi-spaces */
    const id = `letter${letterIndex}`;
    const isUnclaimed = (currentLetterState & LetterState.Unclaimed) === LetterState.Unclaimed;
    const isPlayer1 = (currentLetterState & LetterState.Player1) === LetterState.Player1;
    const isLocked = (currentLetterState & LetterState.Locked) === LetterState.Locked;

    const player =
      isUnclaimed ? 0 :
        isPlayer1 ? 1 :
          2;

    const playerClass = `p${player}`;
    const lockedClass = isLocked ? 'locked' : '';
    const letterClass = `letter ${playerClass} ${lockedClass} `;

    return (
      <div className={ letterClass } key={ id }>
        {letterContent}
      </div>
    );
  }

  static processMoveStream(board, moveStream) {
    // moveStream is an array of valid moves
    // each move is a comma-concatenated string of letter positions

    // Create empty board to start with
    const startingBoardState = range(25).map(() => LetterState.Unclaimed);

    // Apply all moves from stream
    const boardStateWithPlayers = moveStream.reduce((accumulator, currentMove, currentIndex) => {
      // First move is player 1
      const isPlayer1 = currentIndex % 2 === 0;

      // Map this move onto board positions
      return accumulator.map((currentPositionValue, currentPosition) => {
        // Current move contains this board position
        const isPartOfCurrentMove = currentMove.split(',').indexOf(`${currentPosition}`) !== -1;
        // Apply new owner of board position
        return !isPartOfCurrentMove ? currentPositionValue :
            isPlayer1 ? LetterState.Player1 :
              LetterState.Player2;
      });
    }, startingBoardState);

    // TODO: apply locking based upon entire board


    return boardStateWithPlayers;
  }

  static generateBoardComponents(board, boardState) {
    return range(25).map(letterIndex => this.generateLetter(
            letterIndex,
            board[letterIndex],
            boardState[letterIndex],
            ));
  }

  render() {
    const { board, moveStream } = this.props;
    const boardState = Board.processMoveStream(board, moveStream);
    const boardComponents = Board.generateBoardComponents(board, boardState);

    return (
      <div className='gameBoard'>
        {boardComponents}
      </div>
    );
  }
}


Board.propTypes = {
  board: PropTypes.string.isRequired,
  moveStream: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Board;
