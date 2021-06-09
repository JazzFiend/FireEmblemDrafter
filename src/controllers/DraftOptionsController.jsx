import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DraftOptions from '../view/DraftOptions';

class DraftOptionsController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  handleTeamSizeChange(teamSize) {
    const { handleTeamSizeChange, maxTeamSize } = this.props;
    if (teamSize <= 0 || teamSize > maxTeamSize) {
      this.setState({
        errorMessage: 'Please enter a valid team size.',
      });
    } else {
      this.setState({
        errorMessage: '',
      });
    }
    handleTeamSizeChange(teamSize);
  }

  showDraftOptions() {
    const { gameSelected, draftInProgress } = this.props;
    return !draftInProgress && gameSelected;
  }

  render() {
    const { defaultValue } = this.props;
    const { errorMessage } = this.state;
    return (
      <DraftOptions
        showDraftOptions={this.showDraftOptions()}
        handleTeamSizeChange={(teamSize) => this.handleTeamSizeChange(teamSize)}
        defaultValue={defaultValue}
        errorMessage={errorMessage}
      />
    );
  }
}
export default DraftOptionsController;

DraftOptionsController.propTypes = {
  gameSelected: PropTypes.bool.isRequired,
  draftInProgress: PropTypes.bool.isRequired,
  defaultValue: PropTypes.number,
  maxTeamSize: PropTypes.number.isRequired,
  handleTeamSizeChange: PropTypes.func,
};

DraftOptionsController.defaultProps = {
  defaultValue: 0,
  handleTeamSizeChange: () => {},
};
