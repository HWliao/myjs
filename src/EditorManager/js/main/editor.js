/**
 * 编辑器操作相关
 * Created by lenovo on 2017/8/15.
 */
import Quill from 'quill/dist/quill.core';
import IM_FORMATS from './ImEditorRegister';

window.Quill = Quill;
const Delta = Quill.import('delta');
/**
 * 创建编辑器
 * @param id 编辑器id
 * @param options 配置
 */
export function createEditor(id, options = {}) {
  // 按键绑定
  const bindings = options.bindings || {};
  const matchers = options.matchers || [];
  const dealImg = options.dealImg || undefined;
  const isValidImg = options.isValidImg || undefined;
  return new Quill(`#${id}`, {
    debug: 'warn',
    modules: {
      haitEvent: true,
      rootAttr: {
        spellcheck: 'false',
      },
      mouse: true,
      keyboard: {
        bindings,
      },
      clipboard: {
        matchers,
        dealImg,
        isValidImg,
      },
    },
  });
}
/**
 * 聚焦某个编辑器上
 * @param quill
 */
export function focusEditor(quill) {
  quill.focus();
}
/**
 * 判断当前range是否在行首
 * @param quill
 * @return {boolean}
 */
export function isLineFirst(quill) {
  const range = quill.getSelection();
  if (range.index === 0) return true;
  const d = quill.getContents(range.index - 1, 1);
  if (d.ops && d.ops.length > 0) {
    // 光标前一个内容为回车,则为行首
    return d.ops[0].insert === '\n';
  }
  return false;
}

/**
 * 插入嵌入体
 * @param quill
 * @param value
 * @param format
 */
export function insertEmbed(quill, value, format) {
  if (!quill.hasFocus()) quill.focus();
  let range = quill.getSelection();
  if (range.length) quill.deleteText(range.index, range.length);
  // 插入一个空格,目前发现没有这个空格会多一个光标
  // if (isLineFirst(quill)) quill.insertText(range.index, ' ');
  // 插入emoji
  range = quill.getSelection();
  quill.insertEmbed(range.index, format, value);
  quill.setSelection(range.index + 1, 0);
}

/**
 * 插入emoji
 * @param quill
 * @param value
 */
export function insertEmoji(quill, value) {
  insertEmbed(quill, value, IM_FORMATS.IM_FORMAT_EMOJI);
}

/**
 * 插入图片
 * @param quill
 * @param value
 */
export function insertImage(quill, value) {
  insertEmbed(quill, value, IM_FORMATS.IM_FORMAT_IMAGE);
}

/**
 * 插入图片@实现
 * @param quill
 * @param value
 * @param range
 */
export function insertHaitImage(quill, value, range) {
  if (range) quill.deleteText(range.index, range.length);
  insertEmbed(quill, value, IM_FORMATS.IM_FORMAT_HAIT_IMAGE);
}

/**
 * 插入span @实现
 * @param quill
 * @param value
 */
export function insertHaitSpan(quill, value) {
  insertEmbed(quill, value, IM_FORMATS.IM_FORMAT_HAIT_SPAN);
}

/**
 * 插入字符
 * @param quill
 * @param text
 */
export function insertText(quill, text) {
  if (!quill.hasFocus()) quill.focus();
  const range = quill.getSelection();
  quill.insertText(range.index, text);
}

/**
 * 获取编辑框中所有内容
 * @param quill
 * @param index
 * @param length
 * @return {*}
 */
export function getContents(quill, index, length) {
  return quill.getContents(index, length);
}

export function setContents(quill, delta = new Delta()) {
  quill.setContents(delta, Quill.sources.USER);
}

export function clear(quill) {
  quill.setContents(new Delta());
  quill.setSelection(0, 0);
  quill.history.clear();
}

export function getSelection(quill, flag) {
  return quill.getSelection(flag);
}

export function getBounds(quill, index, length) {
  return quill.getBounds(index, length);
}

export function doDrop(e, quill) {
  quill.clipboard.onDrop(e);
}
