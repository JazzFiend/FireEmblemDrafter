import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pick extends Component {
  static buildButtons(pick, onClick) {
    const buttonArray = Array(0);
    for (let i = 0; i < pick.length; i++) {
      buttonArray.push(
        <button type="button" data-testid="pick-button" onClick={() => onClick(i)} key={i}>
          {pick[i]}
        </button>,
      );
    }
    return buttonArray;
  }

  render() {
    const { pick, onClick } = this.props;
    return (
      <div data-testid="pick">
        Make a Selection
        {Pick.buildButtons(pick, onClick)}
      </div>
    );
  }
}

Pick.propTypes = {
  pick: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

Pick.defaultProps = {
  pick: [],
  onClick: () => {},
};

export default Pick;
