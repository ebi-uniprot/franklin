import React from 'react';
import { fireEvent } from '@testing-library/react';
import Publication from '../publication';
import publicationData from '../__mocks__/publications';
import renderWithRouter from '../../testHelpers/renderWithRouter';

let rendered;

describe('Publication component', () => {
  beforeEach(() => {
    const {
      title,
      authors,
      abstract,
      infoData,
      journalInfo,
      pubmedId,
      statistics,
    } = publicationData;

    rendered = renderWithRouter(
      <Publication
        title={title}
        authors={authors}
        abstract={abstract}
        infoData={infoData}
        journalInfo={journalInfo}
        pubmedId={pubmedId}
        statistics={statistics}
      />
    );
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should expand authors', async () => {
    const { queryByText, getByText, findByText } = rendered;
    expect(queryByText('Darwin K.')).toBeNull();
    fireEvent.click(getByText('[...]'));
    const author = await findByText('Darwin K.');
    expect(author).toBeTruthy();
  });

  test('should expand abstract', async () => {
    const { queryByText, getByText, findByText } = rendered;
    expect(queryByText(/Captain Fitzroy/)).toBeNull();
    fireEvent.click(getByText('View abstract [...]'));
    const abstract = await findByText(/Captain Fitzroy/);
    expect(abstract).toBeTruthy();
  });
});
