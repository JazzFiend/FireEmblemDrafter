import React from 'react';
import { render, cleanup } from '@testing-library/react';
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
