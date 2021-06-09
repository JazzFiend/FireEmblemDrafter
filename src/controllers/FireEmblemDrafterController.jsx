import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

import FireEmblemDrafter from '../view/FireEmblemDrafter';

export class FireEmblemDrafterController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draftInProgress: false,
      roster: [],
      teamSize: 0,
      randomizePicks: props.isRandom,
      gameInfo: props.gameInfo,
      restrictedCharacters: Array(0),
      requiredCharacters: Array(0),
    };
  }

  handleGameSelector(game) {
    const { gameInfo } = this.state;
    this.setState({
      roster: gameInfo.find((element) => element.id === game.value).playableCharacters,
      teamSize: gameInfo.find((element) => element.id === game.value).defaultTeamSize,
    });
  }

  handleRequiredUnitSelector(characterList) {
    this.setState({
      requiredCharacters: characterList,
    });
  }

  handleRestrictedUnitSelector(characterList) {
    this.setState({
      restrictedCharacters: characterList,
    });
  }

  handleTeamSizeChange(teamSize) {
    this.setState({
      teamSize,
    });
  }

  updateDraftProgress(draftState) {
    this.setState({
      draftInProgress: draftState,
    });
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
    } = this.state;

    return (
      <FireEmblemDrafter
        draftInProgress={draftInProgress}
        gameSelected={roster.length > 0}
        randomizePicks={randomizePicks}
        teamSize={teamSize}
        maxTeamSize={roster.length}
        roster={roster}
        requiredCharacters={requiredCharacters}
        restrictedCharacters={restrictedCharacters}
        gameInfo={gameInfo}
        handleDraftProgress={(draftState) => this.updateDraftProgress(draftState)}
        handleGameSelector={(game) => this.handleGameSelector(game)}
        handleRequiredUnitSelector={(characterList) => this.handleRequiredUnitSelector(characterList)}
        handleRestrictedUnitSelector={(characterList) => this.handleRestrictedUnitSelector(characterList)}
        handleTeamSizeChange={(newTeamSize) => this.handleTeamSizeChange(newTeamSize)}
      />
    );
  }
}
export default hot(module)(FireEmblemDrafterController);

FireEmblemDrafterController.propTypes = {
  isRandom: PropTypes.bool,
  gameInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    playableCharacters: PropTypes.arrayOf(PropTypes.string),
    defaultTeamSize: PropTypes.number,
  })).isRequired,
};

FireEmblemDrafterController.defaultProps = {
  isRandom: false,
};
