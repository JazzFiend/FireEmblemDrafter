import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import Pick from './Pick';
import { selectDraftInProgress } from '../features/draft/DraftInProgressSlice';

export default function DraftView(props) {
  const {
    handlePickClick,
    pick,
    handleStartDraft,
    team,
  } = props;
  const draftInProgress = useSelector(selectDraftInProgress);

  function displayTeam() {
    let teamDisplayFriendly = '';
    _.forEach(team, (value) => {
      teamDisplayFriendly = `${teamDisplayFriendly + value}\n`;
    });
    return teamDisplayFriendly;
  }

  function showPick() {
    return (
      <div>
        {
          draftInProgress
          && (
          <Pick
            pick={pick}
            onClick={(index) => {
              handlePickClick(index);
            }}
          />
          )
        }
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="start-draft-button"
        data-testid="start-draft-button"
        onClick={
          () => { handleStartDraft(); }
        }
      >
        {draftInProgress ? 'Restart Draft!' : 'Start Draft!'}
      </button>
      {showPick()}
      <div data-testid="team-list">
        {displayTeam(team)}
      </div>
    </div>
  );
}

DraftView.propTypes = {
  handlePickClick: PropTypes.func,
  handleStartDraft: PropTypes.func,
  pick: PropTypes.arrayOf(PropTypes.string),
  team: PropTypes.arrayOf(PropTypes.string),
};

DraftView.defaultProps = {
  handlePickClick: () => {},
  handleStartDraft: () => {},
  pick: [],
  team: [],
};
