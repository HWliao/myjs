/**
 * editor manager 在window上导出接口
 * Created by lenovo on 2017/8/29.
 */
import Quill from 'quill/dist/quill.core';
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
  doDrop,
  update,
  blurEditor,
  safeBlurEditor,
} from './main/main';

const Delta = Quill.import('delta');

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
  Delta,
  doDrop,
  update,
  blurEditor,
  safeBlurEditor,
};
export default undefined;
