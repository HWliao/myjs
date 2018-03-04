import * as React from 'react';
import Content from '../content';
import { settings } from './data';

const content = `
  // settings
  var x = '这是设置';
`;

class Settings extends React.Component {
  render() {
    return (
      <Content header={settings.text}>
        {content}
      </Content>
    );
  }
}

export default Settings;
