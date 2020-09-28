import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Tabs, Tab } from '../tabs';

jest.mock('uuid', () => {
  return {
    v1: jest.fn(() => 'abcd'),
  };
});

afterEach(cleanup);

describe('Tabs', () => {
  test('should render', () => {
    const { asFragment } = render(
      <Tabs>
        <Tab title={<div>Title 1</div>}>blah</Tab>
        <Tab title="Title 2">blaher</Tab>
        <Tab title="Title 3">blahest</Tab>
      </Tabs>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render other default tab', () => {
    const { asFragment } = render(
      <Tabs>
        <Tab title={<div>Title 1</div>}>blah</Tab>
        <Tab title="Title 2">blaher</Tab>
        <Tab title="Title 3" defaultSelected>
          blahest
        </Tab>
      </Tabs>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render tabs and pass extra props', () => {
    const { asFragment } = render(
      <Tabs data-value="value">
        <Tab title={<div>Title 1</div>} aria-label="blah!">
          blah
        </Tab>
        <Tab title="Title 2">blaher</Tab>
        <Tab title="Title 3" className="merged-class" data-key="3">
          blahest
        </Tab>
      </Tabs>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should show corresponding content when 2nd tab title is clicked', () => {
    const { queryAllByTestId, queryByTestId } = render(
      <Tabs active="b">
        <Tab id="a" title={<div>Title 1</div>}>
          blah
        </Tab>
        <Tab id="b" title="Title 2">
          blaher
        </Tab>
        <Tab id="c" title="Title 3">
          blahest
        </Tab>
      </Tabs>
    );
    const title = queryAllByTestId('tab-title');
    fireEvent.click(title[1]);
    const content = queryByTestId('tab-content');
    expect(content).toHaveTextContent('blaher');
  });
});
