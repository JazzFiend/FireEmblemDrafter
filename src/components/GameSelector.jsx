import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown/Dropdown';

class GameSelector extends PureComponent {
  extractGameTitles() {
    const { gameInfo } = this.props;

    return gameInfo.map((item) => ({
      id: item.id,
      title: item.title,
    }));
  }

  render() {
    const { draftInProgress, handleGameSelector } = this.props;
    const gameTitleList = this.extractGameTitles();

    return (
      <div>
        {
          !draftInProgress && (
            <Dropdown
              defaultText="Select a Game"
              dropdownItems={gameTitleList}
              onClick={(gameId) => handleGameSelector(gameId)}
              restoreDefaultOnClick={false}
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
