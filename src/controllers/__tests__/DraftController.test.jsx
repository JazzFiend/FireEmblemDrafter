import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import DraftController from '../DraftController';
import TestUtil from '../../testHelpers/TestUtil';

jest.mock('../../view/Pick', () => () => 'Pick');
afterEach(cleanup);

test('renders default Draft Controller when draft is in progress', () => {
  const store = TestUtil.createDraftInProgressMockStore(true);
  const { asFragment } = render(
    <Provider store={store}>
      <DraftController
        roster={['1', '2', '3']}
        restrictedCharacters={['1']}
        requiredCharacters={['2']}
        teamSize={1}
        randomizePicks={false}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('renders default Draft Controller when draft hasn\'t started', () => {
  const store = TestUtil.createDraftInProgressMockStore(false);
  const { asFragment } = render(
    <Provider store={store}>
      <DraftController
        roster={['1', '2', '3']}
        restrictedCharacters={['1']}
        requiredCharacters={['2']}
        teamSize={1}
        randomizePicks={false}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('starts draft when Start Draft button is pressed', () => {
  const store = TestUtil.createDraftInProgressMockStore(false);

  const { asFragment, getByTestId } = render(
    <Provider store={store}>
      <DraftController
        roster={['1', '2', '3']}
        restrictedCharacters={['1']}
        requiredCharacters={['2']}
        teamSize={1}
        randomizePicks={false}
      />
    </Provider>,
  );
  const button = getByTestId('start-draft-button');
  userEvent.click(button);
  expect(asFragment()).toMatchSnapshot();
});
