
import React, { Component, PropTypes } from 'react';

import { getWordFromBoardPositions } from '../../common/boardOperations';

class Moves extends Component {
  static getWordsFromMoveStream(board, moveStream) {
    // moveStream is an array of valid moves
    // each move is an array letter positions

    // Extract all words from stream
    return moveStream.map(move => getWordFromBoardPositions(board, move));
  }

  static generateMoveComponents(words) {
    const moveComponents = words.map(word => (
      <button className='word' key={ word }>{word}</button>
    ));
    return moveComponents;
  }

  render() {
    const { board, moveStream } = this.props;
    const words = Moves.getWordsFromMoveStream(board, moveStream);
    const moveComponents = Moves.generateMoveComponents(words);

    return (
      <div className='gameMoves'>
        {moveComponents}
      </div>
    );
  }
}


Moves.propTypes = {
  board: PropTypes.string.isRequired,
  moveStream: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default Moves;
