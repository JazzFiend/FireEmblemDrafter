import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RandomNumberGenerator from '../model/RandomNumberGenerator';
import RandomElementSelector from '../model/RandomElementSelector';
import RosterOptions from '../model/helpers/RosterOptions';
import Draft from '../model/Draft';
import TestRandomNumberGenerator from '../model/__mocks__/TestRandomNumberGenerator';
import DraftView from '../view/DraftView';

class DraftController extends Component {
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
      draft: undefined,
    };
  }

  selectPick(buttonIndex) {
    const { pick, draft } = this.state;
    let newPick;

    draft.select(pick[buttonIndex]);
    if (!draft.isDraftFinished()) {
      newPick = draft.generateNextPick();
    }

    this.setState({
      pick: newPick,
    });
  }

  extractTeam() {
    const { draft } = this.state;
    if (draft) {
      return draft.getCurrentTeam();
    }
    return [];
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
      pick,
    });
  }

  render() {
    const {
      draftInProgress,
      handleDraftProgress,
    } = this.props;

    const { draft, pick } = this.state;

    const handleStartDraft = () => {
      this.startDraft();
      handleDraftProgress(true);
    };

    const pickHandler = (index) => {
      this.selectPick(index);
      handleDraftProgress(!(draft.isDraftFinished()));
    };

    return (
      <DraftView
        draftInProgress={draftInProgress}
        handleStartDraft={handleStartDraft}
        handlePickClick={pickHandler}
        pick={pick}
        team={this.extractTeam()}
      />
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
