/**
 * 编辑框主入口
 * Created by lenovo on 2017/8/15.
 */
import EventEmitter from 'eventemitter3';
import $ from 'jquery';
import { defaultsDeep } from 'lodash';
import Quill from 'quill/dist/quill.core';
import {
  createEditor,
  focusEditor,
  insertEmoji,
  insertImage,
  insertHaitImage,
  insertHaitSpan,
  getContents,
} from './editor';
import '../css/editor.css';

const IM_EDITOR_ID = 'im-editor';
const Keyboard = Quill.import('modules/keyboard');

class ImEditor extends EventEmitter {
  static keys = Keyboard.keys;
  static events = Quill.events;
  // 配置项
  _options = {};

  // 单前编辑框id
  _currId;
  // 是否初始化
  _isInited = false;
  // 编辑框s
  _editors = {};

  // 元素id
  id;
  // 外部指定容器
  $container;
  // 生成容器
  $editorContainer;

  /**
   * 构造器
   * @param container id/Element
   * @param options 配置项
   */
  constructor(container, options = {}) {
    super(container);
    this._options = defaultsDeep(this._options, options);
    this.init(container);
  }

  /**
   * 初始化 container绑定等
   * @param container
   */
  init(container) {
    this.$container = typeof container === 'string' ? $(`#${container}`) : $(container);
    const id = `${IM_EDITOR_ID}-${new Date().getTime()}`;
    this.id = id;
    this.$container.append(`<div id="${id}" class="imEditor"></div>`);
    this.$editorContainer = this.$container.find(`#${id}`);
    this._isInited = true;
    if (this._currId) this.activeEditor(this._currId);
  }

  /**
   * 是否有内容
   * @param id
   * @return {boolean}
   */
  hasContents(id) {
    if (!this.isActive(id)) return false;
    const contents = getContents(this._editors[id].quill);
    if (!contents || !contents.ops) return false;
    if (contents.ops.length > 1) return true;
    // 只包含一个回车字符,表示没有内容
    return contents.ops[0].insert !== '\n';
  }

  /**
   * 插入emoji图片
   * @param emojiStr
   * @param emojiImg
   * @param id
   */
  insertEmoji(emojiStr, emojiImg, id) {
    if (!this.isActive(id)) return;
    insertEmoji(this._editors[id].quill, {
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
    insertImage(this._editors[id].quill, {
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
   */
  insertHaitImage(account, text, img, id) {
    if (!this.isActive(id)) return;
    insertHaitImage(this._editors[id].quill, {
      account,
      text,
      img,
    });
  }

  /**
   * 插入@span embed
   * @param account
   * @param text
   * @param id
   */
  insertHaitSpan(account, text, id) {
    if (!this.isActive(id)) return;
    insertHaitSpan(this._editors[id].quill, {
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
    const $div = document.createElement('div');
    $div.id = id;
    this.$editorContainer.append($div);
    const quill = createEditor(`${id}`, this._options);
    quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
      this.emit(Quill.events.SELECTION_CHANGE, this._currId, ...args);
    });
    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      this.emit(Quill.events.TEXT_CHANGE, this._currId, ...args);
    });
    quill.on(Quill.events.EDITOR_CONTEXT_MENU, (...args) => {
      this.emit(Quill.events.EDITOR_CONTEXT_MENU, this._currId, ...args);
    });
    quill.on(Quill.events.IMG_DBLCLICK, (...args) => {
      this.emit(Quill.events.IMG_DBLCLICK, this._currId, ...args);
    });
    quill.on(Quill.events.DROP_AND_COPY_FILE, (...args) => {
      this.emit(Quill.events.DROP_AND_COPY_FILE, this._currId, ...args);
    });
    quill.on(Quill.events.DROP_AND_COPY_INVALID_IMAGE, (...args) => {
      this.emit(Quill.events.DROP_AND_COPY_INVALID_IMAGE, this._currId, ...args);
    });
    quill.on('error', (...args) => {
      this.emit('error', this._currId, ...args);
    });
    this._editors[id] = {
      $container: $(`#${id}`),
      quill,
    };
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
    const $container = this._editors[id].$container;
    const quill = this._editors[id].quill;
    $container.show().siblings('div').hide();
    focusEditor(quill);
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
    return !!this._editors[id];
  }

  /**
   * 编辑框是否被激活
   * @param id
   */
  isActive(id) {
    return this.isInited(id) && this.hasEditor(id) && this._currId === id;
  }
}

export default ImEditor;

