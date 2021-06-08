import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import GameSelectorController from '../controllers/GameSelectorController';
import DraftController from '../controllers/DraftController';
import RosterModifiersController from '../controllers/RosterModifiersController';
import DraftOptionsController from '../controllers/DraftOptionsController';

class FireEmblemDrafter extends PureComponent {
  showGameSelectorController() {
    const {
      draftInProgress, gameInfo, handleGameSelector,
    } = this.props;

    return (
      <GameSelectorController
        draftInProgress={draftInProgress}
        gameInfo={gameInfo}
        handleGameSelector={handleGameSelector}
      />
    );
  }

  showRosterController() {
    const {
      roster,
      restrictedCharacters,
      requiredCharacters,
      draftInProgress,
      handleRestrictedUnitSelector,
      handleRequiredUnitSelector,
    } = this.props;

    return (
      <div>
        <RosterModifiersController
          restrictedCharacters={restrictedCharacters}
          requiredCharacters={requiredCharacters}
          allCharacters={roster}
          handleRestrictedUnitSelector={handleRestrictedUnitSelector}
          handleRequiredUnitSelector={handleRequiredUnitSelector}
          draftInProgress={draftInProgress}
        />
      </div>
    );
  }

  showDraftOptionsController() {
    const {
      gameSelected,
      draftInProgress,
      handleTeamSizeChange,
      teamSize,
      maxTeamSize,
    } = this.props;

    return (
      <DraftOptionsController
        gameSelected={gameSelected}
        draftInProgress={draftInProgress}
        handleTeamSizeChange={handleTeamSizeChange}
        defaultValue={teamSize}
        maxTeamSize={maxTeamSize}
      />
    );
  }

  showDraftController() {
    const {
      draftInProgress,
      roster,
      restrictedCharacters,
      requiredCharacters,
      teamSize,
      randomizePicks,
      handleDraftProgress,
    } = this.props;

    return (
      <DraftController
        draftInProgress={draftInProgress}
        handleDraftProgress={handleDraftProgress}
        roster={roster}
        restrictedCharacters={restrictedCharacters}
        requiredCharacters={requiredCharacters}
        teamSize={teamSize}
        randomizePicks={randomizePicks}
      />
    );
  }

  render() {
    return (
      <div>
        {this.showGameSelectorController()}
        {this.showRosterController()}
        {this.showDraftOptionsController()}
        {this.showDraftController()}
      </div>
    );
  }
}
export default FireEmblemDrafter;

FireEmblemDrafter.propTypes = {
  draftInProgress: PropTypes.bool,
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
  draftInProgress: false,
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
