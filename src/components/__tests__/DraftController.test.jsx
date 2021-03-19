import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DraftController from '../DraftController';

jest.mock('../Pick', () => () => 'Pick');

afterEach(cleanup);

test('renders default Draft Controller when draft is in progress', () => {
  const { asFragment } = render(
    <DraftController
      draftInProgress={true}
      handleDraftProgress={jest.fn()}
      roster={['1', '2', '3']}
      restrictedCharacters={['1']}
      requiredCharacters={['2']}
      teamSize={1}
      randomizePicks={false}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('renders default Draft Controller when draft hasn\'t started', () => {
  const { asFragment } = render(
    <DraftController
      draftInProgress={false}
      handleDraftProgress={jest.fn()}
      roster={['1', '2', '3']}
      restrictedCharacters={['1']}
      requiredCharacters={['2']}
      teamSize={1}
      randomizePicks={false}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('starts draft when Start Draft button is pressed', () => {
  const handleDraftProgressMock = jest.fn();

  const { asFragment, getByTestId } = render(
    <DraftController
      draftInProgress={false}
      handleDraftProgress={handleDraftProgressMock}
      roster={['1', '2', '3']}
      restrictedCharacters={['1']}
      requiredCharacters={['2']}
      teamSize={1}
      randomizePicks={false}
    />,
  );
  const button = getByTestId('start-draft-button');
  userEvent.click(button);
  expect(handleDraftProgressMock).toHaveBeenCalled();
  expect(asFragment()).toMatchSnapshot();
});
