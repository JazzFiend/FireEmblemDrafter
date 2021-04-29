import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import dropdownStyle from '../reference/dropdownStyle';

class GameSelector extends PureComponent {
  render() {
    const {
      defaultValue,
      gameTitleList,
      handleGameSelector,
      showGameSelector,
    } = this.props;

    return (
      <div>
        {
          showGameSelector && (
            <Select
              className="game-selector"
              classNamePrefix="game-selector"
              defaultValue={defaultValue}
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
  defaultValue: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  }),
  gameTitleList: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  })).isRequired,
  handleGameSelector: PropTypes.func,
  showGameSelector: PropTypes.bool,
};

GameSelector.defaultProps = {
  defaultValue: undefined,
  handleGameSelector: () => {},
  showGameSelector: false,
};
