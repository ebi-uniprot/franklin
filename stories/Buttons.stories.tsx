import { CSSProperties } from 'react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';

import { Button, DownloadIcon } from '../src/components';

import colors from '../src/styles/_colours.scss';

export default {
  title: 'Forms/Button',
  decorators: [withKnobs()],
  parameters: {
    purposeFunction: {
      purpose: '',
      function: '',
    },
  },
};

const useColor = () =>
  select(
    '--main-button-color',
    colors,
    colors.colourUniprotkb,
    'Custom Properties'
  );
const useDisabled = () => boolean('disabled', false, 'Props');

export const Buttons = () => {
  const color = useColor();
  const disabled = useDisabled();
  return (
    <div style={{ '--main-button-color': color } as CSSProperties}>
      <div>
        <Button disabled={disabled}>Primary</Button>
      </div>
      <div>
        <Button variant="secondary" disabled={disabled}>
          Secondary
        </Button>
      </div>
      <div>
        <Button variant="tertiary" disabled={disabled}>
          Tertiary
        </Button>
      </div>
    </div>
  );
};

export const ButtonGroups = () => {
  const color = useColor();
  const disabled = useDisabled();
  return (
    <div style={{ '--main-button-color': color } as CSSProperties}>
      <div className="button-group">
        <button className="button tertiary" type="button">
          One
        </button>
        <button className="button tertiary" type="button">
          Two
        </button>
        <button className="button tertiary" type="button">
          Three
        </button>
      </div>
      <div className="button-group">
        <Button disabled={disabled}>One</Button>
        <Button disabled={disabled}>Two</Button>
        <Button disabled={disabled}>Three</Button>
      </div>
      <div className="button-group">
        <Button variant="secondary" disabled={disabled}>
          One
        </Button>
        <Button variant="secondary" disabled={disabled}>
          Two
        </Button>
        <Button variant="secondary" disabled={disabled}>
          Three
        </Button>
      </div>
      <div className="button-group">
        <Button variant="tertiary" disabled={disabled}>
          One
        </Button>
        <Button variant="tertiary" disabled={disabled}>
          Two
        </Button>
        <Button variant="tertiary" disabled={disabled}>
          Three
        </Button>
      </div>
    </div>
  );
};

export const WithIcon = () => {
  const color = useColor();
  const disabled = useDisabled();
  return (
    <div style={{ '--main-button-color': color } as CSSProperties}>
      <div>
        <Button disabled={disabled}>
          <DownloadIcon />
          Primary
        </Button>
      </div>
      <div>
        <Button variant="secondary" disabled={disabled}>
          <DownloadIcon />
          Secondary
        </Button>
      </div>
      <div>
        <Button variant="tertiary" disabled={disabled}>
          <DownloadIcon />
          Tertiary
        </Button>
      </div>
    </div>
  );
};
