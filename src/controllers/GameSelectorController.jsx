import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import GameSelector from '../view/GameSelector';
import { selectDraftInProgress } from '../features/draft/DraftInProgressSlice';

export default function GameSelectorController(props) {
  const { gameInfo, handleGameSelector } = props;
  const [selectedValue, setSelectedValue] = useState(-1);
  const draftInProgress = useSelector(selectDraftInProgress);

  function showGameSelector() {
    return !draftInProgress;
  }

  function extractGameTitles() {
    return gameInfo.map((item) => ({
      value: item.id,
      label: item.title,
    }));
  }

  function determineDefaultValue(gameTitleList) {
    let defaultValue = null;
    if (selectedValue >= 0) {
      defaultValue = gameTitleList[selectedValue];
    }
    return defaultValue;
  }

  function recordStateOnChange(game) {
    setSelectedValue(game.value);
    handleGameSelector(game);
  }

  const gameTitleList = extractGameTitles();
  const defaultValue = determineDefaultValue(gameTitleList);

  return (
    <GameSelector
      showGameSelector={showGameSelector()}
      defaultValue={defaultValue}
      handleGameSelector={(game) => recordStateOnChange(game)}
      gameTitleList={gameTitleList}
    />
  );
}

GameSelectorController.propTypes = {
  gameInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  handleGameSelector: PropTypes.func,
};

GameSelectorController.defaultProps = {
  handleGameSelector: () => {},
};
