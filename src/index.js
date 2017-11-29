import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';

import Im from './main/main';

const options = {
  className: 'my-class',
  debug: true,
  thirdPartyDebug: false,
};
// 初始化
let im = null;
$('#init').on('click', () => {
  // eslint-disable-next-line no-new
  im = new Im(options);
});
// 显示/隐藏
let i = 0;
$('#hideLayout').on('click', () => {
  im.show(i % 2 === 0);
  i += 1;
});
