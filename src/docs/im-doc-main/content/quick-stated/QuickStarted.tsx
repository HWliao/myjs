import * as React from 'react';
import Content from '../content';

export const QUICK_STARTED_TO = '/doc/quick_started';

const content = `
  // 你说是吗
  var x = 1;
  console.log(1111);
`;

class QuickStarted extends React.Component<{}, {}> {
  render() {
    return (
      <Content>
        {content}
      </Content>
    );
  }
}

export default QuickStarted;
