/* eslint-disable no-case-declarations */
import $ from 'jquery';
import EventEmitter from 'eventemitter3';
import { createDebug } from '../../utils/log';
import chatPanelHtml from './chat-panel.html';
import defaultImage from '../../../resource/images/default.png';
import {
  IS_LOGIN,
  IS_SIDEBAR_UP, SDK_CURR_CONSULTATIVE_DATA,
  SDK_CURR_MSG_ID_CLIENT,
  SDK_CURR_MSG_TIME,
  SDK_CURR_SESSION_ID,
  USER_ACCOUNT,
} from '../../model/state';
import {
  CHAT_PANEL_CLOSE_BTN_CLICK,
  CHAT_PANEL_GET_MORE_MSG,
  CHAT_PANEL_IMAGE_SEND,
  CHAT_PANEL_SEND_BTN_CLICK, CHAT_PANEL_STICKERS,
} from '../../model/event';
import {
  _$escape,
  buildSessionMsg,
  showDelayToHide,
  openFileDialogFactory,
  countBytesToSize,
  computeImgSize,
  getBaiduGeo,
  judgePrice,
} from '../../utils/utils';
import { buildEmoji, createEmoji } from '../emoji/emoji';
import { CONSULTATIVE, CONSULTATIVE_FAIL } from '../../model/constant';

const log = createDebug('im:chat-panel');
const fileDialog = openFileDialogFactory();

// 滚动条上下间隔因子
const SCROLL_BAR_FACTOR = 5;

export class ChatPanel extends EventEmitter {
  // 滚动条监听
  scrollbar = {
    height: 0,
    top: 0,
  };

  constructor(options, layout, store) {
    super();
    log('chat-panel construct...');
    this.options = options;
    this.layout = layout;
    this.store = store;

    this.init();

    this.initEvent();
    this.inited = true;
    this.store.subscribe(() => {
      this.update();
    });
  }

  /**
   * 初始化
   */
  init() {
    log('chat-panel init');
    this.$chatPanel = $(chatPanelHtml);
    this.layout.addUI(this.$chatPanel);

    this.$imWtName = this.$chatPanel.find('.im-wt-name');
    this.$imWtPortrait = this.$chatPanel.find('.im-wt-portrait');
    this.$imWtLoading = this.$chatPanel.find('.im-wt-loading');

    this.$imWtCloseBtn = this.$chatPanel.find('.im-wt-closebtn');

    this.$imWcChat = this.$chatPanel.find('.im-wc-chat');
    this.$imWcInput = this.$chatPanel.find('.im-wc-input');

    this.$imChatContent = this.$chatPanel.find('.im-chat-content');
    this.$emoji = this.$chatPanel.find('.im-tool .emoji');
    this.$image = this.$chatPanel.find('.im-tool .image');
    this.$imMsgContent = this.$chatPanel.find('#im-msg-content');
    this.$applink = this.$chatPanel.find('.im-btn-container .applink');
    this.$send = this.$chatPanel.find('.im-btn-container .send');
    this.$imMsgNew = this.$chatPanel.find('.im-msg-new');

    this.$emojiCompnent =
      createEmoji(this.layout, this.options.emojiPath, this.sendEmoji.bind(this));

    this.$imMsgContentNullTip = this.$chatPanel.find('.im-input-content-null-tip');
    this.$imMsgContentNullTip.hide();
    this.showContentNullTip = showDelayToHide(this.$imMsgContentNullTip.get(0), 1200);

    this.$chatPanel.find('.chat-tophint .txt').text(this.options.chatContentHeader);
    this.$imMsgContent.attr('placeholder', this.options.inputPlaceHolder);

    this.$applink
      .attr('href', this.options.inputFooterHref)
      .attr('title', this.options.inputFooterTitle)
      .text(this.options.inputFooterText);
  }

