import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import RandomNumberGenerator from '../model/RandomNumberGenerator';
import RandomElementSelector from '../model/RandomElementSelector';
import RosterOptions from '../model/helpers/RosterOptions';
import Draft from '../model/Draft';
import TestRandomNumberGenerator from '../model/__mocks__/TestRandomNumberGenerator';
import DraftView from '../view/DraftView';
import { startDraft, endDraft } from '../features/draft/DraftInProgressSlice';
import { selectRequiredRestricted } from '../features/draft/RequiredRestrictedSlice';
import { selectTeamSize } from '../features/draft/TeamSizeSlice';
import { selectRoster } from '../features/draft/RosterSlice';

export default function DraftController(props) {
  const {
    randomizePicks,
  } = props;

  const [pick, setPick] = useState(Array(6));
  const [draft, setDraft] = useState(undefined);
  const requiredRestrictedCharacters = useSelector(selectRequiredRestricted);
  const teamSize = useSelector(selectTeamSize);
  const roster = useSelector(selectRoster);
  const dispatch = useDispatch();

  function createRandomizer() {
    if (randomizePicks) {
      return new RandomElementSelector(RandomNumberGenerator);
    }
    TestRandomNumberGenerator.clearState();
    return new RandomElementSelector(TestRandomNumberGenerator);
  }

  function selectPick(buttonIndex) {
    let newPick;
    draft.select(pick[buttonIndex]);
    if (!draft.isDraftFinished()) {
      newPick = draft.generateNextPick();
    }
    setPick(newPick);
  }

  function extractTeam() {
    if (draft) {
      return draft.getCurrentTeam();
    }
    return [];
  }

  function beginDraft() {
    const rosterOptions = new RosterOptions(
      roster,
      requiredRestrictedCharacters.restrictedUnits,
      requiredRestrictedCharacters.requiredUnits,
    );
    const randomizer = createRandomizer(randomizePicks);
    const newDraft = new Draft(rosterOptions, teamSize, randomizer);
    const newPick = newDraft.generateNextPick();
    setDraft(newDraft);
    setPick(newPick);
  }

  const handleStartDraft = () => {
    beginDraft();
    dispatch(startDraft());
  };

  const pickHandler = (index) => {
    selectPick(index);
    if (draft.isDraftFinished()) {
      dispatch(endDraft());
    }
  };

  return (
    <DraftView
      handleStartDraft={handleStartDraft}
      handlePickClick={pickHandler}
      pick={pick}
      team={extractTeam()}
      draft={draft}
    />
  );
}

DraftController.propTypes = {
  randomizePicks: PropTypes.bool,
};

DraftController.defaultProps = {
  randomizePicks: true,
};
