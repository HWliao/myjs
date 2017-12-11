import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';

import Im from './main/main';

let im = null;

// 打印
function println(str) {
  const $c = $('#console');
  $c.val(`${str}\n${$c.val()}`);
}

// 监听事件
function doOn() {
  // 监听im事件
  im.on(Im.event.IM_TO_LOGIN, () => {
    println('need to login');
  });
  im.on(Im.event.IM_TO_CONSULTING, () => {
    println('need to consulting');
  });
}

// 配置
const options = {
  className: 'my-class',
  debug: true,
  thirdPartyDebug: false,
  appKey: '638aae803525df4d733c7703e0c3323f',
  getUsers: (accids = [], cb) => {
    setTimeout(() => {
      cb(accids.map(accid => ({
        accid,
        nick: `nick${accid}`,
        avatar: 'https://imgcloud.jjshome.com/pic/fang/2016-11/24/FrWAfxshNWeuW3k8QFBiWM6g8rTT.jpg?imageView2/1/w/66/h/88',
      })));
    }, 1000);
  },
};
// 初始化
$('#init').on('click', () => {
  // eslint-disable-next-line no-new
  im = new Im(options);
  doOn();
});
// 显示/隐藏
let i = 0;
$('#hideLayout').on('click', () => {
  im.show(i % 2 === 0);
  i += 1;
});
// 登入
$('#login').on('click', () => {
  im.login('087387', '123456');
});
// 登出
$('#logout').on('click', () => {
  im.logout();
});
$('#consultative').on('click', () => {
  im.gotoConsultative({
    toUrl: 'https://www.baidu.com',
    img: 'https://imgcloud.jjshome.com/pic/hsl/2017-09/19/929354be-3202-4b83-bd71-9755a82aa8fe.jpg?imageView2/2/w/160/h/120',
    title: '旭飞花园 一房一厅一室一卫',
    attr: '1室1厅1卫  108m²',
    price: '155万',
    tip: '正在为您安排置业顾问，请稍等...',
  });
});
$('#consultativeFail').on('click', () => {
  im.gotoConsultativeFail({
    toUrl: 'https://www.baidu.com',
    img: 'https://imgcloud.jjshome.com/pic/hsl/2017-09/19/929354be-3202-4b83-bd71-9755a82aa8fe.jpg?imageView2/2/w/160/h/120',
    title: '旭飞花园 一房一厅一室一卫',
    attr: '1室1厅1卫  108m²',
    price: '155万',
    tip: '置业顾问正忙，您可致电客服',
  });
});
