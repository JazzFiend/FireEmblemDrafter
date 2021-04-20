import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import dropdownStyle from '../reference/dropdownStyle';

class GameSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: -1,
    };
  }

  extractGameTitles() {
    const { gameInfo } = this.props;

    return gameInfo.map((item) => ({
      value: item.id,
      label: item.title,
    }));
  }

  render() {
    const { draftInProgress, handleGameSelector } = this.props;
    const { selectedValue } = this.state;
    const gameTitleList = this.extractGameTitles();

    let defaultValue = null;
    if (selectedValue >= 0) {
      defaultValue = gameTitleList[selectedValue];
    }

    return (
      <div>
        {
          !draftInProgress && (
            <Select
              className="game-selector"
              classNamePrefix="game-selector"
              defaultValue={defaultValue}
              options={gameTitleList}
              onChange={(game) => {
                this.setState({
                  selectedValue: game.value,
                });
                handleGameSelector(game);
              }}
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
