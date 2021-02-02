import { useState } from 'react';

import { withKnobs, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { HistogramFilter } from '../src/components';

import {
  getUniformSample,
  getGaussianSample,
} from '../src/mock-data/probability-distribution-sample';

import colors from '../src/styles/_colours.scss';

export default {
  title: 'Forms/Histogram Filter',
  decorators: [withKnobs()],
  parameters: {
    purposeFunction: {
      purpose: 'purpose',
      function: 'function',
    },
  },
};

const [min, max] = [0, 1000];
const nValues = 1000;
const gaussianSample = getGaussianSample(
  (max - min) / 2,
  max / 8,
  nValues,
  min,
  max
);
const uniformSample = getUniformSample(min, max, nValues);

export const Gaussian = () => {
  const [range, setRange] = useState([min, max]);
  const handleChange = (newRange) => {
    action('range selected')(newRange);
    setRange(newRange);
  };
  return (
    <HistogramFilter
      min={min}
      max={max}
      selectedRange={range}
      onChange={handleChange}
      values={gaussianSample}
      style={{
        width: '25rem',
        '--main-histogram-color': select(
          '--main-histogram-color',
          colors,
          colors.weldonBlue,
          'Custom Properties'
        ),
        '--out-range-histogram-color': select(
          '--out-range-histogram-color',
          colors,
          colors.platinum,
          'Custom Properties'
        ),
        '--histogram-bar-gap': text(
          '--histogram-bar-gap',
          '-1px',
          'Custom Properties'
        ),
      }}
    />
  );
};

export const Uniform = () => {
  const [range, setRange] = useState([min, max]);

  const handleChange = (newRange) => {
    action('range selected')(newRange);
    setRange(newRange);
  };
  return (
    <HistogramFilter
      min={min}
      max={max}
      selectedRange={range}
      onChange={handleChange}
      values={uniformSample}
      style={{
        width: '25rem',
        '--main-histogram-color': select(
          '--main-histogram-color',
          colors,
          colors.weldonBlue,
          'Custom Properties'
        ),
        '--out-range-histogram-color': select(
          '--out-range-histogram-color',
          colors,
          colors.platinum,
          'Custom Properties'
        ),
        '--histogram-bar-gap': text(
          '--histogram-bar-gap',
          '-1px',
          'Custom Properties'
        ),
      }}
    />
  );
};
