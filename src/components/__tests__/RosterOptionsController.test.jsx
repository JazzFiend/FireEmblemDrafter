import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import RosterOptionsController from '../RosterOptionsController';

test('should render nothing when draft has not started false and no characters are loaded', () => {
  const { asFragment } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={[]}
      allCharacters={[]}
      handleRestrictedUnitSelector={jest.fn()}
      handleRequiredUnitSelector={jest.fn()}
      draftInProgress={false}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should render unit dropdowns when draft has not started false and characters are loaded', () => {
  const { asFragment } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={[]}
      allCharacters={['u', 'v', 'w', 'x', 'y', 'z']}
      handleRestrictedUnitSelector={jest.fn()}
      handleRequiredUnitSelector={jest.fn()}
      draftInProgress={false}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});

// TODO: I think that all of these tests could be replaced by snapshot tests. But I want to try to simplify the
// Dropdown Component first.
test('should not render when a set of characters is not loaded', () => {
  const { getByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={[]}
      allCharacters={[]}
      handleRestrictedUnitSelector={() => {}}
      handleRequiredUnitSelector={() => {}}
      draftInProgress={false}
    />,
  );

  const restrictedDropdown = getByTestId('restricted-drop-down');
  expect(restrictedDropdown).toHaveTextContent('');
});

test('should render when a set of characters is loaded', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];

  const { getByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={[]}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={() => {}}
      handleRequiredUnitSelector={() => {}}
      draftInProgress={false}
    />,
  );

  const restrictedDropdown = getByTestId('restricted-drop-down');
  expect(restrictedDropdown).toHaveTextContent('Restricted Units');
});

test('should hide dropdown and show restricted units when draft has started', () => {
  const restrictedCharacters = ['y', 'z'];
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];

  const { getByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={restrictedCharacters}
      requiredCharacters={[]}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={() => {}}
      handleRequiredUnitSelector={() => {}}
      draftInProgress={true}
    />,
  );

  const restrictedDropdown = getByTestId('restricted-drop-down');
  expect(restrictedDropdown).toHaveTextContent('');
  const restrictedList = getByTestId('restricted-list');
  expect(restrictedList).toHaveTextContent('Restricted Units: y z');
});

test('should hide dropdown and show required units when draft has started', () => {
  const requiredCharacters = ['y', 'z'];
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];

  const { getByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={requiredCharacters}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={() => {}}
      handleRequiredUnitSelector={() => {}}
      draftInProgress={true}
    />,
  );

  const requiredDropdown = getByTestId('required-drop-down');
  expect(requiredDropdown).toHaveTextContent('');
  const requiredList = getByTestId('required-list');
  expect(requiredList).toHaveTextContent('Required Units: y z');
});

test('should run restrictedUnitSelector function when clicked', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const testClickHandler = jest.fn();
  const { container } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={[]}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={(id) => testClickHandler(id)}
      handleRequiredUnitSelector={() => {}}
      draftInProgress={false}
    />,
  );

  userEvent.click(container.querySelector('.restricted-selector__control'));
  userEvent.click(container.querySelectorAll('.restricted-selector__option')[0]);
  expect(testClickHandler).toHaveBeenCalledWith(['u']);
});

test('should run requiredUnitSelector function when clicked', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const testClickHandler = jest.fn();
  const { container } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={[]}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={() => {}}
      handleRequiredUnitSelector={(id) => testClickHandler(id)}
      draftInProgress={false}
    />,
  );

  userEvent.click(container.querySelector('.required-selector__control'));
  userEvent.click(container.querySelectorAll('.required-selector__option')[0]);
  expect(testClickHandler).toHaveBeenCalledWith(['u']);
});

test('options should disappear and become disabled in the required menu', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const { asFragment, container } = render(
    <RosterOptionsController
      restrictedCharacters={['u', 'v']}
      requiredCharacters={['w']}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={() => {}}
      handleRequiredUnitSelector={() => {}}
      draftInProgress={false}
    />,
  );

  userEvent.click(container.querySelector('.required-selector__control'));

  expect(asFragment()).toMatchSnapshot();
});
