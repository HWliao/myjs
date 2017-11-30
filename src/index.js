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
  im.login('123106', '123456');
});
// 登出
$('#logout').on('click', () => {
  im.logout();
});
