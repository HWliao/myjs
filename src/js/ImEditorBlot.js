/**
 * 编辑器自定义格式
 * Created by lenovo on 2017/8/16.
 */
import Quill from 'quill/dist/quill.core';
import EmojiBlot from './EmojiBlot';

Quill.register(EmojiBlot);

export default {
  IM_FORMAT_EMOJI: EmojiBlot.blotName,
};
