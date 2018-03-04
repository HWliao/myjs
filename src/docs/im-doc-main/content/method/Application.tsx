import * as React from 'react';
import Content from '../content';
import { application } from './data';

const content = `
  // 应用
  var application  = 'application';
`;

class Application extends React.Component {
  render() {
    return (
      <Content header={application.text}>{content}</Content>
    );
  }
}

export default Application;
