/**
 * 编辑框主入口
 * Created by lenovo on 2017/8/15.
 */
import 'quill/dist/quill.core.css';
import {
  createEditor as createEditor1,
  focusEditor as focusEditor1,
  insertEmoji as insertEmoji1,
  insertImage as insertImage1,
  insertHaitImage as insertHaitImage1,
  insertHaitSpan as insertHaitSpan1,
  insertText as insertText1,
  getContents as getContents1,
  setContents as setContents1,
  clear as clear1,
  getSelection as getSelection1,
  getBounds as getBounds1,
  doDrop as doDrop1,
  update as update1,
  blur,
} from './editor';

import '../../css/editor.css';

if (process.env.ENV) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './editor.styles.css';
  document.head.appendChild(link);
}
let _currId;
// 编辑框s
const _editors = {};

const hidden = 'hidden';
export function hasEditor(id) {
  return !!_editors[id];
}

export function createEditor(id, options) {
  const $div = document.createElement('div');
  $div.id = id;
  $div.classList.add(hidden);
  document.body.appendChild($div);
  const quill = createEditor1(id, options);
  _editors[id] = {
    $container: $div,
    quill,
  };
  return quill;
}

export function activeEditor(id) {
  const quill = _editors[id].quill;
  let $div = document.getElementById(_currId);
  if ($div) $div.classList.add(hidden);
  _currId = id;
  $div = document.getElementById(_currId);
  if ($div) $div.classList.remove(hidden);
  focusEditor1(quill);
  return quill;
}

export function getBounds(id, index, length) {
  return getBounds1(_editors[id].quill, index, length);
}
export function getSelection(id, flag = false) {
  return getSelection1(_editors[id].quill, flag);
}
export function clear(id) {
  return clear1(_editors[id].quill);
}
export function focusEditor(id) {
  return focusEditor1(_editors[id].quill);
}
export function isActive(id) {
  return _currId === id;
}
export function insertHaitSpan(id, value) {
  return insertHaitSpan1(_editors[id].quill, value);
}
export function insertHaitImage(id, value, range) {
  return insertHaitImage1(_editors[id].quill, value, range);
}
export function insertImage(id, img) {
  return insertImage1(_editors[id].quill, img);
}
export function insertEmoji(id, value) {
  return insertEmoji1(_editors[id].quill, value);
}
export function insertText(id, text) {
  return insertText1(_editors[id].quill, text);
}
export function setContents(id, delta) {
  return setContents1(_editors[id].quill, delta);
}
export function getContents(id, index, length) {
  return getContents1(_editors[id].quill, index, length);
}

export function doDrop(e) {
  return doDrop1(e, _editors[_currId].quill);
}

export function update(id) {
  return update1(_editors[id].quill);
}

export function blurEditor(id) {
  return blur(_editors[id].quill);
}

export function safeBlurEditor(id) {
  const quill = _editors[id].quill;
  if (quill &&
    quill.selection &&
    quill.selection &&
    quill.selection.savedRange &&
    quill.selection.savedRange.length === 0) {
    blur(quill);
  }
}
