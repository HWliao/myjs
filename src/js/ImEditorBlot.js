/**
 * 编辑器自定义格式
 * Created by lenovo on 2017/8/16.
 */
import Quill from 'quill/dist/quill.core';
import EmojiBlot from './EmojiBlot';
import ImageBlot from './ImageBlot';
import HaitImageBlot from './HaitImageBlot';

Quill.register(EmojiBlot);
Quill.register(ImageBlot);
Quill.register(HaitImageBlot);

export default {
  IM_FORMAT_EMOJI: EmojiBlot.blotName,
  IM_FORMAT_IMAGE: ImageBlot.blotName,
  IM_FORMAT_HAIT_IMAGE: HaitImageBlot.blotName,
};
