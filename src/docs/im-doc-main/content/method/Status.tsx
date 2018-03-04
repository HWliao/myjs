import * as React from 'react';
import Content from '../content';
import { status } from './data';

const content = `
  // 初始化状态
  // 返回boolean值
  im.isInited();
  // 当前配置
  // 返回一config对象的拷贝
  im.getConfig()
  // 展开状态
  // 返回boolean值
  im.isUp();
  // 显示/隐藏状态
  // 返回boolean值
  im.isShow();
`;

class Status extends React.Component {
  render() {
    return (
      <Content header={status.text}>{content}</Content>
    );
  }
}

export default Status;
