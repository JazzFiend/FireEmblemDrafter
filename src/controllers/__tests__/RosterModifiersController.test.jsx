import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import RosterModifiersController from '../RosterModifiersController';
import TestUtil from '../../testHelpers/TestUtil';

test('should render nothing when draft has not started and no characters are loaded', () => {
  const store = TestUtil.createDraftInProgressMockStore(false);

  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController
        restrictedCharacters={[]}
        requiredCharacters={[]}
        allCharacters={[]}
        handleRestrictedUnitSelector={jest.fn()}
        handleRequiredUnitSelector={jest.fn()}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should render unit dropdowns when draft has not started and characters are loaded', () => {
  const store = TestUtil.createDraftInProgressMockStore(false);

  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController
        restrictedCharacters={[]}
        requiredCharacters={[]}
        allCharacters={['u', 'v', 'w', 'x', 'y', 'z']}
        handleRestrictedUnitSelector={jest.fn()}
        handleRequiredUnitSelector={jest.fn()}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should not render when a set of characters is not loaded', () => {
  const store = TestUtil.createDraftInProgressMockStore(false);

  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController
        restrictedCharacters={[]}
        requiredCharacters={[]}
        allCharacters={[]}
        handleRestrictedUnitSelector={() => {}}
        handleRequiredUnitSelector={() => {}}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should render when a set of characters is loaded', () => {
  const store = TestUtil.createDraftInProgressMockStore(false);
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];

  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController
        restrictedCharacters={[]}
        requiredCharacters={[]}
        allCharacters={allCharacters}
        handleRestrictedUnitSelector={() => {}}
        handleRequiredUnitSelector={() => {}}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should hide dropdown and show restricted units when draft has started', () => {
  const restrictedCharacters = ['y', 'z'];
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const store = TestUtil.createDraftInProgressMockStore(true);

  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController
        restrictedCharacters={restrictedCharacters}
        requiredCharacters={[]}
        allCharacters={allCharacters}
        handleRestrictedUnitSelector={() => {}}
        handleRequiredUnitSelector={() => {}}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should hide dropdown and show required units when draft has started', () => {
  const requiredCharacters = ['y', 'z'];
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const store = TestUtil.createDraftInProgressMockStore(true);

  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController
        restrictedCharacters={[]}
        requiredCharacters={requiredCharacters}
        allCharacters={allCharacters}
        handleRestrictedUnitSelector={() => {}}
        handleRequiredUnitSelector={() => {}}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should run restrictedUnitSelector function when clicked', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const testClickHandler = jest.fn();
  const store = TestUtil.createDraftInProgressMockStore(false);

  const { container } = render(
    <Provider store={store}>
      <RosterModifiersController
        restrictedCharacters={[]}
        requiredCharacters={[]}
        allCharacters={allCharacters}
        handleRestrictedUnitSelector={(id) => testClickHandler(id)}
        handleRequiredUnitSelector={() => {}}
      />
    </Provider>,
  );

  userEvent.click(container.querySelector('.restricted-selector__control'));
  userEvent.click(container.querySelectorAll('.restricted-selector__option')[0]);
  expect(testClickHandler).toHaveBeenCalledWith(['u']);
});

test('should run requiredUnitSelector function when clicked', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const testClickHandler = jest.fn();
  const store = TestUtil.createDraftInProgressMockStore(false);

  const { container } = render(
    <Provider store={store}>
      <RosterModifiersController
        restrictedCharacters={[]}
        requiredCharacters={[]}
        allCharacters={allCharacters}
        handleRestrictedUnitSelector={() => {}}
        handleRequiredUnitSelector={(id) => testClickHandler(id)}
      />
    </Provider>,
  );

  userEvent.click(container.querySelector('.required-selector__control'));
  userEvent.click(container.querySelectorAll('.required-selector__option')[0]);
  expect(testClickHandler).toHaveBeenCalledWith(['u']);
});

test('options should disappear and become disabled in the required menu', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const store = TestUtil.createDraftInProgressMockStore(false);

  const { asFragment, container } = render(
    <Provider store={store}>
      <RosterModifiersController
        restrictedCharacters={['u', 'v']}
        requiredCharacters={['w']}
        allCharacters={allCharacters}
        handleRestrictedUnitSelector={() => {}}
        handleRequiredUnitSelector={() => {}}
      />
    </Provider>,
  );

  userEvent.click(container.querySelector('.required-selector__control'));

  expect(asFragment()).toMatchSnapshot();
});
