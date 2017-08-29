/**
 * editor manager 在window上导出接口
 * Created by lenovo on 2017/8/29.
 */
import {
  hasEditor,
  createEditor,
  activeEditor,
  getBounds,
  getSelection,
  clear,
  focusEditor,
  isActive,
  insertHaitSpan,
  insertHaitImage,
  insertImage,
  insertEmoji,
  insertText,
  setContents,
  getContents,
} from './main/main';

window.ImManager = {
  hasEditor,
  createEditor,
  activeEditor,
  getBounds,
  getSelection,
  clear,
  focusEditor,
  isActive,
  insertHaitSpan,
  insertHaitImage,
  insertImage,
  insertEmoji,
  insertText,
  setContents,
  getContents,
};
export default undefined;
