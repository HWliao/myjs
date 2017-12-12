/* eslint-disable class-methods-use-this */
import './emoji.css';

import { prefixInteger } from '../../utils/utils';

const jjsEmoji = [
  { text: '[乐乐微笑]', file: 'jjs1.png' },
  { text: '[乐乐大笑]', file: 'jjs2.png' },
  { text: '[乐乐噢耶]', file: 'jjs3.png' },
  { text: '[乐乐色]', file: 'jjs4.png' },
  { text: '[乐乐亲亲]', file: 'jjs5.png' },
  { text: '[乐乐爱慕]', file: 'jjs6.png' },
  { text: '[乐乐偷笑]', file: 'jjs7.png' },
  { text: '[乐乐鼓掌]', file: 'jjs8.png' },
  { text: '[乐乐可爱]', file: 'jjs9.png' },
  { text: '[乐乐调皮]', file: 'jjs10.png' },
  { text: '[乐乐好吃]', file: 'jjs11.png' },
  { text: '[乐乐表白]', file: 'jjs12.png' },
  { text: '[乐乐害羞]', file: 'jjs13.png' },
  { text: '[乐乐奋斗]', file: 'jjs14.png' },
  { text: '[乐乐收到]', file: 'jjs15.png' },
  { text: '[乐乐耍酷]', file: 'jjs16.png' },
  { text: '[乐乐坏笑]', file: 'jjs17.png' },
  { text: '[乐乐奸笑]', file: 'jjs18.png' },
  { text: '[乐乐机智]', file: 'jjs19.png' },
  { text: '[乐乐嘿哈]', file: 'jjs20.png' },
  { text: '[乐乐鬼脸]', file: 'jjs21.png' },
  { text: '[乐乐傲慢]', file: 'jjs22.png' },
  { text: '[乐乐嚎哭]', file: 'jjs23.png' },
  { text: '[乐乐流泪]', file: 'jjs24.png' },
  { text: '[乐乐捂脸]', file: 'jjs25.png' },
  { text: '[乐乐敲你]', file: 'jjs26.png' },
  { text: '[乐乐吐血]', file: 'jjs27.png' },
  { text: '[乐乐恐惧]', file: 'jjs28.png' },
  { text: '[乐乐呕吐]', file: 'jjs29.png' },
  { text: '[乐乐衰]', file: 'jjs30.png' },
  { text: '[乐乐挖鼻]', file: 'jjs31.png' },
  { text: '[乐乐哈欠]', file: 'jjs32.png' },
  { text: '[乐乐睡着]', file: 'jjs33.png' },
  { text: '[乐乐感冒]', file: 'jjs34.png' },
  { text: '[乐乐思考]', file: 'jjs35.png' },
  { text: '[乐乐尴尬]', file: 'jjs36.png' },
  { text: '[乐乐惊吓]', file: 'jjs37.png' },
  { text: '[乐乐发怒]', file: 'jjs38.png' },
  { text: '[乐乐崩溃]', file: 'jjs39.png' },
  { text: '[乐乐难受]', file: 'jjs40.png' },
  { text: '[乐乐笑哭]', file: 'jjs41.png' },
  { text: '[乐乐流汗]', file: 'jjs42.png' },
  { text: '[乐乐擦汗]', file: 'jjs43.png' },
  { text: '[乐乐盲目]', file: 'jjs44.png' },
  { text: '[乐乐心累]', file: 'jjs45.png' },
  { text: '[乐乐晕了]', file: 'jjs46.png' },
  { text: '[乐乐无视]', file: 'jjs47.png' },
  { text: '[乐乐委屈]', file: 'jjs48.png' },
  { text: '[乐乐鄙视]', file: 'jjs49.png' },
  { text: '[乐乐托腮]', file: 'jjs50.png' },
  { text: '[乐乐无奈]', file: 'jjs51.png' },
  { text: '[乐乐纠结]', file: 'jjs52.png' },
  { text: '[乐乐安慰]', file: 'jjs53.png' },
  { text: '[乐乐难过]', file: 'jjs54.png' },
  { text: '[乐乐疑问]', file: 'jjs55.png' },
  { text: '[乐乐惊奇]', file: 'jjs56.png' },
  { text: '[乐乐闭嘴]', file: 'jjs57.png' },
  { text: '[乐乐呆萌]', file: 'jjs58.png' },
  { text: '[乐乐白眼]', file: 'jjs59.png' },
  { text: '[乐乐可怜]', file: 'jjs60.png' },
  { text: '[乐乐再见]', file: 'jjs61.png' },
  { text: '[乐乐抱抱]', file: 'jjs62.png' },
  { text: '[乐乐炮竹]', file: 'jjs63.png' },
  { text: '[乐乐炸弹]', file: 'jjs64.png' },
  { text: '[乐乐生日]', file: 'jjs65.png' },
  { text: '[乐乐礼物]', file: 'jjs66.png' },
  { text: '[乐乐情书]', file: 'jjs67.png' },
  { text: '[乐乐玫瑰]', file: 'jjs68.png' },
  { text: '[乐乐凋谢]', file: 'jjs69.png' },
  { text: '[乐乐心碎]', file: 'jjs70.png' },
  { text: '[乐乐爱心]', file: 'jjs71.png' },
  { text: '[乐乐吻]', file: 'jjs72.png' },
  { text: '[乐乐爆筋]', file: 'jjs73.png' },
  { text: '[乐乐闪电]', file: 'jjs74.png' },
  { text: '[乐乐便便]', file: 'jjs75.png' },
  { text: '[乐乐菜刀]', file: 'jjs76.png' },
  { text: '[乐乐太阳]', file: 'jjs77.png' },
  { text: '[乐乐拳头]', file: 'jjs78.png' },
  { text: '[乐乐超赞]', file: 'jjs79.png' },
  { text: '[乐乐胜利]', file: 'jjs80.png' },
  { text: '[乐乐差劲]', file: 'jjs81.png' },
  { text: '[乐乐勾引]', file: 'jjs82.png' },
  { text: '[乐乐握手]', file: 'jjs83.png' },
  { text: '[乐乐OK]', file: 'jjs84.png' },
  { text: '[乐乐不]', file: 'jjs85.png' },
  { text: '[乐乐爱你]', file: 'jjs86.png' },
  { text: '[乐乐抱拳]', file: 'jjs87.png' },
];
const emoji = [
  { text: '[大笑]', file: 'emoji_0.png' },
  { text: '[可爱]', file: 'emoji_01.png' },
  { text: '[色]', file: 'emoji_02.png' },
  { text: '[嘘]', file: 'emoji_03.png' },
  { text: '[亲]', file: 'emoji_04.png' },
  { text: '[呆]', file: 'emoji_05.png' },
  { text: '[口水]', file: 'emoji_06.png' },
  { text: '[汗]', file: 'emoji_145.png' },
  { text: '[呲牙]', file: 'emoji_07.png' },
  { text: '[鬼脸]', file: 'emoji_08.png' },
  { text: '[害羞]', file: 'emoji_09.png' },
  { text: '[偷笑]', file: 'emoji_10.png' },
  { text: '[调皮]', file: 'emoji_11.png' },
  { text: '[可怜]', file: 'emoji_12.png' },
  { text: '[敲]', file: 'emoji_13.png' },
  { text: '[惊讶]', file: 'emoji_14.png' },
  { text: '[流感]', file: 'emoji_15.png' },
  { text: '[委屈]', file: 'emoji_16.png' },
  { text: '[流泪]', file: 'emoji_17.png' },
  { text: '[嚎哭]', file: 'emoji_18.png' },
  { text: '[惊恐]', file: 'emoji_19.png' },
  { text: '[怒]', file: 'emoji_20.png' },
  { text: '[酷]', file: 'emoji_21.png' },
  { text: '[不说]', file: 'emoji_22.png' },
  { text: '[鄙视]', file: 'emoji_23.png' },
  { text: '[阿弥陀佛]', file: 'emoji_24.png' },
  { text: '[奸笑]', file: 'emoji_25.png' },
  { text: '[睡着]', file: 'emoji_26.png' },
  { text: '[口罩]', file: 'emoji_27.png' },
  { text: '[努力]', file: 'emoji_28.png' },
  { text: '[抠鼻孔]', file: 'emoji_29.png' },
  { text: '[疑问]', file: 'emoji_30.png' },
  { text: '[怒骂]', file: 'emoji_31.png' },
  { text: '[晕]', file: 'emoji_32.png' },
  { text: '[呕吐]', file: 'emoji_33.png' },
  { text: '[拜一拜]', file: 'emoji_160.png' },
  { text: '[惊喜]', file: 'emoji_161.png' },
  { text: '[流汗]', file: 'emoji_162.png' },
  { text: '[卖萌]', file: 'emoji_163.png' },
  { text: '[默契眨眼]', file: 'emoji_164.png' },
  { text: '[烧香拜佛]', file: 'emoji_165.png' },
  { text: '[晚安]', file: 'emoji_166.png' },
  { text: '[强]', file: 'emoji_34.png' },
  { text: '[弱]', file: 'emoji_35.png' },
  { text: '[OK]', file: 'emoji_36.png' },
  { text: '[拳头]', file: 'emoji_37.png' },
  { text: '[胜利]', file: 'emoji_38.png' },
  { text: '[鼓掌]', file: 'emoji_39.png' },
  { text: '[握手]', file: 'emoji_200.png' },
  { text: '[发怒]', file: 'emoji_40.png' },
  { text: '[骷髅]', file: 'emoji_41.png' },
  { text: '[便便]', file: 'emoji_42.png' },
  { text: '[火]', file: 'emoji_43.png' },
  { text: '[溜]', file: 'emoji_44.png' },
  { text: '[爱心]', file: 'emoji_45.png' },
  { text: '[心碎]', file: 'emoji_46.png' },
  { text: '[钟情]', file: 'emoji_47.png' },
  { text: '[唇]', file: 'emoji_48.png' },
  { text: '[戒指]', file: 'emoji_49.png' },
  { text: '[钻石]', file: 'emoji_50.png' },
  { text: '[太阳]', file: 'emoji_51.png' },
  { text: '[有时晴]', file: 'emoji_52.png' },
  { text: '[多云]', file: 'emoji_53.png' },
  { text: '[雷]', file: 'emoji_54.png' },
  { text: '[雨]', file: 'emoji_55.png' },
  { text: '[雪花]', file: 'emoji_56.png' },
  { text: '[爱人]', file: 'emoji_57.png' },
  { text: '[帽子]', file: 'emoji_58.png' },
  { text: '[皇冠]', file: 'emoji_59.png' },
  { text: '[篮球]', file: 'emoji_60.png' },
  { text: '[足球]', file: 'emoji_61.png' },
  { text: '[垒球]', file: 'emoji_62.png' },
  { text: '[网球]', file: 'emoji_63.png' },
  { text: '[台球]', file: 'emoji_64.png' },
  { text: '[咖啡]', file: 'emoji_65.png' },
  { text: '[啤酒]', file: 'emoji_66.png' },
  { text: '[干杯]', file: 'emoji_67.png' },
  { text: '[柠檬汁]', file: 'emoji_68.png' },
  { text: '[餐具]', file: 'emoji_69.png' },
  { text: '[汉堡]', file: 'emoji_70.png' },
  { text: '[鸡腿]', file: 'emoji_71.png' },
  { text: '[面条]', file: 'emoji_72.png' },
  { text: '[冰淇淋]', file: 'emoji_73.png' },
  { text: '[沙冰]', file: 'emoji_74.png' },
  { text: '[生日蛋糕]', file: 'emoji_75.png' },
  { text: '[蛋糕]', file: 'emoji_76.png' },
  { text: '[糖果]', file: 'emoji_77.png' },
  { text: '[葡萄]', file: 'emoji_78.png' },
  { text: '[西瓜]', file: 'emoji_79.png' },
  { text: '[光碟]', file: 'emoji_80.png' },
  { text: '[手机]', file: 'emoji_81.png' },
  { text: '[电话]', file: 'emoji_82.png' },
  { text: '[电视]', file: 'emoji_83.png' },
  { text: '[声音开启]', file: 'emoji_84.png' },
  { text: '[声音关闭]', file: 'emoji_85.png' },
  { text: '[铃铛]', file: 'emoji_86.png' },
  { text: '[锁头]', file: 'emoji_87.png' },
  { text: '[放大镜]', file: 'emoji_88.png' },
  { text: '[灯泡]', file: 'emoji_89.png' },
  { text: '[锤头]', file: 'emoji_90.png' },
  { text: '[烟]', file: 'emoji_91.png' },
  { text: '[炸弹]', file: 'emoji_92.png' },
  { text: '[枪]', file: 'emoji_93.png' },
  { text: '[刀]', file: 'emoji_94.png' },
  { text: '[药]', file: 'emoji_95.png' },
  { text: '[打针]', file: 'emoji_96.png' },
  { text: '[钱袋]', file: 'emoji_97.png' },
  { text: '[钞票]', file: 'emoji_98.png' },
  { text: '[银行卡]', file: 'emoji_99.png' },
  { text: '[手柄]', file: 'emoji_100.png' },
  { text: '[麻将]', file: 'emoji_101.png' },
  { text: '[调色板]', file: 'emoji_102.png' },
  { text: '[电影]', file: 'emoji_103.png' },
  { text: '[麦克风]', file: 'emoji_104.png' },
  { text: '[耳机]', file: 'emoji_105.png' },
  { text: '[音乐]', file: 'emoji_106.png' },
  { text: '[吉他]', file: 'emoji_107.png' },
  { text: '[火箭]', file: 'emoji_108.png' },
  { text: '[飞机]', file: 'emoji_109.png' },
  { text: '[火车]', file: 'emoji_110.png' },
  { text: '[公交]', file: 'emoji_111.png' },
  { text: '[轿车]', file: 'emoji_112.png' },
  { text: '[出租车]', file: 'emoji_113.png' },
  { text: '[警车]', file: 'emoji_114.png' },
  { text: '[自行车]', file: 'emoji_115.png' },
];

