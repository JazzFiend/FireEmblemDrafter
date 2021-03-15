import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import dropdownStyle from '../reference/dropdownStyle';

class GameSelector extends PureComponent {
  extractGameTitles() {
    const { gameInfo } = this.props;

    return gameInfo.map((item) => ({
      value: item.id,
      label: item.title,
    }));
  }

  render() {
    const { draftInProgress, handleGameSelector } = this.props;
    const gameTitleList = this.extractGameTitles();

    return (
      <div>
        {
          !draftInProgress && (
            <Select
              className="game-selector"
              classNamePrefix="game-selector"
              options={gameTitleList}
              onChange={handleGameSelector}
              placeholder="Game Select..."
              styles={dropdownStyle}
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
