import * as React from 'react';

class ImSidebarNologinComponent extends React.PureComponent<Props> {
  render() {
    const {show, title, onToLogin, btnTitle} = this.props;
    return (
      <div className={`jjsim-noagent ${show ? '' : 'hide'}`}>
        <i className="sprite sprite-chart"/>
        <p>{title}</p>
        <a href="javascript:" className="loginbtn" onClick={onToLogin}>
          {btnTitle}
        </a>
      </div>
    );
  }
}

export default ImSidebarNologinComponent;

export interface Props {
  /**
   * 是否显示
   */
  show: boolean;
  /**
   * 标题
   */
  title: string;
  /**
   * 按钮
   */
  btnTitle: string;
  /**
   * 登入按钮点击
   */
  onToLogin: () => void;
}
