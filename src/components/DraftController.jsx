import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class DraftController extends PureComponent {
  render() {
    const { onClickDraftController, draftInProgress } = this.props;
    return (
      <div>
        <button
          type="button"
          className="start-draft-button"
          data-testid="start-draft-button"
          onClick={() => onClickDraftController()}
        >
          {draftInProgress ? 'Restart Draft!' : 'Start Draft!'}
        </button>
      </div>
    );
  }
}
export default DraftController;

DraftController.propTypes = {
  onClickDraftController: PropTypes.func,
  draftInProgress: PropTypes.bool,
};

DraftController.defaultProps = {
  onClickDraftController: () => {},
  draftInProgress: false,
};
