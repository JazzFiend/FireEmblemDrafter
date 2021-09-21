import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import GameSelector from '../view/GameSelector';
import { selectDraftInProgress } from '../features/draft/DraftInProgressSlice';
import { setExclusiveCharacters } from '../features/draft/ExclusiveCharacterSlice';
import { setTeamSize } from '../features/draft/TeamSizeSlice';
import { setRoster } from '../features/draft/RosterSlice';

export default function GameSelectorController(props) {
  const { gameInfo } = props;
  const [selectedValue, setSelectedValue] = useState(-1);
  const draftInProgress = useSelector(selectDraftInProgress);
  const dispatch = useDispatch();

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
    const selectedGameInfo = gameInfo.find((element) => element.id === game.value);
    setSelectedValue(game.value);
    dispatch(setRoster(selectedGameInfo.playableCharacters));
    dispatch(setTeamSize(selectedGameInfo.defaultTeamSize));
    dispatch(setExclusiveCharacters(selectedGameInfo.exclusiveCharacters));
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
};
