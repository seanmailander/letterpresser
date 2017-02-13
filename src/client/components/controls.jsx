
import React, { Component, PropTypes } from 'react';

class Controls extends Component {
  render() {
    const { onRandomize } = this.props;
    return (
      <div className='gameControls'>
        <div className='input-group'>
          <input
            className='form-control' name='gameboard'
            type='text' placeholder='Enter 25-charecter game board' maxLength='25'
          />
          <span className='input-grou-btn'>
            <button className='btn btn-primary'>Go!</button>
          </span>
        </div>
        <div className='btn-group'>
          <button className='btn btn-info' onClick={ onRandomize }>Randomize</button>
          <button className='btn btn-default'>Clear</button>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  onRandomize: PropTypes.func.isRequired,
};

export default Controls;
