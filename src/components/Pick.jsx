import React, { Component } from "react";

class Pick extends Component {
  buildButtons(pick, onClick) {
    let buttonArray = Array(0);
    for (let i = 0; i < pick.length; i++) {
      buttonArray.push(
        <button type="button" data-testid="pick-button" onClick={() => onClick(i)} key={i}>
          {pick[i]}
        </button>
      );
    }
    return buttonArray;
  }

  render() {
    let propsCopy = this.props;
    return (
      <div data-testid="pick">
      Make a Selection
        {this.buildButtons(propsCopy.pick, propsCopy.onClick)}
      </div>
    );
  }
}

Pick.defaultProps = {
  pick: [],
  onClick: () => {},
};

export default Pick;
