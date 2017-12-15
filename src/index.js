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
  im.on(Im.event.IM_TO_UP, () => {
    println('need to up');
  });
  im.on(Im.event.IM_MSG, (custom) => {
    console.log(custom);
    println('have msg');
  });
  im.on(Im.event.IM_ERROR, (error) => {
    console.log(error);
    println('have error');
  });
}

// 配置
const options = {
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

  // 用户信息获取接口
  getUsers: (accids = [], cb) => {
    setTimeout(() => {
      cb(accids.map(accid => ({
        accid,
        nick: `nick${accid}`,
        avatar: 'https://imgcloud.jjshome.com/pic/fang/2016-11/24/FrWAfxshNWeuW3k8QFBiWM6g8rTT.jpg?imageView2/1/w/66/h/88',
      })));
    }, 1000);
  },
  // 会话过滤 决定在会话列表显示哪些会话
  // 只展示单聊,且不为某个accid
  sessionFilter: (scene, to) => scene === Im.constant.SCENE_P2P && to !== 'service000001',
  // 消息过滤 决定哪些消息从插件冒泡出来
  // 只冒冒泡 与咨询相关 的消息
  msgFilter: (custom) => {
    // 无人咨询
    // {"data":{"errorCode":"404"},"type":"ConsultationFailed"}
    if (custom && custom.type && custom.type === 'ConsultationFailed') {
      return true;
    }

    // 咨询成功
    // {
    //  "type":"ConsultationSuccess",
    //  "data":{
    //    "status":4320561232,
    //    "tips":"接入客户咨询",
    //    "workId":"77834993",
    //    "brokerName":"张敏",
    //    "workNo":"073282",
    //    "brokerPortrait":""
    //  }
    // }
    if (custom && custom.type && custom.type === 'ConsultationSuccess') {
      return true;
    }
    return false;
  },

  // 以下为插件用到的文案
  // 侧边栏提示
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
$('#isLogin').on('click', () => {
  alert(im.isLogin());
});
$('#isConnect').on('click', () => {
  alert(im.isConnect());
});
$('#isShow').on('click', () => {
  alert(im.isShow());
});
$('#isUp').on('click', () => {
  alert(im.isUp());
});

// 登入 087387
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
    tip: '置业顾问正忙，您可致电客服：400-8869-200',
  });
});

$('#sendTextMessage').on('click', () => {
  im.sendTextMessage(Im.constant.SCENE_P2P, '123106', 'text')
    .then((msg) => {
      console.log(msg);
      alert('发送成功');
    })
    .catch((error) => {
      console.log(error);
      alert('发送失败');
    });
});
$('#sendCustomMessage').on('click', () => {
  im.sendCustomMessage(
    Im.constant.SCENE_P2P,
    '123106',
    {
      type: 5,
      data: {
        houseId: '7984366',
        orientation: '西南',
        fitment: '简单装修',
        hall: '2',
        url: 'https://wap.jjshome.com/wap/esf/detail/7984366',
        area: '80.68',
        addr: '淡水镇长安南路与熊猫大道交汇',
        title: '靓房诚心出售',
        price: '68',
        room: '2',
        houseType: '2',
        houseImage: 'https://imgcloud.jjshome.com/pic/hsl/2017-03/04/ff029ae8-de83-4ded-bcb2-6468f25762be.jpg',
        forward: '西南',
        lpName: '惠阳左岸春天',
      },
    }, '[房源]',
  )
    .then((msg) => {
      console.log(msg);
      alert('发送成功');
    })
    .catch((error) => {
      console.log(error);
      alert('发送失败');
    });
});
$('#setCurrSession').on('click', () => {
  im.setCurrSession(Im.constant.SCENE_P2P, '123106');
});
$('#destroy').on('click', () => {
  im.destroy();
});
