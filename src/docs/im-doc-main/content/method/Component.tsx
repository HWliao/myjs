import * as React from 'react';
import Content from '../content';
import { component } from './data';

const content = `
  // im初始化分为以下几部分
  // 1.动态创建一个im实例
  // 2.设置config
  // 3.初始化组件

  // 调用全局函数创建一个im实例
  // 参数1(可选): 配置对象 若传递一个配置对象在内部自动调用im.setConfig(config)
  // 建议使用这种方式传递配置对象
  window.createIm(config?:ConfigModel)
    .then(( im:Im )=>{
      // 返回im实例

      // 设置配置对象
      // 参数1:配置对象
      // 可以多次调用,可以动态替换掉某些配置
      im.setConfig(config);

      // 初始化根组件
      // 在调用im.init之前必须至少调用一次im.setConfig
      // 可以在初始化和调用im.destroy后调用,否则会抛出异常
      im.init();

      // 绑定事件,其他初始化
      // 或者返回一个promise

      // 销毁根组件
      // 在调用im.destroy之前必须先调用im.init,否则会抛出异常
      im.destroy();

      // 注意这里的初始化和销毁都是针对根UI组件
      // 内部服务,数据 在createIm时被创建
    })
    .catch((err)=>{
      // 处理创建组件时的错误,一般不会发生
    })
`;

class Component extends React.Component {
  render() {
    return (
      <Content header={component.text}>{content}</Content>
    );
  }
}

export default Component;
