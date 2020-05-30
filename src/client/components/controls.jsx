
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'abcdeabcdeabcdeabcdeabcde' };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const { onRandomize, onUseBoard } = this.props;
    const useBoard = () => {
      onUseBoard(this.state.value.toUpperCase());
    };

    return (
      <div className='gameControls'>
        <input
          className='form-control' name='gameboard'
          value={ this.state.value }
          onChange={ this.handleChange }
          type='text' placeholder='Enter 25-charecter game board' maxLength='25'
        />
        <button className='btn btn-primary' onClick={ useBoard }>Go!</button>
        <button className='btn btn-info' onClick={ onRandomize }>Randomize</button>
      </div>
    );
  }
}

Controls.propTypes = {
  onRandomize: PropTypes.func.isRequired,
  onUseBoard: PropTypes.func.isRequired,
};

export default Controls;
