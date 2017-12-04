/**
 * 闪动某个元素
 * @param $el
 * @param ms
 * @return {Object}
 */
import { SCENE_P2P } from '../model/constant';

export function flashing($el, ms) {
  let i = 0;
  return {
    $el,
    interval: setInterval(() => {
      if (i % 2 === 0) {
        $el.css({ visibility: 'visible' });
      } else {
        $el.css({ visibility: 'hidden' });
      }
      i += 1;
    }, ms),
  };
}

/**
 * 清除闪动
 * @param obj
 */
export function clearFlashing(obj) {
  if (!obj) return;
  const { $el, interval } = obj;
  if ($el) {
    $el.css({ visibility: 'visible' });
  }
  if (interval) {
    clearInterval(interval);
  }
}

/**
 * 获取日期点
 * @param date
 * @return {[null,null]}
 */
function getDayPoint(date) {
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  date.setHours(0);
  const today = date.getTime();
  date.setMonth(1);
  date.setDate(1);
  const yearDay = date.getTime();
  return [today, yearDay];
}

/**
 * 转义
 * @param _map
 * @param content
 * @return {*}
 * @private
 */
function _$encode(_map, content) {
  const _content = `${content}`;
  if (!_map || !_content) {
    return _content || '';
  }
  return _content.replace(_map.r, ($1) => {
    const _result = _map[!_map.i ? $1.toLowerCase() : $1];
    return _result !== null && _result !== undefined ? _result : $1;
  });
}

/**
 * html转义
 * @param content
 * @param flag \n是否转义程<br/>
 * @return {*}
 * @private
 */
function _$escape(content, flag) {
  const _map = {
    r: /<|>|&|\r|\n|\s|'|"/g,
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    ' ': '&nbsp;',
    '"': '&quot;',
    "'": '&#39;',
    '\r': '',
  };
  if (flag) _map['\n'] = '<br/>';
  return _$encode(_map, content);
}

/**
 * 日期格式化
 * @return string
 */
function dateFormat(_timeL, _format, _12time) {
  const _map = { i: !0, r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g };
  const _12cc = ['上午', '下午'];
  const _12ec = ['A.M.', 'P.M.'];
  const _week = ['日', '一', '二', '三', '四', '五', '六'];
  const _cmon = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
  const _emon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const _fmtnmb = (_number = 0) => `${parseInt(_number, 10) < 10 ? '0' : ''}${_number}`;
  const _fmtclc = _hour => (_hour < 12 ? 0 : 1);

  if (!_timeL || !_format) return '';
  const _time = new Date(_timeL);
  _map.yyyy = _time.getFullYear();
  // eslint-disable-next-line prefer-template
  _map.yy = ('' + _map.yyyy).substr(2);
  _map.M = _time.getMonth() + 1;
  _map.MM = _fmtnmb(_map.M);
  _map.eM = _emon[_map.M - 1];
  _map.cM = _cmon[_map.M - 1];
  _map.d = _time.getDate();
  _map.dd = _fmtnmb(_map.d);
  _map.H = _time.getHours();
  _map.HH = _fmtnmb(_map.H);
  _map.m = _time.getMinutes();
  _map.mm = _fmtnmb(_map.m);
  _map.s = _time.getSeconds();
  _map.ss = _fmtnmb(_map.s);
  _map.ms = _time.getMilliseconds();
  _map.w = _week[_time.getDay()];
  const _cc = _fmtclc(_map.H);
  _map.ct = _12cc[_cc];
  _map.et = _12ec[_cc];
  _map.H = _12time ? _map.H % 12 : _map.H;
  return _$encode(_map, _format);
}

/**
 * 格式化session时间
 * @param time
 * @return {string}
 */
export function sessionTime(time) {
  if (!time) return '';
  const check = getDayPoint(new Date());
  if (time >= check[0]) {
    const hm = dateFormat(time, 'HH:mm');
    const hmStr = hm.substring(1, 0);
    if (hmStr === '0') {
      return hm.substring(1);
    }
    return hm;
  } else if (time >= (check[0] - (60 * 1000 * 60 * 24))) {
    return `昨天${dateFormat(time, ' HH:mm')}`;
  } else if (time >= (check[0] - (2 * 60 * 1000 * 60 * 24))) {
    return `前天${dateFormat(time, ' HH:mm')}`;
  } else if (time >= (check[0] - (7 * 60 * 1000 * 60 * 24))) {
    return `星期${dateFormat(time, 'w')}${dateFormat(time, ' HH:mm')}`;
  } else if (time >= check[1]) {
    return dateFormat(time, 'MM-dd HH:mm');
  }
  return dateFormat(time, 'yyyy-MM-dd HH:mm');
}

/**
 * 构建session text
 * @param msg
 * @param userUID
 * @param user
 * @return {*}
 */
export function buildSessionMsg(msg, userUID, user) {
  let text = msg.scene !== SCENE_P2P ? `${msg.from === userUID ? '我' : user.nick}:` : '';
  const { type } = msg;
  if (!/text|image|file|audio|video|geo|custom|tip|notification/i.test(type)) return '';
  if (type === 'text') {
    text += _$escape(msg.text);
  } else if (type === 'image') {
    text += '[图片]';
  } else if (type === 'file') {
    if (!/bat/i.test(msg.file.ext)) {
      text += '[文件]';
    } else {
      text += '[非法文件，已被本站拦截]';
    }
  } else if (type === 'audio') {
    text += '[语音]';
  } else if (type === 'video') {
    text += '[视频]';
  } else if (type === 'geo') {
    text += '[位置]';
  } else if (type === 'tip') {
    if (msg.tip.indexOf('撤回了一条消息') === -1) {
      text = '[提醒消息]';
    } else {
      text = msg.tip;
    }
  } else if (type === 'custom') {
    let content;
    try {
      content = JSON.parse(msg.content);
    } catch (e) {
      console.error('msg:%o,err:%o', msg, e);
    }
    if (content === null || content === undefined) {
      text += '[自定义消息]';
    } else if (content.type === 1) {
      text += '[猜拳]';
    } else if (content.type === 2) {
      text += '[阅后即焚]';
    } else if (content.type === 3) {
      text += '[贴图]';
    } else if (content.type === 4) {
      text += '[白板]';
    } else if (content.type === 5) {
      text += '[房源]';
    } else if (content.type === 'multi' && content.msgs && content.msgs.length > -1) {
      const { msgs } = content;
      text += '';
      for (let i = 0; i < msgs.length; i++) {
        if (msgs[i].type === 'text') {
          text += _$escape(msgs[i].text);
        } else if (msgs[i].type === 'image') {
          text += '[图片]';
        }
      }
    } else if (content.type === 'shake') {
      text += '[抖一抖]';
    } else if (content.type === 'collect') {
      text += '[收藏]';
    } else {
      text += '[自定义消息]';
    }
  } else if (type === 'notification') {
    text = '[群通知]';
  } else {
    text += '[未知消息类型]';
  }
  return text;
}
