import * as React from 'react';
import Content from '../content';
import { quickStarted } from './data';

const content = `
  <script type="text/javascript" src="http(s)://path/to/main.js"></script>
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
