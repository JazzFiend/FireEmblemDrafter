import React, { Component } from "react";
import { hot } from "react-hot-loader";
import _ from 'lodash';
import PropTypes from 'prop-types';

import './FireEmblemDrafter.css';
import Draft from '../../logic/Draft';
import RandomNumberGenerator from '../../logic/RandomNumberGenerator';
import RandomElementSelector from '../../logic/RandomElementSelector';
import TestRandomNumberGenerator from '../../logic/__mocks__/TestRandomNumberGenerator';
import Pick from '../Pick';

export class FireEmblemDrafter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pick: Array(6).fill(undefined),
      draftInProgress: false,
      team: Array(0),
      draft: undefined,
      roster: props.roster,
      teamSize: props.teamSize,
      randomizePicks: props.isRandom,
    }
  }

  startDraft(roster, teamSize, randomizePicks) {
    let randomizer = this.createRandomizer(randomizePicks);
    let draft = new Draft(roster, teamSize, randomizer);
    let pick = draft.generateNextPick();

    this.setState({
      draftInProgress: true,
      draft: draft,
      team: Array(0),
      pick: pick,
    });
  }

  createRandomizer(randomizePicks) {
    if (randomizePicks) {
      return new RandomElementSelector(new RandomNumberGenerator());
    }
    else {
      return new RandomElementSelector(new TestRandomNumberGenerator());
    }
  }

  showPick(pick, draftInProgress, draft) {
    return (
      <div>
        {
          draftInProgress && 
          <Pick pick={pick} onClick={index => this.handlePickClick(index, pick, draft)} />
        }
      </div>
    );
  }

  handlePickClick(buttonIndex, pick, draft) {
    let newPick;

    draft.select(pick[buttonIndex]);
    if(!draft.isDraftFinished()) {
      newPick = draft.generateNextPick();
    }

    this.setState({
      draftInProgress: !(draft.isDraftFinished()),
      pick: newPick,
      team: draft.getCurrentTeam(),
    });
  }

  displayTeam(team) {
    let teamDisplayFriendly = "";
    _.forEach(team, function(value) {
      teamDisplayFriendly = teamDisplayFriendly + value + '\n';
    });
    return teamDisplayFriendly;
  }

  render() {
    const stateCopy = this.state;
    return (
      <div>
        <button type="button" className="start-draft-button" data-testid="start-draft-button" onClick={() => this.startDraft(stateCopy.roster, stateCopy.teamSize, stateCopy.randomizePicks)}>
          {stateCopy.draftInProgress ? 'Restart Draft!' : 'Start Draft!'}
        </button>
        {this.showPick(stateCopy.pick, stateCopy.draftInProgress, stateCopy.draft)}
        <div data-testid='team-list'>
          {this.displayTeam(stateCopy.team)}
        </div>
      </div>
    );
  }
}
export default hot(module)(FireEmblemDrafter);

FireEmblemDrafter.propTypes = {
  roster: PropTypes.arrayOf(PropTypes.string),
  teamSize: PropTypes.number,
  isRandom: PropTypes.bool,
};

FireEmblemDrafter.defaultProps = {
  roster: [],
  teamSize: 0,
  isRandom: false,
};
