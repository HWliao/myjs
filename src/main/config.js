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
};

export function getConfig(options = {}) {
  return $.extend({}, config, options);
}
