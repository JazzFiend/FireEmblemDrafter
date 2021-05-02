import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import dropdownStyle from '../reference/dropdownStyle';

class RosterModifiers extends PureComponent {
  static displayList(list, label) {
    if (!list.length) return '';

    return `${label}: ${list.reduce(
      (accumulatedString, next) => `${accumulatedString}\n${next}`,
    )}`;
  }

  showDropdown(dropdownOptions) {
    const { showRosterOptions } = this.props;
    return (
      <div data-testid={`${dropdownOptions.testId}-drop-down`}>
        {
          showRosterOptions
          && RosterModifiers.renderMultiDropdown(
            dropdownOptions,
          )
        }
      </div>
    );
  }

  static renderMultiDropdown(dropdownOptions) {
    return (
      <Select
        isMulti
        className={`${dropdownOptions.testId}-selector`}
        classNamePrefix={`${dropdownOptions.testId}-selector`}
        defaultValue={dropdownOptions.defaultValue}
        options={dropdownOptions.options}
        onChange={(selectedCharacters) => dropdownOptions.onChangeHandler(selectedCharacters.map(
          (element) => element.label,
        ))}
        placeholder={dropdownOptions.placeholderText}
        styles={dropdownStyle}
      />
    );
  }

  showUnitList(testId, list, listTitle) {
    const { showRosterOptionsLists } = this.props;
    return (
      <div data-testid={`${testId}-list`}>
        {
          (showRosterOptionsLists)
          && RosterModifiers.displayList(list, listTitle)
        }
      </div>
    );
  }

  render() {
    const {
      testId,
      placeholderText,
      defaultValue,
      selected,
      optionsWithDisables,
      onChangeHandler,
    } = this.props;

    const dropdownOptions = {
      testId,
      defaultValue,
      options: optionsWithDisables,
      onChangeHandler,
      placeholderText,
    };

    return (
      <div>
        {this.showDropdown(dropdownOptions)}
        {this.showUnitList(dropdownOptions.testId, selected, dropdownOptions.placeholderText)}
      </div>
    );
  }
}

RosterModifiers.propTypes = {
  testId: PropTypes.string,
  placeholderText: PropTypes.string,
  defaultValue: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  })).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  optionsWithDisables: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
  })).isRequired,
  onChangeHandler: PropTypes.func,
  showRosterOptions: PropTypes.bool.isRequired,
  showRosterOptionsLists: PropTypes.bool.isRequired,
};

RosterModifiers.defaultProps = {
  testId: '',
  placeholderText: '',
  onChangeHandler: () => {},
};

export default RosterModifiers;
