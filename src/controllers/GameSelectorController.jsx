import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GameSelector from '../view/GameSelector';

class GameSelectorController extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: -1,
    };
  }

  determineDefaultValue(gameTitleList) {
    const { selectedValue } = this.state;
    let defaultValue = null;
    if (selectedValue >= 0) {
      defaultValue = gameTitleList[selectedValue];
    }
    return defaultValue;
  }

  extractGameTitles() {
    const { gameInfo } = this.props;
    return gameInfo.map((item) => ({
      value: item.id,
      label: item.title,
    }));
  }

  recordStateOnChange(game) {
    const { handleGameSelector } = this.props;
    this.setState({
      selectedValue: game.value,
    });
    handleGameSelector(game);
  }

  showGameSelector() {
    const { draftInProgress } = this.props;
    return !draftInProgress;
  }

  render() {
    const gameTitleList = this.extractGameTitles();
    const defaultValue = this.determineDefaultValue(gameTitleList);

    return (
      <GameSelector
        showGameSelector={this.showGameSelector()}
        defaultValue={defaultValue}
        handleGameSelector={(game) => this.recordStateOnChange(game)}
        gameTitleList={gameTitleList}
      />
    );
  }
}
export default GameSelectorController;

GameSelectorController.propTypes = {
  draftInProgress: PropTypes.bool.isRequired,
  gameInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  handleGameSelector: PropTypes.func,
};

GameSelectorController.defaultProps = {
  handleGameSelector: () => {},
};
