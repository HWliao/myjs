import * as React from 'react';
import ImSidebarHeader from '../../components/im-sidebar-header/im-sidebar-header.component';
import ImSidebarNologin from '../../components/im-sidebar-nologin/im-sidebar-nologin.component';
import ImSidebarNoagent from '../../components/im-sidebar-noagent/im-sidebar-noagent.component';
import ImSidebarList from '../../components/im-sidebar-list/im-sidebar-list.component';

type ImSidebarProps = {};
type StateProps = {};
type DispatchProps = {};
export type Props = ImSidebarProps | StateProps | DispatchProps;

class ImSidebarContainer extends React.PureComponent<Props> {
  render() {
    return (
      <div className="jjsim-wrap">
        <ImSidebarHeader title="test" up={true} unread={10} shake={true} onClick={() => console.log(1)}/>
        <div className="jjsim-bd scroll">
          <ImSidebarNologin show={false} title={'请先登入'} onToLogin={() => console.log(2)}/>
          <ImSidebarNoagent show={false} title={'没有消息'}/>
          <ImSidebarList
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
}

export default ImSidebarContainer;
