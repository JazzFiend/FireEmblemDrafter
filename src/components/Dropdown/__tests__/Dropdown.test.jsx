import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import _ from 'lodash';
import '@testing-library/jest-dom/extend-expect';

import Dropdown from '../Dropdown';

afterEach(cleanup);

const testData = [
  {
    id: 0,
    title: 'item0',
  },
  {
    id: 1,
    title: 'item1',
  },
  {
    id: 2,
    title: 'item2',
  },
]

test('dropdown has correct title', () => {
  const { getByTestId } = render(<Dropdown defaultText='Testing' />);
  let dropdown = getByTestId('dropdown');
  expect(dropdown).toHaveTextContent('Testing');
});

test('clicking dropdown should display given list', () => {
  const { getByTestId, getAllByTestId } = render(<Dropdown defaultText='Testing' dropdownItems={testData} />);

  fireEvent.click(getByTestId('dropdown'));

  let dropdownItems = getAllByTestId('dropdown-item');
  expect(dropdownItems.length).toBe(3);
  _.forEach(dropdownItems, function (dropdownItem, index) {
    expect(dropdownItem).toHaveTextContent(testData[index].title);
  });
});

test('clicking item in dropdown selects the item', () => {
  const onClick = jest.fn();
  const { getByTestId, getAllByTestId } = render(<Dropdown defaultText='Testing' dropdownItems={testData} onClick={(i) => onClick(i)} />);

  fireEvent.click(getByTestId('dropdown'));
  let dropdownItems = getAllByTestId('dropdown-item');
  fireEvent.click(dropdownItems[0]);
  expect(getByTestId('dropdown')).toHaveTextContent('item0');
  expect(onClick).toHaveBeenCalledWith(0);
});
