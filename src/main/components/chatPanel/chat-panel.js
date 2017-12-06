import $ from 'jquery';
import EventEmitter from 'eventemitter3';
import { createDebug } from '../../utils/log';
import chatPanelHtml from './chat-panel.html';
import defaultImage from '../../../resource/images/default.png';
import {
  IS_LOGIN,
  IS_SIDEBAR_UP,
  SDK_CURR_MSG_ID_CLIENT,
  SDK_CURR_MSG_TIME,
  SDK_CURR_SESSION_ID,
  USER_ACCOUNT,
} from '../../model/state';
import { CHAT_PANEL_CLOSE_BTN_CLICK, CHAT_PANEL_GET_MORE_MSG, CHAT_PANEL_SEND_BTN_CLICK } from '../../model/event';
import { _$escape, buildSessionMsg, showDelayToHide } from '../../utils/utils';

const log = createDebug('im:chat-panel');

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
    this.$imWtCloseBtn = this.$chatPanel.find('.im-wt-closebtn');
    this.$imWcChat = this.$chatPanel.find('.im-wc-chat');
    this.$imChatContent = this.$chatPanel.find('.im-chat-content');
    this.$emoji = this.$chatPanel.find('.im-tool .emoji');
    this.$image = this.$chatPanel.find('.im-tool .image');
    this.$imMsgContent = this.$chatPanel.find('#im-msg-content');
    this.$applink = this.$chatPanel.find('.im-btn-container .applink');
    this.$send = this.$chatPanel.find('.im-btn-container .send');
    this.$imMsgNew = this.$chatPanel.find('.im-msg-new');

    this.$imMsgContentNullTip = this.$chatPanel.find('.im-input-content-null-tip');
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
      if (this.currSessionId) this.emit(CHAT_PANEL_CLOSE_BTN_CLICK, this.currSessionId);
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
  }

  update() {
    const isLogin = this.store.get(IS_LOGIN);
    const isSidebarUp = this.store.get(IS_SIDEBAR_UP);
    const currSessionId = this.store.get(SDK_CURR_SESSION_ID);
    if (isLogin && isSidebarUp && currSessionId) {
      this.openChatPanel(currSessionId);
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
    if (this.currSessionId !== currSessionId) return;
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
   */
  openChatPanel(currSessionId) {
    log('open chat panel this.currSessionId:%s,store.currSessionId:%s', this.currSessionId, currSessionId);
    this.$chatPanel.show();
    this.showSessionName(currSessionId);
    this.showInputContent(currSessionId);
    this.showInitMsgs(currSessionId);
    this.updateMsg(currSessionId);
    if (this.currSessionId !== currSessionId) {
      this.scrollToBottom();
      this.hideContentNullTip();
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
  }

  /**
   * 更新聊天窗口 名字
   * @param currSessionId 当前会话id
   */
  showSessionName(currSessionId) {
    if (this.currSessionId === currSessionId) return;
    const { nick = '' } = this.store.getSessionBySessionId(currSessionId) || {};
    log('chat panel show name %s', nick);
    this.$imWtName.text(nick);
  }

  /**
   * 初始化输入款
   * @param currSessionId
   */
  showInputContent(currSessionId) {
    if (this.currSessionId === currSessionId) return;
    log('chat panel input conten focus');
    const content = this.store.getDraft(currSessionId) || '';
    this.$imMsgContent.val(content);
    this.$imMsgContent.get(0).focus();
  }

  /**
   * 显示初始消息
   * @param currSessionId
   */
  showInitMsgs(currSessionId) {
    if (this.currSessionId === currSessionId) return;
    log('chat panel show init msgs');
    const msgs = this.store.getMsgsBySessionId(currSessionId);
    const lis = msgs.reduce((li, msg) => (li + this.buildMsgHtml(msg)), '');
    this.$imChatContent.html(lis);
    this.msgUpdateTime = +new Date();
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
        text += msg.text;
        break;
      default:
        text += type;
        break;
    }

    return `
      <li class="im-msg-item ${leftOrRightClass}">
        <div class="msg-img">
          <img src="${avatar}">
        </div>
        <div class="msg-text">
          <div class="text">
            ${_$escape(text, true)}
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
}
