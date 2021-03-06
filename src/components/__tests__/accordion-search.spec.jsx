import { screen, render, fireEvent } from '@testing-library/react';

import AccordionSearch, { filterAccordionData } from '../accordion-search';

const props = {
  placeholder: 'Filter',
  onSelect: jest.fn(),
  selected: [],
  accordionData: [
    {
      title: 'Gene',
      id: '1',
      items: [
        {
          label: 'BRCA1',
          id: '1-1',
        },
        {
          label: 'BRCA2',
          id: '1-2',
        },
        {
          label: 'TP53',
          id: '1-3',
        },
      ],
    },
    {
      title: 'Organelle',
      id: '2',
      items: [
        {
          label: 'Ribosome',
          id: '2-1',
        },
        {
          label: 'Nucleus',
          id: '2-2',
        },
      ],
    },
  ],
};

describe('AccordionSearch', () => {
  test('should render', () => {
    const { asFragment } = render(<AccordionSearch {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('filterAccordionData should return filtered data with matching query', () => {
    const filteredAccordionData = filterAccordionData(
      props.accordionData,
      'Nucleus'
    );
    expect(filteredAccordionData).toHaveLength(1);
    expect(filteredAccordionData[0].items[0].id).toBe('2-2');
  });

  test('filterAccordionData should return no data with nonmatching query', () => {
    const filteredAccordionData = filterAccordionData(
      props.accordionData,
      'Zap'
    );
    expect(filteredAccordionData).toHaveLength(0);
  });

  test('should be two accordions with a total of five list items', () => {
    render(<AccordionSearch {...props} />);
    const content = screen.queryAllByTestId('accordion-content');
    expect(content).toHaveLength(2);
    const allListItems = content.reduce(
      (acc, node) => acc + node.querySelectorAll('li').length,
      0
    );
    expect(allListItems).toBe(5);
  });

  test('should match snapshot when input is entered', () => {
    render(<AccordionSearch {...props} />);
    const input = screen.queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Nucleus' } });
    const content = screen.queryAllByTestId('accordion-content');
    expect(content).toHaveLength(1);
    const listItems = content[0].querySelectorAll('li');
    expect(listItems).toHaveLength(1);
  });

  test('should call onSelect when item clicked', () => {
    render(<AccordionSearch {...props} />);
    const content = screen.queryAllByTestId('accordion-content');
    const listItemCheckbox = content[0].querySelector('li>label>input');
    fireEvent.click(listItemCheckbox);
    expect(props.onSelect).toHaveBeenCalled();
  });
});
