import * as React from 'react';
import Content from '../content';
import { settings } from './data';

const content = `
  {
    // 说明
    "lhwtest":"test"
  }
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
