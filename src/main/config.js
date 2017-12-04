const config = {
  debug: true,
  thirdPartyDebug: false,
  appKey: '5ec5e1e55171f05a42483c5d33339691',
  className: '',
  getUsers: (accids, cb) => {
    cb([]);
  },
  // 侧边栏提示配置
  sidebarTitle: '在线咨询',
  sidebarUpTip: '收起',
  sidebarDownTip: '展开',
  // 未登入页信息
  nologinTitle: '请先登录后再咨询经纪人',
  loginBtnTitle: '登录',
  // 侧边栏列表 无
  noagentTitle: '暂无聊过天的经纪人',

  // 输入框placeholder
  inputPlaceHolder: '输入您要咨询的内容',

  // inputFooter title
  inputFooterTitle: '下载房源网App',
  // inputFooter text
  inputFooterText: '下载房源网App，随时随地找房',
  // inputFooter href
  inputFooterHref: 'https://shenzhen.leyoujia.com/common/app/download',
};

export function getConfig(options = {}) {
  return Object.assign({}, config, options);
}
