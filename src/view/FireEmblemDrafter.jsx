import React from 'react';
import PropTypes from 'prop-types';
import GameSelectorController from '../controllers/GameSelectorController';
import DraftController from '../controllers/DraftController';
import RosterModifiersController from '../controllers/RosterModifiersController';
import DraftOptionsController from '../controllers/DraftOptionsController';

export default function FireEmblemDrafter(props) {
  const {
    gameInfo,
    handleGameSelector,
    roster,
    restrictedCharacters,
    requiredCharacters,
    handleRestrictedUnitSelector,
    handleRequiredUnitSelector,
    gameSelected,
    handleTeamSizeChange,
    teamSize,
    maxTeamSize,
    randomizePicks,
    handleDraftProgress,
  } = props;

  function showGameSelectorController() {
    return (
      <GameSelectorController
        gameInfo={gameInfo}
        handleGameSelector={handleGameSelector}
      />
    );
  }

  function showRosterController() {
    return (
      <div>
        <RosterModifiersController
          restrictedCharacters={restrictedCharacters}
          requiredCharacters={requiredCharacters}
          allCharacters={roster}
          handleRestrictedUnitSelector={handleRestrictedUnitSelector}
          handleRequiredUnitSelector={handleRequiredUnitSelector}
        />
      </div>
    );
  }

  function showDraftOptionsController() {
    return (
      <DraftOptionsController
        gameSelected={gameSelected}
        handleTeamSizeChange={handleTeamSizeChange}
        defaultValue={teamSize}
        maxTeamSize={maxTeamSize}
      />
    );
  }

  function showDraftController() {
    return (
      <DraftController
        handleDraftProgress={handleDraftProgress}
        roster={roster}
        restrictedCharacters={restrictedCharacters}
        requiredCharacters={requiredCharacters}
        teamSize={teamSize}
        randomizePicks={randomizePicks}
      />
    );
  }

  return (
    <div>
      {showGameSelectorController()}
      {showRosterController()}
      {showDraftOptionsController()}
      {showDraftController()}
    </div>
  );
}

FireEmblemDrafter.propTypes = {
  gameSelected: PropTypes.bool.isRequired,
  randomizePicks: PropTypes.bool,
  teamSize: PropTypes.number,
  maxTeamSize: PropTypes.number.isRequired,
  roster: PropTypes.arrayOf(PropTypes.string),
  requiredCharacters: PropTypes.arrayOf(PropTypes.string),
  restrictedCharacters: PropTypes.arrayOf(PropTypes.string),
  gameInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  handleDraftProgress: PropTypes.func,
  handleGameSelector: PropTypes.func,
  handleRequiredUnitSelector: PropTypes.func,
  handleRestrictedUnitSelector: PropTypes.func,
  handleTeamSizeChange: PropTypes.func,
};

FireEmblemDrafter.defaultProps = {
  roster: [],
  restrictedCharacters: [],
  requiredCharacters: [],
  teamSize: 0,
  randomizePicks: false,
  handleGameSelector: () => {},
  handleDraftProgress: () => {},
  handleRestrictedUnitSelector: () => {},
  handleRequiredUnitSelector: () => {},
  handleTeamSizeChange: () => {},
};
