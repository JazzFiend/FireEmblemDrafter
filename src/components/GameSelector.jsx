import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown/Dropdown';

class GameSelector extends PureComponent {
  static extractGameTitles(gameInfo) {
    return gameInfo.map((item) => ({
      id: item.id,
      title: item.title,
    }));
  }

  render() {
    const { draftInProgress, gameInfo, handleGameSelector } = this.props;
    const gameTitleList = GameSelector.extractGameTitles(gameInfo);
    return (
      <div>
        {
          !draftInProgress && (
            <Dropdown
              defaultText="Select a Game"
              dropdownItems={gameTitleList}
              onClick={(gameId) => handleGameSelector(gameId)}
            />
          )
        }
      </div>
    );
  }
}
export default GameSelector;

GameSelector.propTypes = {
  draftInProgress: PropTypes.bool.isRequired,
  gameInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  handleGameSelector: PropTypes.func,
};

GameSelector.defaultProps = {
  handleGameSelector: () => {},
};
