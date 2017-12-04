import $ from 'jquery';
import EventEmitter from 'eventemitter3';
import { createDebug } from '../../utils/log';
import chatPanelHtml from './chat-panel.html';
import { IS_LOGIN, IS_SIDEBAR_UP, SDK_CURR_SESSION_ID } from '../../model/state';
import { CHAT_PANEL_CLOSE_BTN_CLICK } from '../../model/event';

const log = createDebug('im:chat-panel');

export class ChatPanel extends EventEmitter {
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
    // todo
    log('chat-panel init');
    this.$chatPanel = $(chatPanelHtml);
    this.layout.addUI(this.$chatPanel);

    this.$imWtName = this.$chatPanel.find('.im-wt-name');
    this.$imWtCloseBtn = this.$chatPanel.find('.im-wt-closebtn');
    this.$imWcChat = this.$chatPanel.find('.im-wc-chat');
    this.$emoji = this.$chatPanel.find('.im-tool .emoji');
    this.$image = this.$chatPanel.find('.im-tool .image');
    this.$imMsgContent = this.$chatPanel.find('#im-msg-content');
    this.$applink = this.$chatPanel.find('.im-btn-container .applink');
    this.$send = this.$chatPanel.find('.im-btn-container .send');

    // input textarea placeholder
    this.$imMsgContent.attr('placeholder', this.options.inputPlaceHolder);
    this.$applink
      .attr('href', this.options.inputFooterHref)
      .attr('title', this.options.inputFooterTitle)
      .text(this.options.inputFooterText);
  }

  initEvent() {
    // todo
    this.$imWtCloseBtn.on('click', () => {
      log('chat panel emit CHAT_PANEL_CLOSE_BTN_CLICK,sessionId:%s', this.currSessionId);
      if (this.currSessionId) this.emit(CHAT_PANEL_CLOSE_BTN_CLICK, this.currSessionId);
    });
  }

  update() {
    // todo
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
   * 打开聊天窗口
   * @param currSessionId
   */
  openChatPanel(currSessionId) {
    log('open chat panel this.currSessionId:%s,store.currSessionId:%s', this.currSessionId, currSessionId);
    if (this.currSessionId !== currSessionId) {
      // todo
      this.currSessionId = currSessionId;
    }
    this.$chatPanel.show();
  }

  /**
   * 关闭聊天窗口
   */
  closeChatPanel() {
    this.currSessionId = null;
    this.$chatPanel.hide();
  }
}
