import { render } from '@testing-library/react';

import LongNumber from '../long-number';

describe('Long number component', () => {
  test('should render', () => {
    const { asFragment } = render(<LongNumber>{1000000}</LongNumber>);
    expect(asFragment()).toMatchSnapshot();
  });
});
