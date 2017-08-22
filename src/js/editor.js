/**
 * 编辑器操作相关
 * Created by lenovo on 2017/8/15.
 */
import Quill from 'quill/dist/quill.core';
import 'quill/dist/quill.core.css';
import IM_FORMATS from './ImEditorRegister';

window.Quill = Quill;
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
 */
export function insertHaitImage(quill, value) {
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
 * 获取编辑框中所有内容
 * @param quill
 * @return {*}
 */
export function getContents(quill) {
  return quill.getContents();
}
