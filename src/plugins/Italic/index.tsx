import { onKeyDown, renderButton, renderMark } from '../../helper';
import { ItalicIcon } from '../../components/Icon';

const TYPE = 'italic';

function ItalicPlugin(options = {}) {
  return {
    onKeyDown: onKeyDown({ type: TYPE, hotkey: 'mod+i' }),

    renderMark: renderMark({ type: TYPE, tagName: 'em' }),

    renderButton: renderButton({ type: TYPE, icon: ItalicIcon })
  };
}

export default ItalicPlugin;