const jjs = [];
const ajmd = [];
const xxy = [];
const lt = [];

const pluginComputers = [
  {
    plugin: jjs,
    text: 'jjs',
    num: 46,
    ext: 'gif',
  },
  {
    plugin: ajmd,
    text: 'ajmd',
    num: 48,
    ext: 'png',
  },
  {
    plugin: xxy,
    text: 'xxy',
    num: 40,
    ext: 'png',
  },
  {
    plugin: lt,
    text: 'lt',
    num: 20,
    ext: 'png',
  },
];

for (let i = 0; i < pluginComputers.length; i++) {
  const plugin = pluginComputers[i];
  for (let j = 1; j <= plugin.num; j++) {
    plugin.plugin.push(`${plugin.text}${prefixInteger(j, 3)}.${plugin.ext}`);
  }
}

const jjsEmojiMap = {};
const emojiMap = {};
for (let i = 0; i < jjsEmoji.length; i++) {
  jjsEmojiMap[jjsEmoji[i].text] = jjsEmoji[i].file;
}
for (let i = 0; i < emoji.length; i++) {
  emojiMap[emoji[i].text] = emoji[i].file;
}

class CEmojiEngine {
  constructor(emNode, emConfig = {}) {
    this.__init(emNode, emConfig);
  }

  __init(emNode, emConfig) {
    // 表情列表
    this._emojiList = emConfig.emojiList || [];
    // 贴图列表
    this._pinupList = emConfig.pinupList || [];
    // 图片根目录
    this._imgpath = emConfig.imgpath;
    // 回调函数
    this._callback = emConfig.callback || (() => {
    });

    // 控件初始化
    this.__initXGui(emNode, emConfig);
    // 渲染表情选择栏
    this.__renderChangeCol();
    // 初始化当前默认表情选择
    this._curEmojiType = 'emoji-jjs_emoji';
    this._curEmojiNode = document.getElementById('chn-emoji-jjs_emoji');
    // 渲染表情图片栏
    this.__renderPictureCol();

    this.__bindEvent();
    this._$hide();
  }

