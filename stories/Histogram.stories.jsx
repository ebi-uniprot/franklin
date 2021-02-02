import { useEffect, useRef, useState } from 'react';

import { withKnobs, select, text, number } from '@storybook/addon-knobs';

import { Histogram } from '../src/components';

import {
  getUniformSample,
  getGaussianSample,
} from '../src/mock-data/probability-distribution-sample';

import colors from '../src/styles/_colours.scss';

export default {
  title: 'Visualisation/Histogram',
  decorators: [withKnobs()],
  parameters: {
    purposeFunction: {
      purpose: 'purpose',
      function: 'function',
    },
  },
};

const nValues = 1000;
const gaussianSample = getGaussianSample(0, 1, nValues);
const uniformSample = getUniformSample(-10, 10, nValues);

const gaussianMin = Math.min(...gaussianSample);
const gaussianMax = Math.max(...gaussianSample);

// take about half of the values
const randomFilter = () => Math.random() > 0.5;

const ChangingGaussianComponent = () => {
  const interval = useRef();

  // eslint-disable-next-line no-shadow
  const [filteredSample, setFilteredSample] = useState(
    gaussianSample.filter(randomFilter)
  );

  useEffect(() => {
    interval.current = setInterval(() => {
      setFilteredSample(gaussianSample.filter(randomFilter));
    }, 3000);
    return () => clearInterval(interval.current);
  }, []);

  return (
    <Histogram
      values={filteredSample}
      unfilteredValues={gaussianSample}
      nBins={number('Number of bins', 20, { min: 1, step: 1 }, 'Props')}
      min={gaussianMin}
      max={gaussianMax}
      xLabel={text('X label', 'Value', 'Props')}
      yLabel={text('Y label', 'Frequency', 'Props')}
      unfilteredValuesShadow={0.1}
      style={{
        '--main-histogram-color': select(
          '--main-histogram-color',
          colors,
          colors.colourGreyscale400,
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

export const Gaussian = () => (
  <Histogram
    values={gaussianSample}
    nBins={number('Number of bins', 20, { min: 1, step: 1 }, 'Props')}
    xLabel={text('X label', 'Value', 'Props')}
    yLabel={text('Y label', 'Frequency', 'Props')}
    style={{
      '--main-histogram-color': select(
        '--main-histogram-color',
        colors,
        colors.colourGreyscale400,
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
export const Uniform = () => (
  <Histogram
    values={uniformSample}
    binSize={number('Bin size', 1, undefined, 'Props')}
    xLabel={text('X label', 'Value', 'Props')}
    yLabel={text('Y label', 'Frequency', 'Props')}
    style={{
      '--main-histogram-color': select(
        '--main-histogram-color',
        colors,
        colors.colourGreyscale400,
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
export const ChangingGaussian = () => <ChangingGaussianComponent />;
