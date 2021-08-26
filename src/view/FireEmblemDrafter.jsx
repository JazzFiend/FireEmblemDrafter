import React from 'react';
import PropTypes from 'prop-types';
import GameSelectorController from '../controllers/GameSelectorController';
import DraftController from '../controllers/DraftController';
import RosterModifiersController from '../controllers/RosterModifiersController';
import DraftOptionsController from '../controllers/DraftOptionsController';

export default function FireEmblemDrafter(props) {
  const {
    gameInfo,
    gameSelected,
    maxTeamSize,
    randomizePicks,
  } = props;

  function showGameSelectorController() {
    return (
      <GameSelectorController
        gameInfo={gameInfo}
      />
    );
  }

  function showRosterController() {
    return (
      <div>
        <RosterModifiersController />
      </div>
    );
  }

  function showDraftOptionsController() {
    return (
      <DraftOptionsController
        gameSelected={gameSelected}
        maxTeamSize={maxTeamSize}
      />
    );
  }

  function showDraftController() {
    return (
      <DraftController
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
  maxTeamSize: PropTypes.number.isRequired,
  gameInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
};

FireEmblemDrafter.defaultProps = {
  randomizePicks: false,
};