  __initXGui(emNode, emConfig) {
    this._parentNode = document.createElement('div');
    this._parentNode.className = 'm-emoji-wrapper';
    this._width = emConfig.width || 300;
    this._height = emConfig.height || 200;
    this._parentNode.style.width = `${this._width}px`;
    this._parentNode.style.height = 'auto';

    // 小的缩略图
    this._lWidth = parseInt((this._width - 25) / 12, 10) - 14;
    // 大的缩略图
    this._hWidth = parseInt((this._width - 25) / 5, 10) - 14;

    let tmpdiv = document.createElement('div');
    tmpdiv.className = 'm-emoji-picCol';
    tmpdiv.style.width = `${this._width}px`;
    tmpdiv.style.height = `${this._height}px`;
    this._parentNode.appendChild(tmpdiv);
    this._pictureColumn = document.createElement('ul');
    this._pictureColumn.className = 'm-emoji-picCol-ul';
    this._pictureColumn.style.width = `${this._width - 10}px`;
    this._pictureColumn.style.height = 'auto';
    tmpdiv.appendChild(this._pictureColumn);

    tmpdiv = document.createElement('div');
    tmpdiv.className = 'm-emoji-chnCol';
    tmpdiv.style.width = `${this._width}px`;
    tmpdiv.style.height = 'auto';
    this._parentNode.appendChild(tmpdiv);

    this._changeColumn = document.createElement('div');
    this._changeColumn.className = 'm-emoji-chnCol-ul';
    this._changeColumn.style.width = 'auto';
    this._changeColumn.style.height = '50px';
    tmpdiv.appendChild(this._changeColumn);

    emNode.appendChild(this._parentNode);
  }

