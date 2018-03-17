import * as React from 'react';

class ImSidebarListComponent extends React.PureComponent<Props> {
  render() {
    const {show, items} = this.props;
    return (
      <ul className={`jjsim-list ${show ? '' : 'hide'}`}>
        {items.map((item) => (
          <li className={`jjsim-bd-item ${item.isCurr ? 'curr' : ''}`} key={item.id}>
            <div className="jjsim-item-img">
              <img src={item.avatar}/>
            </div>
            <em
              className="num"
              title={String(item.unread)}
              style={{
                visibility: item.unread > 0 ? 'visible' : 'hidden'
              }}
            >
              {item.unread}
            </em>
            <span className="name" title={item.nick}>{item.nick}</span>
            <span className="text" title={item.msg}>{item.msg}</span>
            <span className="time" title={item.time}>{item.time}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default ImSidebarListComponent;

export interface Props {
  show: boolean;
  items: Item[];
}

export interface Item {
  id: string;
  avatar: string;
  nick: string;
  msg: string;
  time: string;
  unread: number;
  isCurr: boolean;
}
