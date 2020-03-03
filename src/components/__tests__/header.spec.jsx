import React from 'react';

import Header from '../header';
import renderWithRouter from '../../testHelpers/renderWithRouter';

describe('Header component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRouter(
      <Header links={[{ path: '/there', label: 'there' }]} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
