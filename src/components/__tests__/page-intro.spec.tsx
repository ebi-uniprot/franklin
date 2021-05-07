import { render, screen } from '@testing-library/react';

import PageIntro from '../page-intro';

describe('PageIntro component', () => {
  test('should render', () => {
    const { asFragment } = render(
      <PageIntro title="Title" resultsCount={1000}>
        <div>Some content</div>
      </PageIntro>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render title postscript', () => {
    render(
      <PageIntro
        title="Title"
        resultsCount={1000}
        titlePostscript={<i> from job ID123</i>}
      >
        <div>Some content</div>
      </PageIntro>
    );
    expect(
      screen.getByRole('heading', {
        name: /Title 1,000 results from job ID123/i,
      })
    ).toBeInTheDocument();
  });
});
