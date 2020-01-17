import React from 'react';
import { loremIpsum } from 'lorem-ipsum';
import { ButtonModal } from '../src/components';

export default {
  title: 'Atoms|Modal',
  parameters: {
    purposeFunction: {
      purpose: 'Display extra contextual information, offer the user choices',
      function:
        'Overlay content on top of the current page, obscuring the page content.',
    },
  },
};

export const modal = () => (
  <ButtonModal buttonText="click me" title="My great modal window">
    {loremIpsum(45)}
  </ButtonModal>
);