import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Pick from './Pick';
import RandomNumberGenerator from '../logic/RandomNumberGenerator';
import RandomElementSelector from '../logic/RandomElementSelector';
import RosterOptions from '../logic/helpers/RosterOptions';
import Draft from '../logic/Draft';
import TestRandomNumberGenerator from '../logic/__mocks__/TestRandomNumberGenerator';

class DraftController extends Component {
  static displayTeam(team) {
    let teamDisplayFriendly = '';
    _.forEach(team, (value) => {
      teamDisplayFriendly = `${teamDisplayFriendly + value}\n`;
    });
    return teamDisplayFriendly;
  }

  static createRandomizer(randomizePicks) {
    if (randomizePicks) {
      return new RandomElementSelector(RandomNumberGenerator);
    }
    TestRandomNumberGenerator.clearState();
    return new RandomElementSelector(TestRandomNumberGenerator);
  }

  constructor(props) {
    super(props);
    this.state = {
      pick: Array(6),
      team: Array(0),
      draft: undefined,
    };
  }

  showPick() {
    const { draftInProgress, handleDraftProgress } = this.props;
    const { pick, draft } = this.state;
    return (
      <div>
        {
          draftInProgress
          && (
          <Pick
            pick={pick}
            onClick={(index) => {
              this.handlePickClick(index);
              handleDraftProgress(!(draft.isDraftFinished()));
            }}
          />
          )
        }
      </div>
    );
  }

  handlePickClick(buttonIndex) {
    const { pick, draft } = this.state;
    let newPick;

    draft.select(pick[buttonIndex]);
    if (!draft.isDraftFinished()) {
      newPick = draft.generateNextPick();
    }

    this.setState({
      pick: newPick,
      team: draft.getCurrentTeam(),
    });
  }

  startDraft() {
    const {
      roster,
      restrictedCharacters,
      requiredCharacters,
      teamSize,
      randomizePicks,
    } = this.props;
    const rosterOptions = new RosterOptions(roster, restrictedCharacters, requiredCharacters);
    const randomizer = DraftController.createRandomizer(randomizePicks);
    const draft = new Draft(rosterOptions, teamSize, randomizer);
    const pick = draft.generateNextPick();

    this.setState({
      draft,
      team: draft.getCurrentTeam(),
      pick,
    });
  }

  render() {
    const { draftInProgress, handleDraftProgress } = this.props;
    const { team } = this.state;
    return (
      <div>
        <button
          type="button"
          className="start-draft-button"
          data-testid="start-draft-button"
          onClick={() => {
            this.startDraft();
            handleDraftProgress(true);
          }}
        >
          {draftInProgress ? 'Restart Draft!' : 'Start Draft!'}
        </button>
        {this.showPick()}
        <div data-testid="team-list">
          {DraftController.displayTeam(team)}
        </div>
      </div>
    );
  }
}

DraftController.propTypes = {
  draftInProgress: PropTypes.bool.isRequired,
  handleDraftProgress: PropTypes.func,
  roster: PropTypes.arrayOf(PropTypes.string),
  restrictedCharacters: PropTypes.arrayOf(PropTypes.string),
  requiredCharacters: PropTypes.arrayOf(PropTypes.string),
  teamSize: PropTypes.number.isRequired,
  randomizePicks: PropTypes.bool,
};

DraftController.defaultProps = {
  handleDraftProgress: () => {},
  roster: [],
  restrictedCharacters: [],
  requiredCharacters: [],
  randomizePicks: true,
};

export default DraftController;
