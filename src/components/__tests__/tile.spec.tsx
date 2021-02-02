import { fireEvent, render } from '@testing-library/react';

import Tile from '../tile';
import { ProtVistaIcon } from '..';

import colors from '../../styles/colours.scss';

let component: ReturnType<typeof render>;
const clickFn = jest.fn();

describe('Tile component', () => {
  beforeEach(() => {
    component = render(
      <Tile
        title="Tile title"
        subtitle="Subtitle"
        description="My description"
        backgroundImage={ProtVistaIcon}
        backgroundColor={colors.colourUniprotkb}
        onClick={clickFn}
        gradient
      />
    );
  });

  test('should render', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should handle click', () => {
    const { getByText } = component;
    fireEvent.click(getByText('Subtitle'));
    expect(clickFn).toHaveBeenCalled();
  });

  test('should render with default specified width', () => {
    const { asFragment } = render(
      <Tile title="Tile title" onClick={clickFn} width="20rem" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
