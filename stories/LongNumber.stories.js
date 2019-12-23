import React from 'react';
import LongNumber from '../src/components/long-number';

export default {
  title: 'Atoms/Long number',
};

export const longNumber = () => {
  return <LongNumber>{1000000000}</LongNumber>;
};

export const shortNumber = () => {
  return <LongNumber>{100}</LongNumber>;
};
