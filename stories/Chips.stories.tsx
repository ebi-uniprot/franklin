import { CSSProperties } from 'react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Chip } from '../src/components';

import colors from '../src/styles/_colours.scss';

export default {
  title: 'Core/Chip',
  decorators: [withKnobs()],
  parameters: {
    purposeFunction: {
      function: 'Can be used to make selections or trigger actions',
      purpose: 'Display compact discrete information',
    },
  },
};

interface Style extends CSSProperties {
  // TODO: define and extend the supported custom properties in franklin
  // TODO: find a way to expose them globally when using franklin elements
  '--main-chip-color': string;
}

export const chips = () => (
  <Chip
    title={text('title', 'this is a chip', 'Props')}
    compact={boolean('compact', false, 'Props')}
    disabled={boolean('disabled', false, 'Props')}
    className={select(
      'className',
      ['primary', 'secondary'],
      'primary',
      'Props'
    )}
    style={
      {
        '--main-chip-color': select(
          '--main-chip-color',
          colors,
          colors.colourSapphireBlue,
          'Custom Properties'
        ),
      } as Style
    }
  >
    Chip content
  </Chip>
);

export const withClick = () => (
  <>
    <Chip title="this is a primary chip" onClick={action('click on primary')}>
      Primary
    </Chip>
    <Chip className="secondary" onClick={action('click on secondary')}>
      Secondary
    </Chip>
  </>
);

export const removable = () => (
  <>
    <Chip onRemove={action('Remove chip')}>Primary</Chip>
    <Chip onRemove={action('Remove chip')} className="secondary">
      Secondary
    </Chip>
  </>
);
