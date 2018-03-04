import * as React from 'react';
import Content from '../content';
import { quickStarted } from './data';

const content = `
  // 你说是吗
  var x = 1;
  console.log(1111);
`;

class QuickStarted extends React.Component<{}, {}> {
  render() {
    return (
      <Content header={quickStarted.text}>
        {content}
      </Content>
    );
  }
}

export default QuickStarted;