  __renderChangeCol() {
    this._emojiList.forEach((item) => {
      const span = document.createElement('span');
      span.id = `chn-emoji-${item.itemName}`;
      const img = new Image();
      img.src = `${this._imgpath}/${item.itemName}/${item.itemName}.png`;
      if (item.itemName === 'jjs_emoji') {
        img.style.height = '60%';
        img.style.width = 'auto';
        img.style.margin = '20%';
      }
      span.appendChild(img);
      this._changeColumn.appendChild(span);
    });
    this._pinupList.forEach((item) => {
      const span = document.createElement('span');
      span.id = `chn-pinup-${item.itemName}`;
      const img = new Image();
      img.src = `${this._imgpath}/${item.itemName}/${item.itemName}.png`;
      if (item.itemName === 'jjs') {
        img.style.height = '58%';
        img.style.position = 'relative';
        img.style.top = '50%';
        img.style.left = '50%';
        img.style['margin-left'] = '-15px';
        img.style['margin-top'] = '-15px';
      }
      span.appendChild(img);
      this._changeColumn.appendChild(span);
    });
  }

  __renderPictureCol() {
    this._pictureColumn.innerHTML = '';
    this._curEmojiNode.className = 'f-sel';
    const isEmoji = /^emoji-/.test(this._curEmojiType);
    const itemName = this._curEmojiType.replace('emoji-', '').replace('pinup-', '');
    const { items } = []
      .concat(this._emojiList, this._pinupList)
      .find(item => item.itemName === itemName);
    if (isEmoji) {
      for (let i = 0; i < items.length; i++) {
        const span = document.createElement('span');
        span.id = `pic-emoji-${items[i].text}`;
        span.style.width = `${this._lWidth}px`;
        span.style.height = 'auto';
        const img = new Image();
        img.src = `${this._imgpath}/${itemName}/${items[i].file}`;
        img.title = items[i].text;
        span.appendChild(img);
        this._pictureColumn.appendChild(span);
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        const span = document.createElement('span');
        span.id = `pic-pinup-${i + 1}`;
        span.style.width = `${this._hWidth}px`;
        span.style.height = `${this._hWidth}px`;
        const img = new Image();
        img.src = `${this._imgpath}/${itemName}/${items[i]}`;
        span.appendChild(img);
        this._pictureColumn.appendChild(span);
      }
    }
  }

