import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import GameSelectorController from '../controllers/GameSelectorController';
import DraftController from '../controllers/DraftController';
import RosterModifiersController from '../controllers/RosterModifiersController';

class FireEmblemDrafter extends PureComponent {
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

  render() {
    const {
      draftInProgress,
      gameInfo,
      roster,
      restrictedCharacters,
      requiredCharacters,
      teamSize,
      randomizePicks,
      handleGameSelector,
      handleDraftProgress,
    } = this.props;

    return (
      <div>
        <GameSelectorController
          draftInProgress={draftInProgress}
          gameInfo={gameInfo}
          handleGameSelector={handleGameSelector}
        />
        {this.showRosterController()}
        <DraftController
          draftInProgress={draftInProgress}
          handleDraftProgress={handleDraftProgress}
          roster={roster}
          restrictedCharacters={restrictedCharacters}
          requiredCharacters={requiredCharacters}
          teamSize={teamSize}
          randomizePicks={randomizePicks}
        />
      </div>
    );
  }
}
export default FireEmblemDrafter;

FireEmblemDrafter.propTypes = {
  draftInProgress: PropTypes.bool,
  gameInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  roster: PropTypes.arrayOf(PropTypes.string),
  restrictedCharacters: PropTypes.arrayOf(PropTypes.string),
  requiredCharacters: PropTypes.arrayOf(PropTypes.string),
  teamSize: PropTypes.number,
  randomizePicks: PropTypes.bool,
  handleGameSelector: PropTypes.func,
  handleDraftProgress: PropTypes.func,
  handleRestrictedUnitSelector: PropTypes.func,
  handleRequiredUnitSelector: PropTypes.func,
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
};
