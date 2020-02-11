import React from 'react';
import { InPageNav } from '../src/components';
import { inPageNavItems } from '../src/components/in-page-nav-items';

// const sections = [
//   {
//     id: 'id1',
//     label: 'First link',
//   },
//   {
//     id: 'id2',
//     label: 'Second link',
//   },
//   {
//     id: 'id3',
//     label: 'Third link',
//     disabled: true,
//   },
// ];

export default {
  title: 'Navigation|In Page Navigation',
  parameters: {
    purposeFunction: {
      purpose:
        'Help with navigation, give an idea of the position on a very long page.',
      function: 'Quickly navigate to different sections of the current page.',
    },
  },
};

export const inPageNav = () => <InPageNav items={inPageNavItems} />;