  __bindEvent() {
    // 切换表情
    this._$addEvent(this._changeColumn, 'click', (e) => {
      let target = this._$getElement(e);
      this._$stop(e);
      if (target.tagName.toLowerCase() === 'img') {
        target = target.parentNode;
      } else if (target.tagName.toLowerCase() !== 'span') {
        return;
      }
      this._curEmojiNode.className = '';
      let { id } = target;
      id = /^chn-(\w+)-(.+)/.exec(id);
      const [, type] = id;
      if (type === 'emoji') {
        this._curEmojiType = `emoji-${id[2]}`;
        this._curEmojiNode = target;
      } else if (type === 'pinup') {
        this._curEmojiType = `pinup-${id[2]}`;
        this._curEmojiNode = target;
      }
      this.__renderPictureCol();
    });
    // 选择表情
    this._$addEvent(this._pictureColumn, 'click', (e) => {
      let target = this._$getElement(e);
      this._$stop(e);
      if (target.tagName.toLowerCase() === 'img') {
        target = target.parentNode;
      } else if (target.tagName.toLowerCase() !== 'span') {
        return;
      }
      const { id } = target;
      let type = /^pic-(\w+)-(.+)$/.exec(id);
      const [, , itemName] = type;
      [, type] = type;
      let category = this._curEmojiType;
      if (type === 'emoji') {
        category = category.replace('emoji-', '');
      } else if (type === 'pinup') {
        category = category.replace('pinup-', '');
      }
      const result = {
        type,
        category,
        emoji: itemName,
      };
      if (this._callback instanceof Function) {
        this._callback.call(this, result);
        this._$hide();
      }
    });

    this._$addEvent(document, 'click', () => {
      this._$hide();
    });
  }

