import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import dropdownStyle from '../reference/dropdownStyle';

export default function RosterModifiers(props) {
  const {
    showDraftOptions,
    showDraftOptionsLists,
    testId,
    placeholderText,
    defaultValue,
    selected,
    optionsWithDisables,
    onChangeHandler,
  } = props;

  function displayList(list, label) {
    if (!list.length) return '';

    return `${label}: ${list.reduce(
      (accumulatedString, next) => `${accumulatedString}\n${next}`,
    )}`;
  }

  function renderMultiDropdown(dropdownOptions) {
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

  function showDropdown(dropdownOptions) {
    return (
      <div data-testid={`${dropdownOptions.testId}-drop-down`}>
        {
          showDraftOptions && renderMultiDropdown(dropdownOptions)
        }
      </div>
    );
  }

  function showUnitList(list, listTitle) {
    return (
      <div data-testid={`${testId}-list`}>
        {
          (showDraftOptionsLists)
          && displayList(list, listTitle)
        }
      </div>
    );
  }

  const dropdownOptions = {
    testId,
    defaultValue,
    options: optionsWithDisables,
    onChangeHandler,
    placeholderText,
  };

  return (
    <div>
      {showDropdown(dropdownOptions)}
      {showUnitList(selected, dropdownOptions.placeholderText)}
    </div>
  );
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
  showDraftOptions: PropTypes.bool.isRequired,
  showDraftOptionsLists: PropTypes.bool.isRequired,
};

RosterModifiers.defaultProps = {
  testId: '',
  placeholderText: '',
  onChangeHandler: () => {},
};
