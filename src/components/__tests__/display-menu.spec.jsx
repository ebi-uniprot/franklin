import { screen, fireEvent } from '@testing-library/react';

import DisplayMenu from '../display-menu';

import displayMenuData, {
  displayMenuDummyLeft1,
  displayMenuDummyLeft2,
} from '../__mocks__/displayMenu';

import renderWithRouter from '../../testHelpers/renderWithRouter';

let rendered;

describe('Display menu component', () => {
  beforeEach(() => {
    rendered = renderWithRouter(<DisplayMenu data={displayMenuData} />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should toggle item content', async () => {
    expect(
      screen
        .getAllByText(displayMenuDummyLeft1)[0]
        .closest('.display-menu__item_content')
    ).toBeTruthy();

    expect(screen.queryByText(displayMenuDummyLeft2)).toBeNull();

    fireEvent.click(screen.getByText(displayMenuData[1].name));
    const newContent2 = await screen.findByText(displayMenuDummyLeft2);
    expect(newContent2).toBeTruthy();
  });
});
