import * as React from 'react';
import ImShake from '../im-shake/im-shake.component';

class ImSidebarHeaderComponent extends React.PureComponent<Props> {

  render() {
    const {title = '', toggleTitle = '', up, unread, onClick, shake = false} = this.props;
    return (
      <div className="jjsim-hd" onClick={onClick}>
        <ImShake shake={shake} interval={500}>
          <i className="jjsim-icon sprite sprite-dialog shake">
            <span className={`jjsim-hd-num ${unread > 0 ? '' : 'hide'}`}>{unread}</span>
          </i>
        </ImShake>
        <span className="im-title">{title}</span>
        <a
          className={`jjsim-hd-closebtn sprite ${up ? 'sprite-down' : 'sprite-up'} ${up ? '' : 'hide'}`}
          title={toggleTitle}
        />
      </div>
    );
  }
}

export default ImSidebarHeaderComponent;

export interface Props {
  /**
   * 标题
   */
  title?: string;
  /**
   * 展开收起标题
   */
  toggleTitle?: string;
  /**
   * 未读数据
   */
  unread: number;
  /**
   * 是否已经展开
   */
  up: boolean;
  /**
   * 是否闪动
   */
  shake: boolean;
  /**
   * 点击事件
   */
  onClick: () => void;
}
