import React, { Component } from "react";
import PropTypes from 'prop-types';

export class Pick extends Component {
  render() {
    return (<div data-testid="pick">
      Make a Selection
        {this.buildButtons()}
    </div>);
  }

  buildButtons() {
    let buttonArray = Array(0);
    for (let i = 0; i < this.props.pick.length; i++) {
      buttonArray.push(
        <button data-testid="pick-button" onClick={() => this.props.onClick(i)} key={i}>
          {this.props.pick[i]}
        </button>
      );
    }
    return buttonArray;
  }
}

Pick.propTypes = {
  pick: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};
