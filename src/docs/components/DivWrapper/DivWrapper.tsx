import * as React from 'react';
import { ReactNode } from 'react';

/**
 * 用div包装主键
 * @param {Readonly<{children: React.ReactNode}> & Readonly<P>} props
 * @return {any}
 * @constructor
 */
export default function DivWrapper<P>(props: Readonly<{ children: ReactNode }> & Readonly<P>) {
  return (
    <div {...props}>{props.children}</div>
  );
}
