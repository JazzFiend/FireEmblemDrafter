import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Pick from './Pick';

class DraftView extends Component {
  static displayTeam(team) {
    let teamDisplayFriendly = '';
    _.forEach(team, (value) => {
      teamDisplayFriendly = `${teamDisplayFriendly + value}\n`;
    });
    return teamDisplayFriendly;
  }

  showPick() {
    const { draftInProgress, handlePickClick, pick } = this.props;
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

  render() {
    const { draftInProgress, handleStartDraft, team } = this.props;
    return (
      <div>
        <button
          type="button"
          className="start-draft-button"
          data-testid="start-draft-button"
          onClick={handleStartDraft}
        >
          {draftInProgress ? 'Restart Draft!' : 'Start Draft!'}
        </button>
        {this.showPick()}
        <div data-testid="team-list">
          {DraftView.displayTeam(team)}
        </div>
      </div>
    );
  }
}

DraftView.propTypes = {
  draftInProgress: PropTypes.bool,
  handlePickClick: PropTypes.func,
  handleStartDraft: PropTypes.func,
  pick: PropTypes.arrayOf(PropTypes.string),
  team: PropTypes.arrayOf(PropTypes.string),
};

DraftView.defaultProps = {
  draftInProgress: false,
  handlePickClick: () => {},
  handleStartDraft: () => {},
  pick: [],
  team: [],
};

export default DraftView;
