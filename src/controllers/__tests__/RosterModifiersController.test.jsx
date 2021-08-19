import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import RosterModifiersController from '../RosterModifiersController';
import MockStoreBuilder from '../../testHelpers/MockStoreBuilder';

afterEach(cleanup);

test('should render nothing when draft has not started and no characters are loaded', () => {
  const store = new MockStoreBuilder().build();
  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should render unit dropdowns when draft has not started and characters are loaded', () => {
  const store = new MockStoreBuilder().withRoster(['u', 'v', 'w', 'x', 'y', 'z']).build();
  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should not render when a set of characters is not loaded', () => {
  const store = new MockStoreBuilder().withDraftStatus(false).build();
  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController
        allCharacters={[]}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should render when a set of characters is loaded', () => {
  const store = new MockStoreBuilder().withDraftStatus(false).withRoster(['u', 'v', 'w', 'x', 'y', 'z']).build();
  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should hide dropdown and show restricted units when draft has started', () => {
  const restrictedCharacters = ['y', 'z'];
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const store = new MockStoreBuilder().withDraftStatus(true).withRestrictedUnits(restrictedCharacters).build();

  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController
        allCharacters={allCharacters}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should hide dropdown and show required units when draft has started', () => {
  const requiredCharacters = ['y', 'z'];
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const store = new MockStoreBuilder().withDraftStatus(true).withRequiredUnits(requiredCharacters).build();

  const { asFragment } = render(
    <Provider store={store}>
      <RosterModifiersController
        allCharacters={allCharacters}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should run restrictedUnitSelector function when clicked', () => {
  const store = new MockStoreBuilder().withRoster(['u', 'v', 'w', 'x', 'y', 'z']).build();

  const { container } = render(
    <Provider store={store}>
      <RosterModifiersController />
    </Provider>,
  );
  userEvent.click(container.querySelector('.restricted-selector__control'));
  userEvent.click(container.querySelectorAll('.restricted-selector__option')[0]);

  const storeActions = store.getActions();
  expect(storeActions.length).toEqual(1);
  expect(storeActions[0].type).toEqual('requiredRestricted/setRestricted');
  expect(storeActions[0].payload).toEqual(['u']);
});

test('should run requiredUnitSelector function when clicked', () => {
  const store = new MockStoreBuilder().withRoster(['u', 'v', 'w', 'x', 'y', 'z']).build();

  const { container } = render(
    <Provider store={store}>
      <RosterModifiersController />
    </Provider>,
  );
  userEvent.click(container.querySelector('.required-selector__control'));
  userEvent.click(container.querySelectorAll('.required-selector__option')[0]);

  const storeActions = store.getActions();
  expect(storeActions.length).toEqual(1);
  expect(storeActions[0].type).toEqual('requiredRestricted/setRequired');
  expect(storeActions[0].payload).toEqual(['u']);
});

test('options should disappear and become disabled in the required menu', () => {
  const store = new MockStoreBuilder()
    .withDraftStatus(false)
    .withRequiredUnits(['w'])
    .withRestrictedUnits(['u', 'v'])
    .withRoster(['u', 'v', 'w', 'x', 'y', 'z'])
    .build();

  const { asFragment, container } = render(
    <Provider store={store}>
      <RosterModifiersController />
    </Provider>,
  );
  userEvent.click(container.querySelector('.required-selector__control'));

  expect(asFragment()).toMatchSnapshot();
});
