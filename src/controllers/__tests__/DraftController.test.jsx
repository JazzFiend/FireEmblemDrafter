import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import DraftController from '../DraftController';
import MockStoreBuilder from '../../testHelpers/MockStoreBuilder';

jest.mock('../../view/Pick', () => () => 'Pick');
afterEach(cleanup);

test('renders default Draft Controller when draft is in progress', () => {
  const store = new MockStoreBuilder()
    .withDraftStatus(true)
    .withRequiredUnits(['2'])
    .withRestrictedUnits(['1'])
    .build();

  const { asFragment } = render(
    <Provider store={store}>
      <DraftController
        randomizePicks={false}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('renders default Draft Controller when draft hasn\'t started', () => {
  const store = new MockStoreBuilder()
    .withDraftStatus(false)
    .withRequiredUnits(['2'])
    .withRestrictedUnits(['1'])
    .build();

  const { asFragment } = render(
    <Provider store={store}>
      <DraftController
        randomizePicks={false}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('starts draft when Start Draft button is pressed', () => {
  const store = new MockStoreBuilder()
    .withDraftStatus(false)
    .withRequiredUnits(['2'])
    .withRestrictedUnits(['1'])
    .withRoster(['1', '2', '3'])
    .withTeamSize(1)
    .build();

  const { asFragment, getByTestId } = render(
    <Provider store={store}>
      <DraftController
        randomizePicks={false}
      />
    </Provider>,
  );

  const button = getByTestId('start-draft-button');
  userEvent.click(button);

  expect(asFragment()).toMatchSnapshot();
});
