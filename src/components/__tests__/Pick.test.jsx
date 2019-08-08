import _ from 'lodash';
import React from 'react';
import {
  render,
  fireEvent,
  cleanup, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Pick from '../Pick';

afterEach(cleanup);

test('renders and matches snapshot', () => {
  const { asFragment } = render(<Pick pick={['a', 'b', 'c']} onClick={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

test('contains appropriate buttons', () => {
  const testPick =  ['x', 'y', 'z'];
  const { getAllByTestId } = render(<Pick pick={testPick} onClick={() => {}} />);
  let pickButtons = getAllByTestId('pick-button');

  expect(pickButtons.length).toBe(3);
  _.forEach(pickButtons, function(button, index) {
    expect(button).toHaveTextContent(testPick[index]);
  });
});

test('click runs passed in function', () => {
  const onClick = jest.fn();
  const { getByTestId } = render(<Pick pick={['x']} onClick={(index) => onClick(index)} />);

  fireEvent.click(getByTestId('pick-button'));
  expect(onClick).toHaveBeenCalledWith(0);
});
