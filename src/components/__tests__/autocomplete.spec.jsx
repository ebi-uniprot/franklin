import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Autocomplete from '../autocomplete';
import { flattenedPaths } from '../../mock-data/tree-data';

describe('Autocomplete component', () => {
  test('should render', () => {
    const { asFragment } = render(
      <Autocomplete data={flattenedPaths} onSelect={d => d} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render with props: showDropdownUpdated & clearOnSelect', () => {
    const { asFragment } = render(
      <Autocomplete
        data={flattenedPaths}
        onSelect={d => d}
        showDropdownUpdated={d => d}
        clearOnSelect
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should filter options', () => {
    const options = [
      {
        pathLabel: 'Find this',
      },
      {
        pathLabel: 'Also find this',
      },
      {
        pathLabel: 'You FIND this?!',
      },
      {
        pathLabel: 'Found nothing',
      },
      {
        pathLabel: '',
      },
    ];
    const filtered = Autocomplete.filterOptions(options, 'find');
    const expected = [
      {
        pathLabel: 'Find this',
      },
      {
        pathLabel: 'Also find this',
      },
      {
        pathLabel: 'You FIND this?!',
      },
    ];
    expect(filtered).toEqual(expected);
  });

  test('should not submit if previously submitted text is the same as the current input text value', () => {
    const onSelect = jest.fn();
    const { queryByTestId } = render(
      <Autocomplete data={flattenedPaths} onSelect={onSelect} />
    );
    const searchInput = queryByTestId('search-input');
    const value = { target: { value: 'foo' } };
    fireEvent.change(searchInput, value);
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    fireEvent.change(searchInput, value);
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  test('shouldShowDropdown should return false if length of text input is less than minCharsToShowDropdown', () => {
    expect(
      Autocomplete.shouldShowDropdown({
        textInputValue: 'fo',
        data: [],
        selected: true,
        filter: true,
        minCharsToShowDropdown: 3,
      })
    ).toBe(false);
  });
});
