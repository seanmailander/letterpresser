import React from 'react';
import Promise from 'bluebird';

import Board from './board';
import Moves from './moves';
import Controls from './controls';

import { getBoardOperationsWorker } from '../workers/moveAnalysis.wrapper';

import { getRandomGame, getWordsForGame } from '../services/letterpresser';

const initialState = {
  board: '',
  moveStream: [],
};


const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index + 1),
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    this.newRandomGame();
  }

  handleMoveUpdate = (moveIndex, move) => {
    this.setState({
      moveStream: insert([].concat(this.state.moveStream), moveIndex, move),
    });
  };

  newRandomGame = () => {
    getRandomGame()
      .then(board => this.useBoard(board));
  }

  useBoard = (boardString) => {
    Promise.resolve()
      .then(() => [boardString, getWordsForGame(boardString)])
      .spread((board, words) => {
        const moveStream = [];
        this.setState({
          board,
          moveStream,
        });

        getBoardOperationsWorker(board, words, this.handleMoveUpdate);
      });
  }

  render() {
    const { board, moveStream } = this.state;

    return (
      <div className='appContainer'>
        <Controls onRandomize={ this.newRandomGame } onUseBoard={ this.useBoard } />
        <Board board={ board } moveStream={ moveStream } />
        <Moves board={ board } moveStream={ moveStream } />
      </div>
    );
  }
}

export default App;
