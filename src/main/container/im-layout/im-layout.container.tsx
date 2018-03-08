import * as React from 'react';
import { createSelector } from 'reselect';
import { selectTest } from '../../store/selectores';
import { Dispatch } from 'redux';
import { BaseState } from '../../store/reducers';
import { connect } from 'react-redux';

type ImLayoutProps = {};
type StateProps = {};
type DispatchProps = {};

type Props = ImLayoutProps & StateProps & DispatchProps;

function combiner(): StateProps {
  return {};
}

const mapStateToProps = createSelector(selectTest, combiner);
const mapDispatchToProps = function (dispatch: Dispatch<BaseState>): DispatchProps {
  return {};
};

class ImLayoutContainer extends React.PureComponent<Props> {
  render() {
    return (
      <div>im layout</div>
    );
  }
}

const withConnect = connect<StateProps, DispatchProps, ImLayoutProps>(mapStateToProps, mapDispatchToProps);

export default withConnect(ImLayoutContainer);
