import * as React from 'react';
import Content from '../content';
import { business } from './data';

const content = `
  // business
  var business = 'business';
`;

class Business extends React.Component {
  render() {
    return (
      <Content header={business.text}>{content}</Content>
    );
  }
}

export default Business;
