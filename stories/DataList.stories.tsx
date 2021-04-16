import { action } from '@storybook/addon-actions';

import { DataList, DataListWithLoader, Card } from '../src/components';
import {
  DataDecorator,
  DataLoaderDecorator,
} from '../src/decorators/DataDecorator';

export default {
  title: 'Data/Data List',
  parameters: {
    purposeFunction: {
      purpose: '',
      function: '',
    },
  },
};

export const dataList = () => (
  <DataDecorator>
    {(props) => (
      <DataList
        {...props}
        dataRenderer={(content) => <>{Object.values(content)}</>}
      />
    )}
  </DataDecorator>
);

export const dataListLoading = () => (
  <DataDecorator>
    {(props) => (
      <DataList
        {...props}
        loading
        dataRenderer={(content) => (
          <>
            {Object.values(content)}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore we know it doesn't exist, it's on purpose */}
            {content.complex.value}
          </>
        )}
      />
    )}
  </DataDecorator>
);

export const dataListWithLoader = () => (
  <DataLoaderDecorator>
    {(props) => (
      <DataListWithLoader
        {...props}
        dataRenderer={(content) => <>{Object.values(content)}</>}
      />
    )}
  </DataLoaderDecorator>
);

export const dataListWithLoaderAndCards = () => (
  <DataLoaderDecorator>
    {(props) => (
      <DataListWithLoader
        {...props}
        dataRenderer={(content) => (
          <Card onSelect={action('onSelect')}>{Object.values(content)}</Card>
        )}
      />
    )}
  </DataLoaderDecorator>
);
