import React from 'react';

export default {
  pubmedId: 123456,
  statistics: {
    reviewedProteinCount: 1,
    unreviewedProteinCount: 0,
    mappedProteinCount: 3,
  },
  title: 'The Zoology of the Voyage of H.M.S. Beagle.',
  authors: [
    'Darwin C.',
    'Darwin B.',
    'Darwin A.',
    'Darwin D.',
    'Darwin E.',
    'Darwin F.',
    'Darwin G.',
    'Darwin H.',
    'Darwin I.',
    'Darwin J.',
    'Darwin K.',
    'Darwin X.',
  ],
  abstract:
    'The Zoology of the Voyage of H.M.S. Beagle Under the Command of Captain Fitzroy, R.N., during the Years 1832 to 1836 is a 5-part book published unbound in nineteen numbers as they were ready, between February 1838 and October 1843.[1] It was written by various authors, and edited and superintended by Charles Darwin, publishing expert descriptions of the collections he had made during the Beagle voyage.[2]',
  infoData: [
    {
      title: 'Tortoise',
      content: (
        <em>
          Reptile species of the family Testudinidae of the order Testudines
          (the turtles).
        </em>
      ),
    },
    {
      title: 'Beetles',
      content: 'Charles really liked them.',
    },
  ],
  journalInfo: {
    publicationDate: '1988',
    journal: 'Nature',
    firstPage: '525',
    lastPage: '527',
    volume: '331',
    doiId: '10.1038/331525a0',
  },
};
