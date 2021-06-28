import React from 'react';
import PropTypes from 'prop-types';

export default function Pick(props) {
  function buildButtons() {
    const { pick, onClick } = props;
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

  return (
    <div data-testid="pick">
      Make a Selection
      {buildButtons()}
    </div>
  );
}

Pick.propTypes = {
  pick: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

Pick.defaultProps = {
  pick: [],
  onClick: () => {},
};
