import * as React from 'react';
import Content from '../content';
import { component } from './data';

const content = `
  // content
  var x = '组件';
`;

class Component extends React.Component {
  render() {
    return (
      <Content header={component.text}>{content}</Content>
    );
  }
}

export default Component;
