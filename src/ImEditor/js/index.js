// eslint-disable-next-line max-len
/* eslint-disable import/no-unresolved,import/no-extraneous-dependencies,import/no-webpack-loader-syntax,import/extensions */
/**
 * im editor 入口,负责创建iframe,已经暴露接口
 * Created by lenovo on 2017/8/28.
 */
import EventEmitter from 'eventemitter3';
import EditorHtml from '../../EditorManager/html/editor.html';

export default class ImEditor extends EventEmitter {
  constructor(container, options) {
    super(container);
    this._options = options;
    this.html = EditorHtml;
    const frame = document.createElement('iframe');
    frame.src = this.html;
    document.body.appendChild(frame);
  }
}
