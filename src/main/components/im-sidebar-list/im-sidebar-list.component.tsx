import * as React from 'react';

class ImSidebarListComponent extends React.PureComponent {
  render() {
    return (
      <ul className="jjsim-list" id="jjsim-list">
        <li className="jjsim-bd-item">
          <div className="jjsim-item-img">
            <img
              src="https://imgcloud.jjshome.com/pic/fang/2016-11/24/FrWAfxshNWeuW3k8QFBiWM6g8rTT.jpg?
                  imageView2/1/w/66/h/88"
            />
          </div>
          <span className="name" title="李芳">李芳</span>
          <span className="text" title="这套房子满五年，差不多可以马上出售">这套房子满五年，差不多可以马上出售</span>
          <span className="time" title="昨天 08:48">昨天 08:48</span>
        </li>
      </ul>
    );
  }
}

export default ImSidebarListComponent;
