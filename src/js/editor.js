/**
 * Created by lenovo on 2017/8/15.
 */
import Quill from 'quill/dist/quill.core';
import 'quill/dist/quill.core.css';
import IM_FORMATS from './ImEditorBlot';

window.Quill = Quill;
/**
 * 创建编辑器
 * @param id 编辑器id
 */
export function createEditor(id) {
  return new Quill(`#${id}`);
}
/**
 * 聚焦某个编辑器上
 * @param quill
 */
export function focusEditor(quill) {
  quill.focus();
}
/**
 * 插入emoji
 * @param quill
 * @param value
 */
export function insertEmoji(quill, value) {
  // 1.删除选中区域内容
  // 2.插入内容
  let range = quill.getSelection(true);
  quill.deleteText(range.index, range.length);
  range = quill.getSelection(true);
  quill.insertEmbed(range.index, IM_FORMATS.IM_FORMAT_EMOJI, value);
  range = quill.getSelection(true);
  quill.setSelection(range.index + 1, 0);
}
