import * as React from 'react';
import Button from 'material-ui/Button';
import Reboot from 'material-ui/Reboot';

export default class ImDocApp extends React.Component {
  render() {
    return (
      <div>
        <Reboot/>
        <Button variant="raised" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}
