/**
 * root attr 属性设置
 * Created by HWliao on 2017/8/20.
 */

export default class RootAttrModule {
  /**
   * quill module 固定参数
   * @param quill
   * @param options
   */
  constructor(quill, options = {}) {
    Object.keys(options).forEach((key) => {
      quill.root.setAttribute(key, options[key]);
    });
  }
}
