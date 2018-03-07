import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectTestId } from './selectors';
import { Dispatch } from 'redux';
import { clickAction } from './actions';

type TestProps = {};
type StateProps = {
  id?: string;
};
type DispatchProps = {
  clickSpan?(): void;
};
type Props = TestProps & StateProps & DispatchProps;

function combiner(id: string): StateProps {
  return {id};
}

const mapStateToProps = createSelector(makeSelectTestId, combiner);
const mapDispatchToProps = function (dispatch: Dispatch<{}>): DispatchProps {
  return {
    clickSpan: () => {
      dispatch(clickAction());
    }
  };
};

class Test extends React.PureComponent<Props> {
  render() {
    return (
      <span onClick={this.props.clickSpan}>{this.props.id}</span>
    );
  }
}

const withConnect = connect<StateProps, DispatchProps, TestProps>(mapStateToProps, mapDispatchToProps);

export default withConnect(Test);
