// eslint-disable-next-line max-len
/* eslint-disable import/no-unresolved,import/no-extraneous-dependencies,import/no-webpack-loader-syntax,import/extensions */
/**
 * im editor 入口,负责创建iframe,已经暴露接口
 * Created by lenovo on 2017/8/28.
 */
import EventEmitter from 'eventemitter3';
import EditorHtml from '../../EditorManager/html/editor.html';
import { keys, events } from '../../EditorManager/js/contants';

const IM_EDITOR_ID = 'im-editor';

export default class ImEditor extends EventEmitter {
  static keys = keys;
  static events = events;

  constructor(container, options) {
    super(container);
    // 外部提供的容器
    if (typeof container === 'string') {
      this._container = document.getElementById(container);
    } else {
      this._container = container;
    }
    // 配置
    this._options = options;
    // 内部生成容器id
    this._id = `${IM_EDITOR_ID}-${new Date().getTime()}`;

    this._iframe = document.createElement('iframe');
    this._iframe.id = this._id;
    this._iframe.allowfullscreen = 'false';
    this._iframe.frameBorder = '0';
    this._iframe.marginheight = '0';
    this._iframe.marginwidth = '0';
    this._iframe.width = '100%';
    this._iframe.height = '100%';
    this._iframe.scrolling = 'no';
    this._iframe.src = EditorHtml;
    this._iframe.addEventListener('load', () => {
      this._iframeWindow = this._iframe.contentWindow;
      this._iframeDocument = this._iframeWindow.document;
      // iframe中编辑器
      this._manager = this._iframeWindow.ImManager;
      ImEditor.Delta = this._manager.Delta;
      this._isInited = true;

      if (this._currId) this.activeEditor(this._currId);
      if (this._options.dropEl) {
        this._options.dropEl.addEventListener('drop', (e) => {
          this._manager.doDrop(e);
          e.preventDefault();
          e.stopPropagation();
        }, false);
      }
    }, false);

    this._container.appendChild(this._iframe);
  }

  /**
   * 是否有内容
   * @param id
   * @return {boolean}
   */
  hasContents(id) {
    if (!this.hasEditor(id)) return false;
    const contents = this._manager.getContents(id);
    if (!contents || !contents.ops) return false;
    if (contents.ops.length > 1) return true;
    // 只包含一个回车字符,表示没有内容
    return contents.ops[0].insert !== '\n';
  }

  /**
   * 获取全部内容
   * @param id
   * @param index
   * @param length
   * @return {*}
   */
  getContents(id, index, length) {
    if (!this.hasEditor(id)) return undefined;
    return this._manager.getContents(id, index, length);
  }

  setContents(id, delta) {
    if (!this.isActive(id)) return;
    this._manager.setContents(id, delta);
  }

  /**
   * 插入字符
   * @param id
   * @param text
   */
  insertText(id, text) {
    if (!this.isActive(id)) return;
    this._manager.insertText(id, text);
  }

  /**
   * 插入emoji图片
   * @param emojiStr
   * @param emojiImg
   * @param id
   */
  insertEmoji(emojiStr, emojiImg, id) {
    if (!this.isActive(id)) return;
    this._manager.insertEmoji(id, {
      text: emojiStr,
      img: emojiImg,
    });
  }

  /**
   * 插入图片
   * @param img
   * @param id
   */
  insertImage(img, id) {
    if (!this.isActive(id)) return;
    this._manager.insertImage(id, {
      text: '[图片]',
      img,
    });
  }

  /**
   * 插入@图片
   * @param account
   * @param text
   * @param img
   * @param id
   * @param range
   */
  insertHaitImage(account, text, img, id, range) {
    if (!this.isActive(id)) return;
    this._manager.insertHaitImage(id, {
      account,
      text,
      img,
    }, range);
  }

  /**
   * 插入@span embed
   * @param account
   * @param text
   * @param id
   */
  insertHaitSpan(account, text, id) {
    if (!this.isActive(id)) return;
    this._manager.insertHaitSpan(id, {
      account,
      text,
    });
  }

  /**
   * 创建一个编辑框
   * @param id
   */
  createEditor(id) {
    if (!this.isInited(id)) return;
    const quill = this._manager.createEditor(id, this._options);
    quill.on(events.SELECTION_CHANGE, (...args) => {
      this.emit(events.SELECTION_CHANGE, this._currId, ...args);
    });
    quill.on(events.TEXT_CHANGE, (...args) => {
      this.emit(events.TEXT_CHANGE, this._currId, ...args);
    });
    quill.on(events.EDITOR_CHANGE, (...args) => {
      this.emit(events.EDITOR_CHANGE, this._currId, ...args);
    });
    quill.on(events.EDITOR_CONTEXT_MENU, (...args) => {
      this.emit(events.EDITOR_CONTEXT_MENU, this._currId, ...args);
    });
    quill.on(events.IMG_DBLCLICK, (...args) => {
      this.emit(events.IMG_DBLCLICK, this._currId, ...args);
    });
    quill.on(events.DROP_AND_COPY_FILE, (...args) => {
      this.emit(events.DROP_AND_COPY_FILE, this._currId, ...args);
    });
    quill.on(events.DROP_AND_COPY_INVALID_IMAGE, (...args) => {
      this.emit(events.DROP_AND_COPY_INVALID_IMAGE, this._currId, ...args);
    });
    quill.on(events.EDITOR_HAIT_KEYUP, (...args) => {
      this.emit(events.EDITOR_HAIT_KEYUP, this._currId, ...args);
    });
    quill.on('error', (...args) => {
      this.emit('error', this._currId, ...args);
    });
  }

  /**
   * 激活某个编辑框
   * @param id
   */
  activeEditor(id) {
    this._currId = id;
    if (!this.isInited(id)) return;
    // 没有编辑器则创建
    if (!this.hasEditor(id)) this.createEditor(id);
    this._manager.activeEditor(id);
  }

  /**
   * 是否初始化完成
   * @param id
   * @returns {boolean}
   */
  isInited(id) {
    return !!(this._isInited && id);
  }

  /**
   * 是否已经生成编辑框
   * @param id
   * @returns {boolean}
   */
  hasEditor(id) {
    return this._manager.hasEditor(id);
  }

  /**
   * 编辑框是否被激活
   * @param id
   */
  isActive(id) {
    return this.isInited(id) && this.hasEditor(id) && this._manager.isActive(id);
  }

  /**
   * 清理输入框
   * @param id
   * @param needFlag
   */
  clear(id, needFlag = true) {
    if (!this._manager.hasEditor(id)) return;
    this._manager.clear(id);
    if (needFlag) this._manager.focusEditor(id);
  }

  /**
   * 获取光标位置
   * @param id
   * @param flag
   * @return {*}
   */
  getSelection(id, flag = false) {
    if (!this.isActive(id)) return null;
    return this._manager.getSelection(id, flag);
  }

  /**
   * 获取区域坐标
   * @param id
   * @param index
   * @param length
   */
  getBounds(id, index, length) {
    if (!this.isActive(id)) return null;
    return this._manager.getBounds(id, index, length);
  }
}
