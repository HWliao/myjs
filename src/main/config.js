import $ from 'jquery';

const config = {
  debug: true,
  thirdPartyDebug: false,
  appKey: '',
  className: '',
  // 侧边栏提示配置
  sidebarTitle: '在线咨询',
  sidebarUpTip: '收起',
  sidebarDownTip: '展开',
  // 未登入页信息
  nologinTitle: '请先登录后再咨询经纪人',
  loginBtnTitle: '登录',
  // 侧边栏列表 无
  noagentTitle: '暂无聊过天的经纪人',
};

export function getConfig(options = {}) {
  return $.extend({}, config, options);
}
