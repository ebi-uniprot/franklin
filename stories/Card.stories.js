import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../src/components';
import { getLipsumSentences } from '../src/mock-data/lipsum';

const links = [
  {
    name: '10 Protein Interactions',
    link: '#',
    color: 'red',
  },
  {
    name: '9 Pathways',
    link: '#',
    color: 'blue',
  },
  {
    name: '5 Diseases',
    link: '#',
    color: '#bada55',
  },
  {
    name: '72 Variants',
    link: '#',
    color: 'burlywood',
  },
];

export default {
  title: 'Layout|Card',
  parameters: {
    purposeFunction: {
      function:
        'Provide a contained section to show content for a given category.',
      purpose:
        'Create visually delimited areas to allow for easier scanning of content.',
    },
  },
};

export const card = () => (
  <Card title="Title" subtitle={<a to="/#">APOE_HUMAN - P02649</a>}>
    {getLipsumSentences()}
  </Card>
);

export const cardWithLinks = () => (
  <Card
    title="Title"
    subtitle={<Link to="/#">APOE_HUMAN - P02649</Link>}
    links={links}
  >
    {getLipsumSentences()}
  </Card>
);
