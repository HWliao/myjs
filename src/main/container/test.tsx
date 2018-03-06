import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../store/stroe';

type Props = {
  id: string;
};

class Test extends React.PureComponent<Props> {
  render() {
    return (
      <span>{this.props.id}</span>
    );
  }
}

export default connect((state: State) => ({
  id: state.test ? state.test.id : '0'
}))(Test);
