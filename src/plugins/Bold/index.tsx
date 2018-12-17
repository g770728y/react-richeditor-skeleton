import { BoldIcon } from '../../components/Icon';
import { onKeyDown, renderMark, renderButton } from '../../helper';

const TYPE = 'bold';

function BoldPlugin(options = {}) {
  return {
    onKeyDown: onKeyDown({ type: TYPE, hotkey: 'mod+b' }),

    renderMark: renderMark({ type: TYPE, tagName: 'strong' }),

    renderButton: renderButton({ type: TYPE, icon: BoldIcon })
  };
}

export default BoldPlugin;
