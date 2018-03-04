import * as React from 'react';
import Content from '../content';
import { ui } from './data';

const content = `
  // 显示/隐藏
  // 参数1: true 显示 false 隐藏  默认 true
  im.show(flag:boolean);
  // 展开收起
  // 参数1: true up false down 不传递 toggle
  im.toggleUpDown(flag?:boolean);
`;

class Ui extends React.Component {
  render() {
    return (
      <Content header={ui.text}>{content}</Content>
    );
  }
}

export default Ui;
