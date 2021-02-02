import { withKnobs, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { loremIpsum } from 'lorem-ipsum';

import { Tile } from '../src/components';

import SVG from '../assets/uniprotkb_illustration.svg';
import colors from '../src/styles/_colours.scss';

export default {
  title: 'Navigation/Tile',
  decorators: [withKnobs()],
  parameters: {
    purposeFunction: {
      purpose:
        'Advertise a specific dataset of the website and provide searchable access to it.',
      function:
        'Provide a sneak peak and navigate to a searchable data section of the website.',
    },
  },
};

const useColor = () =>
  select(
    '--tile-background',
    colors,
    colors.colourUniprotkb,
    'Custom Properties'
  );

export const BasicTile = () => (
  <Tile
    title="Title"
    backgroundColor={useColor()}
    subtitle="Subtitle"
    description={loremIpsum()}
    width="20rem"
    onClick={action('clicked')}
  />
);

export const TileWithGradient = () => (
  <Tile
    title="Title"
    backgroundColor={useColor()}
    subtitle="Subtitle"
    description={loremIpsum()}
    gradient
    width="20rem"
    onClick={action('clicked')}
  />
);

export const TileWithContainer = () => (
  <div style={{ width: '40%' }}>
    <Tile
      title="Title"
      backgroundColor={useColor()}
      subtitle="Subtitle"
      description={loremIpsum()}
      gradient
      onClick={action('clicked')}
    />
  </div>
);

export const TileWithBackgroundImage = () => (
  <Tile
    title="Title"
    backgroundColor={useColor()}
    gradient
    subtitle="Subtitle"
    description={loremIpsum({ count: 1, units: 'paragraph' })}
    backgroundImage={<SVG />}
    onClick={action('clicked')}
    width="20rem"
  />
);
