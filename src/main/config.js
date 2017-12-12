const config = {
  // 自定义,加在最外层div上的class
  className: '',
  // 开启debug日志
  debug: true,
  // 开启第三方debug日志,主要是云信sdk的日志
  thirdPartyDebug: false,
  // 对应云信的appkey
  appKey: '638aae803525df4d733c7703e0c3323f',
  // 追加到消息自定义字段中用来标示消息来源
  fromClientType: 'WEB_IM_PLUGIN',
  // 图片上传最大阈值
  imageUploadMaxLimit: 1024 * 1024,
  // emoji资源路径
  emojiPath: `${process.env.PUBLIC_URL}emoji`,

  // 用户信息获取接口
  getUsers: (accids, cb) => {
    cb([]);
  },
  // 会话过滤 决定在会话列表显示哪些会话
  sessionFilter: () => true,
  // 消息过滤 决定哪些消息从插件冒泡出来
  msgFilter: () => true,

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
  // 消息列表头部title
  chatContentHeader: '聊天中经纪人无法知道您的手机号',
};

export function getConfig(options = {}) {
  return Object.assign({}, config, options);
}
