import * as React from 'react';
import { createSelector } from 'reselect';
import { Dispatch } from 'redux';
import { BaseState } from '../../store/reducers';
import { connect } from 'react-redux';
import { selectLayoutShow, selectLayoutUp } from './selectors';

type ImLayoutProps = {};
type StateProps = {
  show: boolean;
  up: boolean;
};
type DispatchProps = {};

type Props = ImLayoutProps & StateProps & DispatchProps;

function combiner(show: boolean, up: boolean): StateProps {
  return {show, up};
}

const mapStateToProps = createSelector(selectLayoutShow, selectLayoutUp, combiner);
const mapDispatchToProps = function (dispatch: Dispatch<BaseState>): DispatchProps {
  return {};
};

class ImLayoutContainer extends React.PureComponent<Props> {
  render() {
    const {show, up} = this.props;
    const className = `jjsim ${up ? '' : 'im-fold'} ${show ? '' : 'hide'}`;
    return (
      <div className={className}>
        <div className="jjsim-shandow clearfix">
          im layout
        </div>
      </div>
    );
  }
}

const withConnect = connect<StateProps, DispatchProps, ImLayoutProps>(mapStateToProps, mapDispatchToProps);

export default withConnect(ImLayoutContainer);
