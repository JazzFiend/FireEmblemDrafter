import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

import Dropdown from "./Dropdown/Dropdown";

class GameSelector extends PureComponent {
  render() {
    // TODO: We are passing in all the gameInfo. Should we just ask for
    // what we need? Should we ask for gameinfo and pull out what we need?
    // Should we just leave it as is?
    const { draftInProgress, gameInfo, handleGameSelector } = this.props;
    return (
      <div>
        {
          !draftInProgress && (
            <Dropdown
              defaultText='Select a Game'
              dropdownItems={gameInfo}
              onClick={(gameId) => handleGameSelector(gameId)}
            />
          )
        }
      </div>
    )
  }
}
export default GameSelector;

GameSelector.propTypes = {
  draftInProgress: PropTypes.bool.isRequired,
  gameInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    playableCharacters: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  handleGameSelector: PropTypes.func,
};

GameSelector.defaultProps = {
  handleGameSelector: () => {},
};
