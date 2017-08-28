/**
 * 编辑器自定义格式
 * Created by lenovo on 2017/8/16.
 */
import Quill from 'quill/dist/quill.core';
import EmojiBlot from './EmojiBlot';
import ImageBlot from './ImageBlot';
import HaitImageBlot from './HaitImageBlot';
import HaitSpanBlot from './HaitSpanBlot';
import RootAttrModule from './RootAttrModule';
import MouseModule from './MouseModule';
import Clipboard from './DropAndClipModule';
import HaitEventModule from './HaitEventModule';

// image先关blot ImageBlot必须最后注册tagName将以它进行优先匹配
Quill.register(EmojiBlot);
Quill.register(HaitImageBlot);
Quill.register(ImageBlot);

Quill.register(HaitSpanBlot);

// modules
const rootAttr = 'modules/rootAttr';
const mouse = 'modules/mouse';
const haitEvent = 'modules/haitEvent';
Quill.register(rootAttr, RootAttrModule, true);
Quill.register(mouse, MouseModule, true);
Quill.register(haitEvent, HaitEventModule, true);

// 覆盖clipboard
Quill.register('modules/clipboard', Clipboard, true);

export default {
  IM_FORMAT_EMOJI: EmojiBlot.blotName,
  IM_FORMAT_IMAGE: ImageBlot.blotName,
  IM_FORMAT_HAIT_IMAGE: HaitImageBlot.blotName,
  IM_FORMAT_HAIT_SPAN: HaitSpanBlot.blotName,
  IM_MODULE_ROOT_ATTR: rootAttr,
  IM_MODULE_MOUSE: mouse,
  IM_MODULE_HAIT_EVENT: haitEvent,
};