  initEvent() {
    // 关闭按钮
    this.$imWtCloseBtn.on('click', () => {
      log('chat panel emit CHAT_PANEL_CLOSE_BTN_CLICK,sessionId:%s', this.currSessionId);
      this.emit(CHAT_PANEL_CLOSE_BTN_CLICK, this.currSessionId);
    });
    // 输入框监听
    this.$imMsgContent.on('change', (e) => {
      this.store.putDraft(this.currSessionId, $(e.currentTarget).val());
    });

    // 滚动条的监听
    this.$imWcChat.on('scroll', () => {
      this.setScrollBar();
      if (this.isScrollBarInTop()) {
        log('chat panel emit CHAT_PANEL_GET_MORE_MSG');
        this.emit(CHAT_PANEL_GET_MORE_MSG, this.currSessionId);
      }
      if (this.isScrollBarInBottom()) {
        this.hideImMsgNew();
      }
    });

    // 新消息提示点击
    this.$imMsgNew.on('click', () => {
      this.scrollToBottom();
    });

    // 发送按钮点击
    this.$send.on('click', () => {
      if (this.isConsultative) return;
      this.$imMsgContent.focus();
      const text = this.$imMsgContent.val();
      if (!text) {
        this.showContentNullTip();
        return;
      }
      this.$imMsgContent.val('');
      this.store.putDraft(this.currSessionId, '');
      log('chat panel emit CHAT_PANEL_SEND_BTN_CLICK,text:%s', text);
      this.emit(CHAT_PANEL_SEND_BTN_CLICK, text, this.currSessionId);
      this.scrollToBottom();
    });

    // 发起选择图片
    this.$image.on('click', () => {
      if (this.isConsultative) return;
      fileDialog().then((el) => {
        if (el && el.files && el.files.length === 1) {
          const file = el.files[0];
          log('selected file.%o', file);
          if (file.size < this.options.imageUploadMaxLimit) {
            this.scrollToBottom();
            this.emit(CHAT_PANEL_IMAGE_SEND, file, this.currSessionId);
          } else {
            alert(`图片打大小不能超过${countBytesToSize(this.options.imageUploadMaxLimit)}`);
          }
        } else {
          alert('不支持发送图片');
        }
      }).catch(() => {
        log('fileDalog cancel.');
      });
    });

    // emoji
    this.$emoji.on('click', (e) => {
      if (this.isConsultative) return;
      e.stopPropagation();
      this.$emojiCompnent._$show();
    });
  }

  update() {
    const isLogin = this.store.get(IS_LOGIN);
    const isSidebarUp = this.store.get(IS_SIDEBAR_UP);
    const currSessionId = this.store.get(SDK_CURR_SESSION_ID);
    const currConsultative = this.store.get(SDK_CURR_CONSULTATIVE_DATA);

    if (isLogin && isSidebarUp && (currSessionId || currConsultative)) {
      // 有在线咨询数据 或者 有当前会话 打开聊天面板
      this.openChatPanel(currSessionId, currConsultative);
    } else {
      this.closeChatPanel();
    }
  }

  /**
   * 更新消息
   * @param currSessionId
   */
  updateMsg(currSessionId) {
    // 不为当前会话不更新
    if (!currSessionId || (this.currSessionId !== currSessionId)) return;
    const currMsgUpdateTime = this.store.get(SDK_CURR_MSG_TIME);
    const currMsgIdClient = this.store.get(SDK_CURR_MSG_ID_CLIENT);
    if (!currMsgUpdateTime || !currMsgIdClient) return;
    const currMsg = this.store.getMsgByIdClient(currMsgIdClient);
    if (!currMsg) return;
    if (currMsg.sessionId !== this.currSessionId) return;
    if (this.msgUpdateTime >= currMsgUpdateTime) return;
    log('update msg ... ');
    this.msgUpdateTime = currMsgUpdateTime;
    this.$imChatContent.append(this.buildMsgHtml(currMsg));
    if (this.isScrollBarInBottom()) {
      this.scrollToBottom();
    } else {
      this.showImMsgNew(currMsg);
    }
  }

  /**
   * 打开聊天窗口
   * @param currSessionId
   * @param currConsultative
   */
  openChatPanel(currSessionId, currConsultative) {
    log('open chat panel this.currSessionId:%s,store.currSessionId:%s,currConsultative:%o', this.currSessionId, currSessionId, currConsultative);
    this.$chatPanel.show();
    this.showSessionName(currSessionId, currConsultative);
    this.showInputContent(currSessionId, currConsultative);
    this.showInitMsgs(currSessionId, currConsultative);
    this.updateMsg(currSessionId);
    if (this.currSessionId !== currSessionId) {
      this.scrollToBottom();
      this.hideContentNullTip();
      this.$emojiCompnent._$hide();
    }
    this.currSessionId = currSessionId;
  }

  /**
   * 关闭聊天窗口
   */
  closeChatPanel() {
    this.currSessionId = null;
    this.$chatPanel.hide();
    this.hideImMsgNew();
    this.$emojiCompnent._$hide();
  }

  /**
   * 更新聊天窗口 名字
   * @param currSessionId 当前会话id
   * @param currConsultative 咨询相关
   */
  showSessionName(currSessionId, currConsultative) {
    if (currConsultative) {
      // 优先处理咨询相关
      this.$imWtName.hide();
      if (currConsultative.type === CONSULTATIVE) {
        log('chat panel consultative.');
        this.$imWtLoading.show();
        this.$imWtPortrait.hide();
      } else if (currConsultative.type === CONSULTATIVE_FAIL) {
        log('chat panel consultative fail');
        this.$imWtLoading.hide();
        this.$imWtPortrait.show();
      }
      return;
    }
    if (!currSessionId || (this.currSessionId === currSessionId)) return;
    const { nick = '' } = this.store.getSessionBySessionId(currSessionId) || {};
    log('chat panel show name %s', nick);
    this.$imWtName.text(nick);

    this.$imWtName.show();
    this.$imWtLoading.hide();
    this.$imWtPortrait.hide();
  }

