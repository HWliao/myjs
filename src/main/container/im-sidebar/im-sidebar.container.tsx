import * as React from 'react';
import ImSidebarHeader from '../../components/im-sidebar-header/im-sidebar-header.component';
import ImSidebarNologin from '../../components/im-sidebar-nologin/im-sidebar-nologin.component';
import ImSidebarNoagent from '../../components/im-sidebar-noagent/im-sidebar-noagent.component';
import ImSidebarList, { Item } from '../../components/im-sidebar-list/im-sidebar-list.component';
import { ConfigModelMap } from '../../im-api/model/config.model';
import { selectImApiConfig } from '../../im-api/selectors';
import { createSelector } from 'reselect';
import { ActionCreator } from 'redux';
import { connect } from 'react-redux';
import { selectLayoutUp } from '../im-layout/selectors';
import {
  ImSidebarClickHeaderAction,
  imSidebarClickHeaderAction,
  ImSidebarClickItemAction,
  imSidebarClickItemAction,
  ImSidebarClickLoginBtnAction,
  imSidebarClickLoginBtnAction
} from './actions';

type ImSidebarProps = {};
type StateProps = {
  sidebarTitle: string;
  nologinTitle: string;
  noagentTitle: string;
  loginBtnTitle: string;
  sidebarUpTip: string;
  sidebarDownTip: string;
  up: boolean;
};
type DispatchProps = {
  onHeaderClick: ActionCreator<ImSidebarClickHeaderAction>;
  onLoginBtnClick: ActionCreator<ImSidebarClickLoginBtnAction>;
  onItemClick: ActionCreator<ImSidebarClickItemAction>;
};
export type Props = ImSidebarProps & StateProps & DispatchProps;

function combiner(config: ConfigModelMap, up: boolean): StateProps {
  return {
    sidebarTitle: config.get('sidebarTitle'),
    nologinTitle: config.get('nologinTitle'),
    noagentTitle: config.get('noagentTitle'),
    loginBtnTitle: config.get('loginBtnTitle'),
    sidebarUpTip: config.get('sidebarUpTip'),
    sidebarDownTip: config.get('sidebarDownTip'),
    up
  };
}

const mapStateToProps = createSelector(
  selectImApiConfig,
  selectLayoutUp,
  combiner
);
export const mapDispatchToProps: DispatchProps = {
  onHeaderClick: imSidebarClickHeaderAction,
  onLoginBtnClick: imSidebarClickLoginBtnAction,
  onItemClick: imSidebarClickItemAction
};

class ImSidebarContainer extends React.PureComponent<Props> {
  render() {
    const {sidebarTitle, noagentTitle, nologinTitle, loginBtnTitle, sidebarUpTip, sidebarDownTip} = this.props;
    const {up} = this.props;
    return (
      <div className="jjsim-wrap">
        <ImSidebarHeader
          title={sidebarTitle}
          toggleTitle={up ? sidebarUpTip : sidebarDownTip}
          up={up}
          unread={10}
          shake={true}
          onClick={this.onHeaderClick}
        />
        <div className="jjsim-bd scroll">
          <ImSidebarNologin
            show={false}
            title={nologinTitle}
            btnTitle={loginBtnTitle}
            onToLogin={this.onLoginBtnClick}
          />
          <ImSidebarNoagent show={false} title={noagentTitle}/>
          <ImSidebarList
            onItemClick={this.onItemClick}
            show={true}
            items={[
              {
                id: 'lhw1',
                avatar: 'https://imgcloud.jjshome.com/pic/fang/2016-11/24/' +
                'FrWAfxshNWeuW3k8QFBiWM6g8rTT.jpg?imageView2/1/w/66/h/88',
                nick: '测试1',
                msg: '哈哈哈',
                time: '昨天',
                unread: 0,
                isCurr: true
              },
              {
                id: 'lhw2',
                avatar: 'https://imgcloud.jjshome.com/pic/fang/2016-11/24/' +
                'FrWAfxshNWeuW3k8QFBiWM6g8rTT.jpg?imageView2/1/w/66/h/88',
                nick: 'test2',
                msg: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                time: '2018-03-16',
                unread: 100,
                isCurr: false
              }
            ]}
          />
        </div>
      </div>
    );
  }

  onHeaderClick = () => {
    this.props.onHeaderClick(this.props.up);
  };
  onLoginBtnClick = () => {
    console.log(2);
    this.props.onLoginBtnClick();
  };
  onItemClick = (item: Item) => {
    console.log(item);
    this.props.onItemClick(item.id);
  };
}

const withConnect = connect<StateProps, DispatchProps, ImSidebarProps>(mapStateToProps, mapDispatchToProps);

export default withConnect(ImSidebarContainer);
