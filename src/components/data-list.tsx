import { ReactNode, HTMLAttributes } from 'react';

import withDataLoader, { WrapperProps } from './data-loader';

export type Props<T, ID = string> = {
  /**
   * The data to be displayed
   */
  data: T[];
  /**
   * A function that returns a unique ID for each of the data objects.
   * Same function signature as a map function.
   */
  getIdKey: (datum: T, index: number, data: T[]) => ID;
  /**
   * A renderer function for each item of the list.
   * Same function signature as a map function.
   */
  dataRenderer: (datum: T, index: number, data: T[]) => ReactNode;
};

export function DataList<
  T extends Record<string, unknown>,
  ID extends string | number = string
>({
  data,
  getIdKey,
  dataRenderer,
  ...props
}: Props<T, ID> & HTMLAttributes<HTMLElement>) {
  return (
    <>
      {data.map((datum, index) => (
        <section key={getIdKey(datum, index, data)} {...props}>
          {dataRenderer(datum, index, data)}
        </section>
      ))}
    </>
  );
}

export const DataListWithLoader = <
  T extends Record<string, unknown>,
  ID extends string | number = string
>(
  props: WrapperProps<T> & Props<T, ID> & HTMLAttributes<HTMLElement>
) => withDataLoader<T, typeof props>(DataList)(props);