  /**
   * 初始化输入款
   * @param currSessionId
   * @param currConsultative
   */
  showInputContent(currSessionId, currConsultative) {
    if (currConsultative) {
      this.$imWcInput.addClass('disabled');
      this.$imMsgContent.prop('disabled', true);
      this.isConsultative = true;
    } else {
      this.$imWcInput.removeClass('disabled');
      this.$imMsgContent.prop('disabled', false);
      this.isConsultative = false;
    }
    if (!currSessionId || (this.currSessionId === currSessionId)) return;
    log('chat panel input conten focus');
    const content = this.store.getDraft(currSessionId) || '';
    this.$imMsgContent.val(content);
    this.$imMsgContent.get(0).focus();
  }

  /**
   * 显示初始消息
   * @param currSessionId
   * @param currConsultative
   */
  showInitMsgs(currSessionId, currConsultative) {
    if (currConsultative) {
      const lis = this.buildConsultativeHtml(currConsultative);
      this.$imChatContent.html(lis);
      return;
    }
    if (!currSessionId || (this.currSessionId === currSessionId)) return;
    log('chat panel show init msgs');
    const msgs = this.store.getMsgsBySessionId(currSessionId);
    const lis = msgs.reduce((li, msg) => (li + this.buildMsgHtml(msg)), '');
    this.$imChatContent.html(lis);
    this.msgUpdateTime = +new Date();
  }

  buildConsultativeHtml(currConsultative) {
    const { data } = currConsultative;
    const userAccount = this.store.get(USER_ACCOUNT);
    const user = this.store.getUserById(userAccount.accid) || { avatar: defaultImage };
    return `
    <li class="im-msg-item im-msg-right im-msg-link">
      <div class="msg-img">
        <img src="${user.avatar}">
      </div>
      <div class="msg-text">
        <div class="text">
          <a class="msg-link clearfix" href="${data.toUrl}" target="_blank">
            <div class="link-item-img">
              <img src="${data.img}">
            </div>
            <span class="link-span link-title" title="${data.title}">${data.title}</span>
            <span class="link-span  link-attr" title="${data.attr}">${data.attr}</span>
            <span class="link-span link-price" title="${data.price}">${data.price}</span>
          </a>
        </div>
      </div>
    </li>
    <li class="im-msg-item im-msg-tip">
      <span class="msg-tip">${data.tip}</span>
    </li>`;
  }

