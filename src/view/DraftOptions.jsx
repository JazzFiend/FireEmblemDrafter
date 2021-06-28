import React from 'react';
import PropTypes from 'prop-types';

export default function DraftOptions(props) {
  const {
    showDraftOptions,
    handleTeamSizeChange,
    defaultValue,
    errorMessage,
  } = props;

  return (
    <div>
      {
        showDraftOptions && (
          <div>
            <form>
              Team Size:
              <input
                type="number"
                name="teamSize"
                data-testid="team-size-textbox"
                onChange={(teamSize) => handleTeamSizeChange(Number(teamSize.target.value))}
                value={defaultValue}
              />
            </form>
            <div className="error" style={{ color: 'red' }}>
              {errorMessage}
            </div>
          </div>
        )
      }
    </div>
  );
}

DraftOptions.propTypes = {
  showDraftOptions: PropTypes.bool.isRequired,
  defaultValue: PropTypes.number,
  errorMessage: PropTypes.string,
  handleTeamSizeChange: PropTypes.func,
};

DraftOptions.defaultProps = {
  defaultValue: 0,
  errorMessage: '',
  handleTeamSizeChange: () => {},
};
