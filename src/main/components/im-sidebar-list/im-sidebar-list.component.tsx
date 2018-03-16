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
              <span className={`jjsim-hd-num ${item.unread > 0 ? '' : 'hide'}`}>{item.unread}</span>
            </div>
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

interface Props {
  show: boolean;
  items: Item[];
}

// "https://imgcloud.jjshome.com/pic/fang/2016-11/24/FrWAfxshNWeuW3k8QFBiWM6g8rTT.jpg?imageView2/1/w/66/h/88"
interface Item {
  id: string;
  avatar: string;
  nick: string;
  msg: string;
  time: string;
  unread: number;
  isCurr: boolean;
}
