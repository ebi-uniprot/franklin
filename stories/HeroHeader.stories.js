import React from 'react';
import { loremIpsum } from 'lorem-ipsum';
import { HeroHeader } from '../src/components';

export default {
  title: 'Layout|Hero header',
  parameters: {
    purposeFunction: {
      purpose: 'Provide an entry point',
      function: 'Tell the user what the resource is about and offer a way in',
    },
  },
};

export const heroHeader = () => (
  <HeroHeader title="Title" footer={loremIpsum({ count: 25, units: 'words' })}>
    <input type="text" />
  </HeroHeader>
);
