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
          <ImSidebarNologin/>
          <ImSidebarNoagent/>
          <ImSidebarList/>
        </div>
      </div>
    );
  }
}

export default ImSidebarContainer;
