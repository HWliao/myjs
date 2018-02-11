import { ConfigActions, ConfigSetAction } from '../actions/config.actions';
import { environment } from '../../../environments/environment';

export interface State {
  /**
   * 自定义,加在最外层div上的class
   */
  className?: string;
  /**
   *   开启debug日志
   */
  debug?: boolean;
  /**
   * 开启第三方debug日志,主要是云信sdk的日志
   */
  thirdPartyDebug?: boolean;
  /**
   * 对应云信的appkey
   */
  appKey?: string;
  /**
   * 追加到消息自定义字段中用来标示消息来源
   */
  fromClientType?: string;
  /**
   * 图片上传最大阈值
   */
  imageUploadMaxLimit?: number;
  /**
   * emoji资源路径
   */
  emojiPath?: string;

  /**
   * 是否需要发送快捷键
   */
  needSendShortcut?: boolean;

  /**
   * 侧边栏提示配置
   */
  sidebarTitle?: string;
  /**
   * 展开tip
   */
  sidebarUpTip?: string;
  /**
   * 收起tip
   */
  sidebarDownTip?: string;
  /**
   * 未登入页信息
   */
  nologinTitle?: string;
  /**
   * 登入按钮的标题
   */
  loginBtnTitle?: string;
  /**
   * 侧边栏列表 无
   */
  noagentTitle?: string;

  /**
   * 输入框placeholder
   */
  inputPlaceHolder?: string;

  /**
   * inputFooter title
   */
  inputFooterTitle?: string;
  /**
   * inputFooter text
   */
  inputFooterText?: string;
  /**
   * inputFooter href
   */
  inputFooterHref?: string;
  /**
   * 消息列表头部title
   */
  chatContentHeader?: string;

  /**
   * 在线客服的咨询时间段
   */
  onlineCustomerTimeTip?: string;

  /**
   * 消息过滤 决定哪些消息从插件冒泡出来
   * @param msg 消息对象
   * @param content 自定义内容体
   * @return {true} 是否冒泡
   */
  msgFilter?(msg: any, content?: any): true;

  /**
   * 是否为在线客服
   * @param {string} scene 场景
   * @param {string} to 账号
   * @return {boolean} 是否
   */
  isOnlinCustomer?(scene: string, to: string): boolean;

  /**
   * 用户信息获取接口
   * @param {string[]} accids 账号驻足
   * @param {(users: any[]) => any} cb 完成回调
   */
  getUsers?(accids: string[], cb: (users: any[]) => any): void;

  /**
   * 转换house url
   * @param content 自定义消息内容体
   * @return {string} 房源url
   */
  convertHouseUrl?(content: any): string;


  /**
   * 会话过滤 决定在会话列表显示哪些会话
   * @param {string} scene
   * @param {string} to
   * @return {boolean}
   */
  sessionFilter?(scene: string, to: string): boolean;
}

export const initialState: State = {
  className: '',
  debug: true,
  thirdPartyDebug: false,
  appKey: '5ec5e1e55171f05a42483c5d33339691',
  fromClientType: 'WEB_IM_PLUGIN',
  imageUploadMaxLimit: 1024 * 1024,
  emojiPath: `${environment.production}/emoji`,
  getUsers: (accids, cb) => {
    cb([]);
  },
  convertHouseUrl: (content) => {
    return content && content.data && content.data.url;
  },
  needSendShortcut: false,
  sessionFilter: () => true,
  msgFilter: () => true,
  isOnlinCustomer: () => false,
  sidebarTitle: '在线咨询',
  sidebarUpTip: '收起',
  sidebarDownTip: '展开',
  nologinTitle: '请先登录后再咨询经纪人',
  loginBtnTitle: '登录',
  noagentTitle: '暂无聊过天的经纪人',
  inputPlaceHolder: '输入您要咨询的内容',
  inputFooterTitle: '下载房源网App',
  inputFooterText: '下载房源网App，随时随地找房',
  inputFooterHref: 'https://shenzhen.leyoujia.com/common/app/download',
  chatContentHeader: '聊天中经纪人无法知道您的手机号',
  onlineCustomerTimeTip: '咨询服务时间：09:00-18:00',
};

export function reducer(state: State = initialState, action: ConfigSetAction): State {
  switch (action.type) {
    case ConfigActions.CONFIG_SET:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
