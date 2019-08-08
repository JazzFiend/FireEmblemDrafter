import React from 'react';
import {
  render,
  fireEvent,
  cleanup, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FireEmblemDrafter } from '../FireEmblemDrafter';

afterEach(cleanup);

test('renders and matches snapshot', () => {
  const { asFragment } = render(<FireEmblemDrafter roster={['x', 'y', 'z']} teamSize={2} isRandom={false} />);
  expect(asFragment()).toMatchSnapshot();
});

test('draft should start when button is clicked', () => {
  const { getByTestId } = render(<FireEmblemDrafter roster={['1', '2']} teamSize={1} isRandom={false} />);
  fireEvent.click(getByTestId('start-draft-button'));
  expect(getByTestId('start-draft-button')).toHaveTextContent('Restart Draft!');
  expect(getByTestId('pick')).toBeVisible();
})

test('should add to team when pick is selected', () => {
  const { getByTestId, getAllByTestId } = render(<FireEmblemDrafter roster={['a', 'b', 'c']} teamSize={1} isRandom={false} />);
  fireEvent.click(getByTestId('start-draft-button'));
  fireEvent.click(getAllByTestId('pick-button')[0]);
  expect(getByTestId('team-list')).toHaveTextContent('b');
});

test('should complete draft when draft is over', () => {
  const { getByTestId, getAllByTestId } = render(<FireEmblemDrafter roster={['1', '2', '3']} teamSize={2} isRandom={false} />);
  fireEvent.click(getByTestId('start-draft-button'));
  fireEvent.click(getAllByTestId('pick-button')[0]);
  fireEvent.click(getAllByTestId('pick-button')[0]);
  expect(getByTestId('team-list')).toHaveTextContent('2 3');
  expect(getByTestId('start-draft-button')).toHaveTextContent('Start Draft!');
});
