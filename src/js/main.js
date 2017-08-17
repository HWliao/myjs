/**
 * 编辑框主入口
 * Created by lenovo on 2017/8/15.
 */
import EventEmitter from 'eventemitter3';
import $ from 'jquery';
import { createEditor, focusEditor, insertEmoji, insertImage, insertHaitImage } from './editor';
import '../css/editor.css';

const IM_EDITOR_ID = 'im-editor';

class ImEditor extends EventEmitter {
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
   */
  constructor(container) {
    super();
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

  insertHaitImage(account, text, img, id) {
    if (!this.isActive(id)) return;
    insertHaitImage(this._editors[id].quill, {
      account,
      text,
      img,
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
    this._editors[id] = {
      $container: $(`#${id}`),
      quill: createEditor(`${id}`),
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