  /**
   * 绑定事件
   * @param element
   * @param type
   * @param callback
   */
  _$addEvent(element, type, callback) {
    if (element.addEventListener) {
      element.addEventListener(type, callback, false);
    } else if (element.attachEvent) {
      element.attachEvent(`on${type}`, callback);
    }
  }

  /**
   * 获取目标对象
   * @param event
   * @return {EventTarget|Object}
   */
  _$getElement(event = window.event) {
    return event.target || event.srcElement;
  }

  /**
   * 阻止异常
   * @param event
   */
  _$stop(event = window.event) {
    if (event.stopPropogation) {
      event.stopPropogation();
    } else {
      // eslint-disable-next-line no-param-reassign
      event.cancelBubble = true;
    }
  }

  _$hide() {
    this._parentNode.style.display = 'none';
  }

  _$show() {
    if (this._curEmojiNode) this._curEmojiNode.className = '';
    this._curEmojiType = 'emoji-jjs_emoji';
    this._curEmojiNode = document.getElementById('chn-emoji-jjs_emoji');
    this.__renderPictureCol();
    this._parentNode.style.display = 'block';
  }

  isHide() {
    return this._parentNode.style.display === 'none';
  }
}

export function createEmoji(layout, emojiPath, cb) {
  const div = document.createElement('div');
  layout.addAdditionalUI(div);
  return new CEmojiEngine(div, {
    emojiList: [{ itemName: 'jjs_emoji', items: jjsEmoji }, { itemName: 'emoji', items: emoji }],
    pinupList: [
      { itemName: 'jjs', items: jjs },
      { itemName: 'ajmd', items: ajmd },
      { itemName: 'xxy', items: xxy },
      { itemName: 'lt', items: lt },
    ],
    width: 472,
    height: 250,
    imgpath: emojiPath,
    callback: cb || (() => {
    }),
  });
}

/**
 * 通过emoji替换创img
 * @param text
 * @param imagePath
 * @return {string}
 */
export function buildEmoji(text, imagePath) {
  let result = text;
  const re = /\[([^\]\[]*)\]/g;
  const matches = text.match(re) || [];
  const map = {};
  for (let i = 0; i < matches.length; ++i) {
    // eslint-disable-next-line no-continue
    if (map[matches[i]]) continue;

    map[matches[i]] = matches[i];
    if (emojiMap[matches[i]]) {
      let m = matches[i];
      m = m.substring(0, m.length - 1);
      m = `\\${m}\\]`;
      result = text.replace(new RegExp(m, 'g'), `<img class="im-emoji emoji" data-text="${matches[i]}" src="${imagePath}/emoji/${emojiMap[matches[i]]}" />`);
    }
    if (jjsEmojiMap[matches[i]]) {
      let m = matches[i];
      m = m.substring(0, m.length - 1);
      m = `\\${m}\\]`;
      result = text.replace(new RegExp(m, 'g'), `<img class="im-emoji emoji" data-text="${matches[i]}" src="${imagePath}/jjs_emoji/${jjsEmojiMap[matches[i]]}" />`);
    }
  }
  return result;
}
