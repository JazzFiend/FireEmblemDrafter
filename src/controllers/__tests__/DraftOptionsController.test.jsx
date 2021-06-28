import {
  render,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import DraftOptionsController from '../DraftOptionsController';
import TestUtil from '../../testHelpers/TestUtil';

afterEach(cleanup);

test('does not render draft options when game has not been selected', () => {
  const store = TestUtil.createDraftInProgressMockStore(false);
  const { asFragment } = render(
    <Provider store={store}>
      <DraftOptionsController
        gameSelected={false}
        defaultValue={10}
        maxTeamSize={99}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('does not render draft options when draft is in progress', () => {
  const store = TestUtil.createDraftInProgressMockStore(true);
  const { asFragment } = render(
    <Provider store={store}>
      <DraftOptionsController gameSelected={true} defaultValue={20} maxTeamSize={99} />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('renders draft options when game is selected and draft is not in progress', () => {
  const store = TestUtil.createDraftInProgressMockStore(false);
  const { asFragment } = render(
    <Provider store={store}>
      <DraftOptionsController gameSelected={true} defaultValue={30} maxTeamSize={99} />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('saves state of team size on change', () => {
  const dummy = jest.fn();
  const store = TestUtil.createDraftInProgressMockStore(false);
  const { getByTestId } = render(
    <Provider store={store}>
      <DraftOptionsController
        gameSelected={true}
        handleTeamSizeChange={dummy}
        defaultValue={0}
        maxTeamSize={99}
      />
    </Provider>,
  );
  userEvent.type(getByTestId('team-size-textbox'), '3');

  expect(dummy).toHaveBeenCalledWith(3);
});

test('displays error when team size is invalid', () => {
  const dummy = jest.fn();
  const store = TestUtil.createDraftInProgressMockStore(false);
  const { asFragment, getByTestId } = render(
    <Provider store={store}>
      <DraftOptionsController
        gameSelected={true}
        handleTeamSizeChange={dummy}
        defaultValue={0}
        maxTeamSize={99}
      />
    </Provider>,
  );
  userEvent.type(getByTestId('team-size-textbox'), '0');

  expect(asFragment()).toMatchSnapshot();
});

test('displays error when team size is too big', () => {
  const dummy = jest.fn();
  const store = TestUtil.createDraftInProgressMockStore(false);
  const { asFragment, getByTestId } = render(
    <Provider store={store}>
      <DraftOptionsController
        gameSelected={true}
        handleTeamSizeChange={dummy}
        defaultValue={10}
        maxTeamSize={10}
      />
    </Provider>,
  );
  userEvent.type(getByTestId('team-size-textbox'), '10');

  expect(asFragment()).toMatchSnapshot();
});
