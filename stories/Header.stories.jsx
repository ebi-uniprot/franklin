import React from 'react';
import Header from '../src/components/header';
import { MainSearch } from '../src/components/index';
import UniProtLogo from '../src/svg/swissprot.svg';

export default {
  title: 'Layout|Header',
  parameters: {
    purposeFunction: {
      purpose: '',
      function: '',
    },
  },
};

const links = [
  { label: 'Link 1' },
  {
    label: 'Links 2',
    links: [
      { label: 'sublink 1', path: '/' },
      { label: 'sublink 2', path: '/' },
      { label: 'sublink 3', path: '/' },
    ],
  },
  { label: 'Link 3' },
];

export const header = () => (
  <Header
    logo={<UniProtLogo width={30} />}
    links={links}
    search={<MainSearch />}
  />
);

export const headerNegative = () => (
  <Header
    logo={<UniProtLogo width={30} />}
    links={links}
    search={<MainSearch />}
    isNegative
  />
);