  /**
   * 构建每条消息对应的ui html
   * @param msg
   * @return {string}
   */
  buildMsgHtml(msg) {
    const { type, from, status } = msg;
    const { avatar = defaultImage } = this.store.getUserById(from) || { accid: from, nick: from };
    const userUID = this.store.get(USER_ACCOUNT).accid;

    const leftOrRightClass = from === userUID ? 'im-msg-right' : 'im-msg-left';
    const isError = status !== 'success';
    let text = '';
    switch (type) {
      case 'text':
        // 文本类型消息
        text += buildEmoji(_$escape(msg.text, true), this.options.emojiPath);
        break;
      case 'image':
        // 图片类型消息
        const size = computeImgSize(msg.file, 250);
        text += `<img src="${size.url}" style="width: ${size.width}px;height: ${size.height}px;"/>`;
        break;
      case 'file':
        text += `<a href="${msg.file.url}" target="_blank" download="${msg.file.name}">[文件] 点击下载</a>`;
        break;
      case 'tip':
        text += msg.tip;
        break;
      case 'video':
        text += '[视频] 在手机端查看';
        break;
      case 'audio':
        text += '[音频] 在手机端查看';
        break;
      case 'geo':
        text += getBaiduGeo(msg.geo, 200);
        break;
      case 'notification':
        text += '[群通知]';
        break;
      case 'custom':
        let content;
        try {
          content = JSON.parse(msg.content);
        } catch (e) {
          console.error('msg:%o,err:%o', msg, e);
        }

        if (content === null || content === undefined) {
          text += '一条[自定义]消息，请到手机或电脑客户端查看';
        } else if (content.type === 1) {
          text += '一条[猜拳]消息,请到手机端查看';
        } else if (content.type === 2) {
          text += '一条[阅后即焚]消息,请到手机端查看';
        } else if (content.type === 3) {
          // 贴图
          const catalog = _$escape(content.data.catalog);
          const chartlet = _$escape(content.data.chartlet);
          let suffix = '.png';
          if (catalog === 'jjs') {
            suffix = '.gif';
          }
          text += `<img data-ignore style="width: 150px;height: 150px;" src="${this.options.emojiPath}/${catalog}/${chartlet}${suffix}">`;
        } else if (content.type === 4) {
          text += '一条[白板]消息,请到手机或电脑客户端查看';
        } else if (content.type === 5) {
          // 房源消息
          text = `
            <a class="msg-link clearfix" href="${content.data.url}" target="_blank">
            <div class="link-item-img">
            <img src="${content.data.houseImage}">
            </div>
            <span class="link-span link-title" title="${_$escape(content.data.title)}">${_$escape(content.data.title)}</span>
            <span class="link-span  link-attr" title="${content.data.room}室${content.data.hall}厅  ${content.data.area}m²">${content.data.room}室${content.data.hall}厅&nbsp;&nbsp;${content.data.area}m²</span>
            <span class="link-span link-price" title="${judgePrice(content.data.houseType, content.data.price)}">${judgePrice(content.data.houseType, content.data.price)}</span>
            </a>`;
        } else if (content.type === 'multi' && content.msgs && content.msgs.length > -1) {
          // 图文混合消息
          const { msgs } = content;
          for (let i = 0; i < msgs.length; i++) {
            if (msgs[i].type === 'text') {
              let theMsgText = msgs[i].text || '';
              theMsgText = _$escape(theMsgText, true);
              text += buildEmoji(theMsgText, this.options.emojiPath);
            } else if (msgs[i].type === 'image') {
              if (msgs[i] && msgs[i].file && msgs[i].file.url) {
                const tmpsize = computeImgSize(msgs[i].file, 250);
                text += `<img src="${tmpsize.url}" style="width: ${tmpsize.width}px;height: ${tmpsize.height}px;"/>`;
              }
            }
          }
        } else {
          text += '一条[自定义]消息，请到手机端查看';
        }
        break;
      default:
        text += '一条[未知消息类型]消息';
        break;
    }
    if (msg.type === 'tip') {
      return `
      <li class="im-msg-item im-msg-tip">
        <span class="msg-tip">${text}</span>
      </li>`;
    }
    return `
      <li class="im-msg-item ${leftOrRightClass}">
        <div class="msg-img">
          <img src="${avatar}">
        </div>
        <div class="msg-text">
          <div class="text">
            ${text}
          </div>
          ${isError ? '<i class="sprite sprite-warning msg-warning" title="发送失败"></i>' : ''}
        </div>
      </li>`;
  }

  /**
   * 滚动到底部
   */
  scrollToBottom() {
    log('scroll to bottom');
    this.$imWcChat.get(0).scrollTop = this.$imWcChat.get(0).scrollHeight;
    this.setScrollBar();
    this.hideImMsgNew();
  }

  /**
   * 滚动条是否在底部
   * @return {boolean}
   */
  isScrollBarInBottom() {
    return (this.scrollbar.top + this.scrollbar.clientHeight)
      > (this.scrollbar.height - SCROLL_BAR_FACTOR);
  }

  /**
   * 滚动条是否在顶部
   * @return {boolean}
   */
  isScrollBarInTop() {
    return this.scrollbar.top <= SCROLL_BAR_FACTOR;
  }

  /**
   * 滚动条是否在中间
   * @return {boolean}
   */
  isScrollBarInMedium() {
    return (SCROLL_BAR_FACTOR < this.scrollbar.top) &&
      ((this.scrollbar.top + this.scrollbar.clientHeight)
        <= (this.scrollbar.height - SCROLL_BAR_FACTOR));
  }

  setScrollBar() {
    this.scrollbar.height = this.$imWcChat.get(0).scrollHeight;
    this.scrollbar.top = this.$imWcChat.get(0).scrollTop;
    this.scrollbar.clientHeight = this.$imWcChat.get(0).clientHeight;
  }

  /**
   * 显示新消息提示
   * @param msg
   */
  showImMsgNew(msg) {
    log('chat panel show im new msg in bottom');
    const { accid } = this.store.get(USER_ACCOUNT);
    const user = this.store.getUserById(msg.from);
    const text = buildSessionMsg(msg, accid, user);
    this.$imMsgNew.text(text);
    this.$imMsgNew.show();
  }

  hideImMsgNew() {
    this.$imMsgNew.hide();
  }

  hideContentNullTip() {
    this.$imMsgContentNullTip.hide();
  }

  sendEmoji({ category, emoji, type }) {
    log('chat panel send emoji category:%s,emoji:%s,type:%s', category, emoji, type);
    if (type === 'emoji') {
      this.scrollToBottom();
      this.emit(CHAT_PANEL_SEND_BTN_CLICK, emoji, this.currSessionId);
    } else if (type === 'pinup') {
      this.scrollToBottom();
      this.emit(CHAT_PANEL_STICKERS, { category, emoji, type }, this.currSessionId);
    } else {
      log('error emoji choosen.');
    }
  }
}
